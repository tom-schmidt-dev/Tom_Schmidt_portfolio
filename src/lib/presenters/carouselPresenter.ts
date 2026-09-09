export interface CarouselProps {
  id?: string;
  ariaLabel?: string;
  cardHeightCollapsed?: string;
  cardHeightExpanded?: string;
}

export const DEFAULT_CAROUSEL_PROPS: Required<CarouselProps> = {
  id: '',
  ariaLabel: 'Karussell',
  cardHeightCollapsed: '20.5rem',
  cardHeightExpanded: '27.5rem',
};

/**
 * Reiner Presenter für das Karussell
 */
export function presentCarousel(options?: Partial<CarouselProps>): Required<CarouselProps> {
  return {
    id: options?.id ?? DEFAULT_CAROUSEL_PROPS.id,
    ariaLabel: options?.ariaLabel ?? DEFAULT_CAROUSEL_PROPS.ariaLabel,
    cardHeightCollapsed: options?.cardHeightCollapsed ?? DEFAULT_CAROUSEL_PROPS.cardHeightCollapsed,
    cardHeightExpanded: options?.cardHeightExpanded ?? DEFAULT_CAROUSEL_PROPS.cardHeightExpanded,
  };
}
