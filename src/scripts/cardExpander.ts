/**
 * Zentrales Expander-Script für interaktive Karten (ProjectCard, Skills)
 * Nutzt Event-Delegation am document zur Vermeidung redundanter Script-Blöcke.
 */

function toggleExpandableCard(card: HTMLElement): void {
  const isExpanded = card.getAttribute('data-expanded') === 'true';
  const nextExpanded = !isExpanded;

  // Zustand am Container setzen
  card.setAttribute('data-expanded', String(nextExpanded));
  card.setAttribute('aria-expanded', String(nextExpanded));

  // Element mit [data-expand-full] zwischen hidden und block umschalten (ohne Animationszeit)
  const fullContainers = card.querySelectorAll<HTMLElement>('[data-expand-full]');
  fullContainers.forEach((el) => {
    if (nextExpanded) {
      el.classList.remove('hidden');
      el.classList.add('block');
    } else {
      el.classList.add('hidden');
      el.classList.remove('block');
    }
  });

  // Text des Buttons mit [data-expand-btn] zwischen [mehr Info] und [weniger Info] wechseln
  const btns = card.querySelectorAll<HTMLElement>('[data-expand-btn]');
  btns.forEach((btn) => {
    btn.textContent = nextExpanded ? '[weniger Info]' : '[mehr Info]';
  });
}

function handleCardClick(e: MouseEvent): void {
  const target = e.target as HTMLElement | null;
  if (!target) return;

  // Klick auf Links (a), .project-action-link oder Tabs ([data-card-tab]) isolieren
  const actionLink = target.closest('a, .project-action-link, [data-card-tab], [data-card-tabs]');
  if (actionLink) {
    return;
  }

  // Prüfen, ob innerhalb einer erweiterbaren Karte geklickt wurde
  const card = target.closest<HTMLElement>('[data-expandable-card]');
  if (!card) return;

  // Klick ignorieren, wenn das umschließende Karussell gerade gewischt wird
  if (card.closest('[data-carousel]')?.getAttribute('data-is-swiping') === 'true') {
    return;
  }

  toggleExpandableCard(card);
}

function handleCardKeydown(e: KeyboardEvent): void {
  if (e.key !== 'Enter' && e.key !== ' ' && e.key !== 'Spacebar') return;

  const target = e.target as HTMLElement | null;
  if (!target) return;

  // Ignoriere Tastatur-Events, wenn ein Link oder Tab fokussiert ist
  if (target.closest('a, .project-action-link, [data-card-tab], [data-card-tabs]') || document.activeElement?.closest('a, .project-action-link, [data-card-tab], [data-card-tabs]')) return;

  const card = target.closest<HTMLElement>('[data-expandable-card]');
  if (!card) return;

  // Nur umschalten, wenn die Karte selbst oder ihr data-expand-btn den Fokus hat
  if (target === card || target.hasAttribute('data-expand-btn') || target.closest('[data-expand-btn]')) {
    e.preventDefault();
    toggleExpandableCard(card);
  }
}

function initCardExpander(): void {
  if (document.body && document.body.dataset.cardExpanderInitialized === 'true') return;
  if (document.body) {
    document.body.dataset.cardExpanderInitialized = 'true';
  }

  // Mehrfachregistrierung ausschließen: Vorherige Listener abmelden und neu binden
  document.removeEventListener('click', handleCardClick);
  document.addEventListener('click', handleCardClick);

  document.removeEventListener('keydown', handleCardKeydown);
  document.addEventListener('keydown', handleCardKeydown);
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initCardExpander);
} else {
  initCardExpander();
}
document.addEventListener('astro:page-load', initCardExpander);
