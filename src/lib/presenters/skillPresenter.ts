import type { SkillEntry } from '../../content.config';
import { getTabAbbr, type TabItem } from '../../scripts/tabs';

export interface SkillCardViewModel {
  index?: string;
  title: string;
  tabs: string[];
  tabItems: TabItem[];
  description?: string;
  skills: string[];
  isPlaceholder: boolean;
}

export interface SkillsPresenterOutput {
  skills: SkillCardViewModel[];
  placeholderSkill: SkillCardViewModel;
}

export const PLACEHOLDER_SKILL: SkillCardViewModel = {
  title: '...',
  tabs: ['In Planung'],
  tabItems: [{ label: 'In Planung', abbr: 'In Planung' }],
  isPlaceholder: true,
  skills: [
    'Kotlin lernen',
    'Mehr agentic Workflows mit LangGraph',
    'Mehr N8N-Workflows',
    'Finetuning SLMs',
    'Qdrant',
    'pgvector',
  ],
};

export type SkillInput =
  | SkillEntry
  | (Partial<SkillCardViewModel> & { title: string });

/**
 * Reines Mapping eines einzelnen Skill-Datensatzes auf das View-Model der SkillCard
 */
export function presentSkillCard(raw: SkillInput): SkillCardViewModel {
  const isPlaceholder = Boolean(raw.isPlaceholder || raw.title === '...');
  const rawTabs = raw.tabs ?? [];

  const tabItems: TabItem[] = rawTabs.map((tab) => ({
    label: tab,
    abbr: getTabAbbr(tab),
  }));

  return {
    index: raw.index,
    title: raw.title,
    tabs: rawTabs,
    tabItems,
    description: raw.description,
    skills: raw.skills ?? [],
    isPlaceholder,
  };
}

/**
 * Reiner Presenter für die gesamte Skills-Sektion
 */
export function presentSkills(
  entries: Array<{ id?: string; data: SkillEntry } | SkillEntry>
): SkillsPresenterOutput {
  const rawList: SkillEntry[] = entries.map((entry) => ('data' in entry ? entry.data : entry));

  // Sortierung nach Index ("01", "02", ...)
  const sorted = [...rawList].sort((a, b) => {
    const idxA = a.index ?? '';
    const idxB = b.index ?? '';
    return idxA.localeCompare(idxB, undefined, { numeric: true });
  });

  const skills = sorted.map((item) => presentSkillCard(item));

  return {
    skills,
    placeholderSkill: PLACEHOLDER_SKILL,
  };
}
