export interface MetricCard {
  title: string;
  titleLong?: string;
  subtitle: string;
}

export interface HeroProps {
  metrics?: MetricCard[];
  name?: string;
  headline?: string;
  bioParagraph1?: string;
  bioParagraph2?: string;
  availabilityText?: string;
  photoSrc?: string;
  photoAlt?: string;
  photoCredits?: string;
}

export const DEFAULT_HERO_PROPS: Required<HeroProps> = {
  metrics: [
    {
      title: 'B.Sc. CS',
      titleLong: 'B.Sc. Computer Science',
      subtitle: 'Schwerpunkt AI-Engineering',
    },
    {
      title: 'fachlich',
      subtitle: 'Praxis aus Studium und Privatinteresse',
    },
    {
      title: 'sozial',
      subtitle: 'Staatlich anerkannter Erzieher',
    },
    {
      title: 'engagiert & motiviert',
      subtitle: 'Ich bringe Hands-on Mentalität mit',
    },
  ],
  name: 'Tom Schmidt',
  headline: 'Hallo, ich bin Tom Schmidt.',
  bioParagraph1:
    'Als Informatikstudent im achten Semester suche ich eine Werkstudentenstelle, bei der ich meine in Uniprojekten sowie privat gesammelte Erfahrung im Bereich KI-Engineering einbringen und vertiefen kann. Mit Kenntnissen bspw. in Python, RAG und LangGraph-Workflows sowie im Umgang mit Docker und Linux bringe ich eine solide Basis mit.',
  bioParagraph2:
    'Ich habe den Anspruch, mich schnellstmöglich in bestehende Strukturen einzuarbeiten, um Verantwortung für Teilaufgaben zu übernehmen. Meine Projekterfahrung, sowie, dass ich bereits alle Module meines Bachelorstudiums abgeschlossen habe, kommt mir dahingehend zugute. Für das Sommersemester 2027 strebe ich an, meine Bachelorarbeit entsprechend einer für ein Unternehmen interessanten Fragestellung zu schreiben.',
  availabilityText: 'VERFÜGBAR ALS WERKSTUDENT',
  photoSrc: '/foto.jpg',
  photoAlt: 'Tom Schmidt',
  photoCredits: '© Foto for Life Berlin \n— Fotostudio & Production',
};

/**
 * Reiner Presenter für den Hero-Bereich
 */
export function presentHero(data?: Partial<HeroProps>): Required<HeroProps> {
  return {
    ...DEFAULT_HERO_PROPS,
    ...data,
  };
}
