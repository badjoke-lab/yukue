export const siteThemes = {
  matsuri: {
    accent: "#284B63",
  },
  jinja: {
    accent: "#A33A32",
  },
  jiin: {
    accent: "#684B78",
  },
  tomurai: {
    accent: "#486457",
  },
} as const;

export type SiteThemeKey = keyof typeof siteThemes;

export function getSiteAccent(site: SiteThemeKey): string {
  return siteThemes[site].accent;
}
