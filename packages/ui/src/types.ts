export interface NavItem {
  label: string;
  href: string;
  active?: boolean;
}

export interface FooterGroup {
  heading?: string;
  links: NavItem[];
}

export interface SnapshotMetric {
  label: string;
  value: number | string;
  href?: string;
}

export interface OverviewItem {
  label: string;
  value: string;
  href?: string;
  accent?: boolean;
}

export interface OccurrenceRow {
  date: string;
  name?: string;
  region?: string;
  outcome: string;
  scale?: string;
  href?: string;
}

export interface ChangeTimelineItem {
  date: string;
  typeLabel: string;
  summary: string;
  resultingState?: string;
  evidenceHref?: string;
}

export interface RelationItem {
  label: string;
  targetName: string;
  href: string;
  validityPeriod?: string;
}

export interface DesignationItem {
  name: string;
  system?: string;
  authority?: string;
  validPeriod?: string;
  sourceHref?: string;
}

export interface EvidenceItem {
  targetLabel: string;
  sourceTitle: string;
  supportSummary?: string;
  sourceHref: string;
  archiveHref?: string;
}

export interface PlaceItem {
  name: string;
  address?: string;
  contextLabel?: string;
  mapHref?: string;
}

export interface DocumentaryImage {
  src: string;
  alt: string;
  caption?: string;
  creditText: string;
  creditUrl?: string;
  licenseName?: string;
  licenseUrl?: string;
}
