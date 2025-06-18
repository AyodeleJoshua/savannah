import '@testing-library/jest-dom';
import { vi } from 'vitest';

vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => vi.fn(),
    useLocation: () => ({ pathname: '/test' }),
  };
});

vi.mock('*.module.scss', () => ({
  default: {
    'input-wrapper': 'input-wrapper',
    'input-wrapper__field-container': 'input-wrapper__field-container',
    'input-wrapper__icon': 'input-wrapper__icon',
    'input-wrapper__input': 'input-wrapper__input',
    'multi-select-dropdown': 'multi-select-dropdown',
    'multi-select-dropdown__button': 'multi-select-dropdown__button',
    'multi-select-dropdown__button-icon': 'multi-select-dropdown__button-icon',
    'multi-select-dropdown__panel': 'multi-select-dropdown__panel',
    'multi-select-dropdown__search': 'multi-select-dropdown__search',
    'multi-select-dropdown__search-icon': 'multi-select-dropdown__search-icon',
    'multi-select-dropdown__search-input': 'multi-select-dropdown__search-input',
    'multi-select-dropdown__options': 'multi-select-dropdown__options',
    'multi-select-dropdown__option': 'multi-select-dropdown__option',
    'multi-select-dropdown__option-checkbox': 'multi-select-dropdown__option-checkbox',
    'multi-select-dropdown__option-label': 'multi-select-dropdown__option-label',
    'multi-select-dropdown__option-count': 'multi-select-dropdown__option-count',
    'multi-select-dropdown__clear-button': 'multi-select-dropdown__clear-button',
    'card': 'card',
    'card__icon-section': 'card__icon-section',
    'card__icon-section--archived': 'card__icon-section--archived',
    'card__icon': 'card__icon',
    'card__content-section': 'card__content-section',
    'card__header-row': 'card__header-row',
    'card__title': 'card__title',
    'card__cloud-icons': 'card__cloud-icons',
    'card__description': 'card__description',
    'card__tags-row': 'card__tags-row',
    'card__tag': 'card__tag',
    'card__impact-section': 'card__impact-section',
    'card__impact-title': 'card__impact-title',
    'card__violations': 'card__violations',
    'modal-overlay': 'modal-overlay',
    'modal': 'modal',
    'modal__header': 'modal__header',
    'modal__header-content': 'modal__header-content',
    'modal__header-icon': 'modal__header-icon',
    'modal__header-text': 'modal__header-text',
    'modal__title': 'modal__title',
    'modal__score-providers': 'modal__score-providers',
    'modal__providers': 'modal__providers',
    'modal__provider-icon': 'modal__provider-icon',
    'modal__close-button': 'modal__close-button',
    'modal__content': 'modal__content',
    'modal__section': 'modal__section',
    'modal__section-title': 'modal__section-title',
    'modal__description': 'modal__description',
    'modal__row': 'modal__row',
    'modal__icon': 'modal__icon',
    'modal__tags': 'modal__tags',
    'modal__tag': 'modal__tag',
    'modal__impact-cards': 'modal__impact-cards',
    'modal__impact-card': 'modal__impact-card',
    'modal__impact-card-label': 'modal__impact-card-label',
    'modal__impact-card-value': 'modal__impact-card-value',
    'modal__impact-card-number': 'modal__impact-card-number',
    'score__value-score': 'score__value-score',
    'score__value-box': 'score__value-box',
    'score__value-box--inactive': 'score__value-box--inactive',
  },
}));

vi.mock('react-icons/lu', () => ({
  LuLayoutDashboard: () => 'Dashboard',
  LuClipboardList: () => 'Policies',
  LuClipboardCopy: () => 'Events',
  LuLogOut: () => 'Logout',
  LuX: () => 'Close',
  LuFilter: () => 'Filter',
  LuBoxes: () => 'Boxes',
}));

vi.mock('react-icons/pi', () => ({
  PiStarFourBold: () => 'Star',
}));

vi.mock('react-icons/md', () => ({
  MdReportGmailerrorred: () => 'Report',
}));

vi.mock('react-icons/hi2', () => ({
  HiMagnifyingGlass: () => 'Search',
}));

vi.mock('react-icons/io5', () => ({
  IoClose: () => 'Close',
  IoChevronForwardSharp: () => 'Chevron',
}));

vi.mock('react-icons/ri', () => ({
  RiBox3Line: () => 'Box',
}));

vi.mock('react-icons/fa6', () => ({
  FaAws: () => 'AWS',
  FaExternalLinkAlt: () => 'External',
}));

vi.mock('react-icons/si', () => ({
  SiGooglecloud: () => 'GCP',
}));

vi.mock('react-icons/vsc', () => ({
  VscAzure: () => 'Azure',
}));

vi.mock('react-icons/fi', () => ({
  FiArchive: () => 'Archive',
}));

vi.mock('*.png', () => ({
  default: 'mocked-image.png',
}));

global.ResizeObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

global.IntersectionObserver = vi.fn().mockImplementation(() => ({
  observe: vi.fn(),
  unobserve: vi.fn(),
  disconnect: vi.fn(),
}));

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: vi.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: vi.fn(),
    removeListener: vi.fn(),
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
    dispatchEvent: vi.fn(),
  })),
}); 