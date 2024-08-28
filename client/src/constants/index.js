const env = import.meta.env.MODE || 'development';

const SERVER_CONFIG = {
  IP: 'localhost',
  PORT: env === 'production' ? 80 : 3000,
  BASE_URL: `http://${this.IP}:${this.PORT}/`,
  PUBLIC_URL: `http://${this.IP}:${this.PORT}/public/images/`,
};

const TOKEN_CONFIG = {
  ACCESS_TOKEN: 'accessToken',
  REFRESH_TOKEN: 'refreshToken',
};

const USER_ROLES = {
  CUSTOMER: 'customer',
  CREATOR: 'creator',
};

const CONTEST_STATUS = {
  ACTIVE: 'active',
  FINISHED: 'finished',
  PENDING: 'pending',
};

const CONTEST_TYPES = {
  NAME: 'name',
  LOGO: 'logo',
  TAGLINE: 'tagline',
};

const OFFER_STATUS = {
  REJECTED: 'rejected',
  WON: 'won',
  PENDING: 'pending',
};

const IMAGE_PATHS = {
  STATIC: '/staticImages/',
  ANONYM: '/staticImages/anonym.png',
};

const CHAT_MODES = {
  NORMAL: 'NORMAL_PREVIEW_CHAT_MODE',
  FAVORITE: 'FAVORITE_PREVIEW_CHAT_MODE',
  BLOCKED: 'BLOCKED_PREVIEW_CHAT_MODE',
  CATALOG: 'CATALOG_PREVIEW_CHAT_MODE',
};

const CHAT_ACTION_TYPES = {
  CHANGE_BLOCK_STATUS: 'CHANGE_BLOCK_STATUS',
  ADD_CHAT_TO_OLD_CATALOG: 'ADD_CHAT_TO_OLD_CATALOG',
  CREATE_NEW_CATALOG_AND_ADD_CHAT: 'CREATE_NEW_CATALOG_AND_ADD_CHAT',
};

const UI_MODES = {
  USER_INFO: 'USER_INFO_MODE',
  CASHOUT: 'CASHOUT_MODE',
};

const AUTH_MODE = {
  REGISTER: 'REGISTER',
  LOGIN: 'LOGIN',
};

const HEADER_ANIMATION_TEXT = [
  'a Company',
  'a Brand',
  'a Website',
  'a Service',
  'a Book',
  'a Business',
  'an App',
  'a Product',
  'a Startup',
];

const FOOTER_ITEMS = [
  {
    title: 'SQUADHELP',
    items: ['About', 'Contact', 'How It Works?', 'Testimonials', 'Our Work'],
  },
  {
    title: 'RESOURCES',
    items: [
      'How It Works',
      'Become a Creative',
      'Business Name Generator',
      'Discussion Forum',
      'Blog',
      'Download eBook',
      'Pricing',
      'Help & FAQs',
    ],
  },
  {
    title: 'OUR SERVICES',
    items: [
      'Naming',
      'Logo Design',
      'Taglines',
      'Premium Names For Sale',
      'Creative Owned Names For Sale',
      'Audience Testing',
      'Trademark Research & Filling',
      'Managed Agency Service',
    ],
  },
  {
    title: 'LEGAL',
    items: ['Terms of Service', 'Privacy Policy', 'Cookie Policy'],
  },
];

export {
  SERVER_CONFIG,
  TOKEN_CONFIG,
  USER_ROLES,
  CONTEST_STATUS,
  CONTEST_TYPES,
  OFFER_STATUS,
  IMAGE_PATHS,
  CHAT_MODES,
  CHAT_ACTION_TYPES,
  UI_MODES,
  AUTH_MODE,
  HEADER_ANIMATION_TEXT,
  FOOTER_ITEMS,
};
