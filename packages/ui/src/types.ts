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
