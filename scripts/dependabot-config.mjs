export function validateDependabotConfig(source) {
  const violations = [];
  const lines = source.split(/\r?\n/u);

  const scalarValue = (rawValue) => {
    const trimmed = rawValue.trim();
    const quoted = trimmed.match(/^(["'])(.*)\1$/u);
    return quoted ? quoted[2] : trimmed;
  };

  const leadingSpaces = (line) => line.match(/^ */u)?.[0].length ?? 0;

  const versionLines = lines.filter((line) => /^version:\s*/u.test(line));
  if (versionLines.length !== 1 || scalarValue(versionLines[0].replace(/^version:\s*/u, "")) !== "2") {
    violations.push("top-level version must be exactly 2");
  }

  const updatesIndex = lines.findIndex((line) => line === "updates:");
  if (updatesIndex === -1) violations.push("top-level updates block is required");

  const entries = [];
  let currentEntry = null;
  if (updatesIndex !== -1) {
    for (let index = updatesIndex + 1; index < lines.length; index += 1) {
      const line = lines[index];
      if (line.trim().length === 0 || /^\s*#/u.test(line)) {
        if (currentEntry) currentEntry.lines.push(line);
        continue;
      }

      const entryMatch = line.match(/^  - package-ecosystem:\s*(.+)$/u);
      if (entryMatch) {
        currentEntry = { ecosystem: scalarValue(entryMatch[1]), lines: [line] };
        entries.push(currentEntry);
        continue;
      }

      if (leadingSpaces(line) === 0) break;
      if (currentEntry) currentEntry.lines.push(line);
    }
  }

  const entryMap = new Map();
  for (const entry of entries) {
    const existing = entryMap.get(entry.ecosystem) ?? [];
    existing.push(entry);
    entryMap.set(entry.ecosystem, existing);
  }

  const findScalar = (entry, indent, key) => {
    const prefix = `${" ".repeat(indent)}${key}:`;
    const matches = entry.lines.filter((line) => line.startsWith(prefix));
    if (matches.length !== 1) return null;
    return scalarValue(matches[0].slice(prefix.length));
  };

  const findNestedScalar = (entry, parentIndent, parentKey, childKey) => {
    const parentLine = `${" ".repeat(parentIndent)}${parentKey}:`;
    const parentIndex = entry.lines.findIndex((line) => line === parentLine);
    if (parentIndex === -1) return null;

    const childPrefix = `${" ".repeat(parentIndent + 2)}${childKey}:`;
    const matches = [];
    for (let index = parentIndex + 1; index < entry.lines.length; index += 1) {
      const line = entry.lines[index];
      if (line.trim().length === 0 || /^\s*#/u.test(line)) continue;
      if (leadingSpaces(line) <= parentIndent) break;
      if (line.startsWith(childPrefix)) matches.push(line);
    }

    if (matches.length !== 1) return null;
    return scalarValue(matches[0].slice(childPrefix.length));
  };

  const requireEntry = (ecosystem, expected) => {
    const matches = entryMap.get(ecosystem) ?? [];
    if (matches.length !== 1) {
      violations.push(`${ecosystem} must have exactly one update entry; found ${matches.length}`);
      return;
    }

    const [entry] = matches;
    for (const [label, actual, wanted] of [
      ["directory", findScalar(entry, 4, "directory"), expected.directory],
      ["schedule.interval", findNestedScalar(entry, 4, "schedule", "interval"), expected.interval],
      ["open-pull-requests-limit", findScalar(entry, 4, "open-pull-requests-limit"), String(expected.openPullRequestsLimit)],
      ["commit-message.prefix", findNestedScalar(entry, 4, "commit-message", "prefix"), expected.commitPrefix],
    ]) {
      if (actual !== wanted) {
        violations.push(`${ecosystem} ${label} must be ${JSON.stringify(wanted)}; found ${JSON.stringify(actual)}`);
      }
    }

    if (expected.versioningStrategy) {
      const actual = findScalar(entry, 4, "versioning-strategy");
      if (actual !== expected.versioningStrategy) {
        violations.push(`${ecosystem} versioning-strategy must be ${JSON.stringify(expected.versioningStrategy)}; found ${JSON.stringify(actual)}`);
      }
    }
  };

  requireEntry("github-actions", {
    directory: "/",
    interval: "weekly",
    openPullRequestsLimit: 5,
    commitPrefix: "chore(actions)",
  });
  requireEntry("npm", {
    directory: "/",
    interval: "weekly",
    openPullRequestsLimit: 5,
    commitPrefix: "chore(deps)",
    versioningStrategy: "increase",
  });

  if (violations.length > 0) {
    throw new Error(`Dependabot configuration contract failed:\n${violations.map((violation) => `- ${violation}`).join("\n")}`);
  }

  return {
    updateEntries: entries.length,
    ecosystems: [...entryMap.keys()].sort((left, right) => left.localeCompare(right)),
  };
}
