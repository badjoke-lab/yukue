export function applyMatsuriRecordOverrides(records, overrides, familyName) {
  if (overrides.length === 0) return records;

  const recordsById = new Map();
  for (const record of records) {
    if (recordsById.has(record.id)) {
      throw new Error(
        `Matsuri ${familyName} base records contain duplicate ID ${record.id}.`,
      );
    }
    recordsById.set(record.id, record);
  }

  for (const override of overrides) {
    const previous = recordsById.get(override.id);
    if (!previous) {
      throw new Error(
        `Matsuri ${familyName} correction ${override.id} does not replace an existing record.`,
      );
    }

    if (override.record_version <= previous.record_version) {
      throw new Error(
        `Matsuri ${familyName} correction ${override.id} must increase record_version above ${previous.record_version}.`,
      );
    }

    recordsById.set(override.id, override);
  }

  return records.map((record) => recordsById.get(record.id) ?? record);
}
