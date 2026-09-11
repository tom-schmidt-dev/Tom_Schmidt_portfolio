import type { ProjectEntry } from '../../content.config';
import { getTabAbbr, type TabItem } from '../../scripts/tabs';

export type HighlightSection = {
  category: string;
  items: string[];
};

export type ContentBlock = string | HighlightSection;

export interface ProjectCardViewModel {
  id: string;
  title: string;
  shortTitle?: string;
  category: string;
  period?: string;
  privat?: boolean;
  uni?: boolean;
  isPlaceholder: boolean;
  tags: string[];
  shortTags?: string[];
  sourceUrl?: string;
  tabs: string[];
  tabItems: TabItem[];
  descriptionBlocks: ContentBlock[];
  ergebnisBlocks: ContentBlock[];
  highlights: ContentBlock[];
}

export interface ProjectsPresenterOutput {
  projects: ProjectCardViewModel[];
  placeholderProject: ProjectCardViewModel;
}

export const PLACEHOLDER_PROJECT: ProjectCardViewModel = {
  id: 'placeholder-projects',
  title: 'Projekte, die ich umsetzen möchte',
  category: 'Ideensammlung',
  isPlaceholder: true,
  tags: [
    'Simple Notizapp in Kotlin',
    'App für Lebensmittelverwaltung',
    'Personal Assistant mit RAG',
    'HomeAssistant ins HomeLab einbinden',
  ],
  tabs: ['In Planung'],
  tabItems: [{ label: 'In Planung', abbr: 'In Planung' }],
  descriptionBlocks: [],
  ergebnisBlocks: [],
  highlights: [],
};

export function isSection(item: ContentBlock): item is HighlightSection {
  return typeof item === 'object' && item !== null && 'category' in item && 'items' in item;
}

export type ProjectInput =
  | ProjectEntry
  | (Partial<ProjectCardViewModel> & {
      title: string;
      id?: string;
      description?: ProjectEntry['description'];
      ergebnis?: ProjectEntry['ergebnis'];
    });

/**
 * Reines Mapping eines einzelnen Projekt-Datensatzes auf das View-Model der ProjectCard
 */
export function presentProjectCard(raw: ProjectInput): ProjectCardViewModel {
  const isPlaceholder = Boolean(
    raw.isPlaceholder || raw.title === '...' || raw.title === 'Projekte, die ich umsetzen möchte'
  );
  const sourceUrl = raw.sourceUrl || ('githubUrl' in raw ? raw.githubUrl : undefined);
  const rawTabs = raw.tabs ?? [];

  const tabItems: TabItem[] = rawTabs.map((tab) => ({
    label: tab,
    abbr: getTabAbbr(tab),
  }));

  let descriptionBlocks: ContentBlock[] = [];
  if ('descriptionBlocks' in raw && Array.isArray(raw.descriptionBlocks)) {
    descriptionBlocks = raw.descriptionBlocks;
  } else if ('description' in raw && raw.description) {
    descriptionBlocks = Array.isArray(raw.description) ? raw.description : [raw.description];
  }

  let ergebnisBlocks: ContentBlock[] = [];
  if ('ergebnisBlocks' in raw && Array.isArray(raw.ergebnisBlocks)) {
    ergebnisBlocks = raw.ergebnisBlocks;
  } else if ('ergebnis' in raw && raw.ergebnis) {
    ergebnisBlocks = Array.isArray(raw.ergebnis) ? raw.ergebnis : [raw.ergebnis];
  }

  let highlights: ContentBlock[] = [];
  if ('highlights' in raw && raw.highlights) {
    highlights = Array.isArray(raw.highlights) ? raw.highlights : [raw.highlights];
  }

  return {
    id: raw.id ?? '',
    title: raw.title,
    shortTitle: raw.shortTitle,
    category: raw.category ?? '',
    period: raw.period,
    privat: raw.privat,
    uni: raw.uni,
    isPlaceholder,
    tags: raw.tags ?? [],
    shortTags: raw.shortTags ?? [],
    sourceUrl,
    tabs: rawTabs,
    tabItems,
    descriptionBlocks,
    ergebnisBlocks,
    highlights,
  };
}

/**
 * Deterministische Sortierreihenfolge der Projekte (entspricht der ursprünglichen Indizierung 0, 1, 2, 3, 5, 4)
 */
export const DESIRED_PROJECT_ORDER: readonly string[] = [
  'speech-to-speech-rag-simulation',
  'rag-text-party-analysis',
  'patient-ai-mhealth',
  'homelab-infrastructure',
  'self-hosted-portfolio-infrastructure',
  'agentic-ai-local-experiments',
];

/**
 * Reiner Presenter für die gesamte Projects-Sektion
 */
export function presentProjects(
  entries: Array<{ id: string; data: ProjectEntry } | ProjectEntry>
): ProjectsPresenterOutput {
  const projectMap = new Map<string, ProjectEntry>();

  for (const entry of entries) {
    const data = 'data' in entry ? entry.data : entry;
    const id = ('id' in entry && typeof entry.id === 'string') ? entry.id : data.id;
    projectMap.set(id, data);
  }

  const orderedProjects: ProjectCardViewModel[] = [];

  for (const id of DESIRED_PROJECT_ORDER) {
    const item = projectMap.get(id);
    if (item) {
      orderedProjects.push(presentProjectCard(item));
    }
  }

  // Fallback: Falls noch weitere Projekte in der Collection existieren, die nicht in DESIRED_PROJECT_ORDER sind:
  for (const [id, item] of projectMap.entries()) {
    if (!DESIRED_PROJECT_ORDER.includes(id)) {
      orderedProjects.push(presentProjectCard(item));
    }
  }

  return {
    projects: orderedProjects,
    placeholderProject: PLACEHOLDER_PROJECT,
  };
}
