export const TAB_ABBREVIATIONS: Record<string, string> = {
  'Entwicklung & Architektur': 'Dev',
  'Künstliche Intelligenz': 'KI',
  'Machine Learning': 'ML',
  'Backend': 'Backend',
  'Datenaufbereitung': 'Datenaufb.',
  'Software-Architektur': 'Architektur',
  'Webinterface': 'Web'
};

export function getTabAbbr(label: string): string {
  return TAB_ABBREVIATIONS[label] || label;
}
