/**
 * Tab-Abkürzungen und Helper für Karten-Tabs
 */
export const TAB_ABBREVIATIONS: Record<string, string> = {
  'Entwicklung & Architektur': 'Dev',
  'Künstliche Intelligenz': 'KI',
  'Machine Learning': 'ML',
  'Backend': 'Backend',
  'Datenaufbereitung': 'Datenaufb.',
  'Software-Architektur': 'Architektur',
  'Webinterface': 'Web',
};

export interface TabItem {
  label: string;
  abbr: string;
}

export function getTabAbbr(label: string): string {
  return TAB_ABBREVIATIONS[label] || label;
}

/**
 * Idempotente Initialisierung für Terminal-Tabs und Modus-Umschaltung
 * Bindung an 'astro:page-load' und 'DOMContentLoaded'
 * State-Haltung im DOM ausschließlich über semantische data-*-Attribute
 */
export function initTerminalTabs(): void {
  const terminals = document.querySelectorAll<HTMLElement>('.spec-terminal');
  terminals.forEach((terminal) => {
    if (terminal.dataset.tabsInitialized === 'true') return;
    terminal.dataset.tabsInitialized = 'true';

    // --- 1. Hauptmodus-Umschaltung (Short Facts <-> Chatbot) ---
    const modeTabs = terminal.querySelectorAll<HTMLButtonElement>('[data-mode-tab]');
    const viewFacts = terminal.querySelector<HTMLElement>('[data-mode-view="facts"]');
    const viewChat = terminal.querySelector<HTMLElement>('[data-mode-view="chat"]');

    modeTabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetMode = tab.getAttribute('data-mode-tab');

        modeTabs.forEach((t) => {
          t.classList.remove('font-bold', 'text-zinc-900', 'dark:text-zinc-100');
          t.classList.add('text-zinc-400', 'dark:text-zinc-500');
        });
        tab.classList.remove('text-zinc-400', 'dark:text-zinc-500');
        tab.classList.add('font-bold', 'text-zinc-900', 'dark:text-zinc-100');

        if (targetMode === 'facts') {
          viewFacts?.classList.remove('hidden');
          viewFacts?.classList.add('flex');
          viewChat?.classList.add('hidden');
          viewChat?.classList.remove('flex');
        } else if (targetMode === 'chat') {
          viewChat?.classList.remove('hidden');
          viewChat?.classList.add('flex');
          viewFacts?.classList.add('hidden');
          viewFacts?.classList.remove('flex');
        }
      });
    });

    // --- 2. Sub-Tabs für Short Facts ([01], [02], [03]) ---
    const tabs = terminal.querySelectorAll<HTMLButtonElement>('[data-spec-tab]');
    const panels = terminal.querySelectorAll<HTMLElement>('[data-spec-panel]');

    const activeClasses = [
      'border-zinc-900',
      'dark:border-zinc-100',
      'bg-transparent',
      'text-zinc-950',
      'dark:text-white',
    ];
    const inactiveClasses = [
      'border-zinc-300',
      'dark:border-zinc-700',
      'bg-transparent',
      'text-zinc-500',
      'hover:text-zinc-900',
      'dark:hover:text-zinc-100',
    ];

    tabs.forEach((tab) => {
      tab.addEventListener('click', () => {
        const targetKey = tab.getAttribute('data-spec-tab');

        tabs.forEach((t) => {
          t.classList.remove(...activeClasses);
          t.classList.add(...inactiveClasses);
        });
        tab.classList.remove(...inactiveClasses);
        tab.classList.add(...activeClasses);

        panels.forEach((panel) => {
          if (panel.getAttribute('data-spec-panel') === targetKey) {
            panel.classList.remove('hidden');
            panel.classList.add('block');
          } else {
            panel.classList.add('hidden');
            panel.classList.remove('block');
          }
        });
      });
    });
  });
}

if (typeof document !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTerminalTabs);
  } else {
    initTerminalTabs();
  }
  document.addEventListener('astro:page-load', initTerminalTabs);
}
