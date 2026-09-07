export const TAB_ABBREVIATIONS: Record<string, string> = {
  'Entwicklung & Architektur': 'Dev & Arch',
  'Künstliche Intelligenz': 'KI',
  'Machine Learning': 'ML',
  'Infrastruktur & Backend': 'Infra & BE',
  'Software-Architektur': 'Architektur',
};

export function getTabAbbr(label: string): string {
  return TAB_ABBREVIATIONS[label] || label;
}
