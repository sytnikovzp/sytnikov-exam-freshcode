const env = import.meta.env.MODE || 'development';

const SERVER_CONFIG = {
  HOST: 'localhost',
  PORT: env === 'production' ? 80 : 3000,
};

const BASE_URL = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/api/`;
const PUBLIC_URL = `http://${SERVER_CONFIG.HOST}:${SERVER_CONFIG.PORT}/public/images/`;

const AUTH_SLICE_NAME = 'auth';
const BUNDLE_SLICE_NAME = 'bundle';
const CHAT_SLICE_NAME = 'chat';
const CONTEST_BY_ID_SLICE_NAME = 'getContestById';
const CONTEST_CREATION_SLICE_NAME = 'contestCreation';
const CONTEST_UPDATION_SLICE_NAME = 'contestUpdation';
const CONTESTS_SLICE_NAME = 'contests';
const DATA_FOR_CONTEST_SLICE_NAME = 'dataForContest';
const PAYMENT_SLICE_NAME = 'payment';
const USER_PROFILE_SLICE_NAME = 'userProfile';
const USER_SLICE_NAME = 'user';

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

const SLIDER_TYPES = {
  MAIN: 'MAIN_SLIDER',
  EXAMPLE: 'EXAMPLE_SLIDER',
  FEEDBACK: 'FEEDBACK_SLIDER',
};

const MAIN_SLIDER_IMAGES = [
  '21..jpg',
  'B_1_01.jpg',
  'B_2_15.jpg',
  'Banner_Visual_Name_AA_48_StyleRevolver.jpg',
  'Banner_Visual_Name_AD_32_Monvelli.jpg',
  'Banner_Visual_Name_AG_15_Trusthaven.jpg',
  'Banner_Visual_Name_AK_03_pawxie.jpg',
  'Banner_Visual_Name_L_09_lush.jpg',
  'Banner_Visual_Name_P_42_Avanti.jpg',
  'Banner_Visual_Name_S_25_Autovity.jpg',
  'Banner_Visual_Name_W_33_Quantic.jpg',
  'Banner_Visual_Name_Y_29_Vechetti.jpg',
].map((image) => `${IMAGE_PATHS.STATIC}main_slider/${image}`);

const EXAMPLE_SLIDER_IMAGES = [
  '1.jpg',
  '2.jpg',
  '3.jpg',
  '4.jpg',
  '5.jpg',
  '6.jpg',
  '7.jpg',
  '8.jpg',
  '9.jpg',
  '10.jpg',
  '11.jpg',
  '12.jpg',
].map((image) => `${IMAGE_PATHS.STATIC}example_slider/${image}`);

const FEEDBACK_SLIDER_IMAGES = [
  'Blue dress professional Lynne Lowder-avatar.jpg',
  'Bonnie Linked-avatar.jpg',
  'IMG_0232-avatar.jpg',
  'me (5)-avatar.jpeg',
  'MoonFamily web size-avatar.jpg',
  'nathan2-avatar.jpg',
  'Simon-avatar.jpg',
  'squad-avatar.jpg',
  'Unbenannt1-avatar.jpg',
].map((image) => `${IMAGE_PATHS.STATIC}feedback_slider/${image}`);

const FEEDBACK_SLIDER_TEXT = [
  {
    name: 'Lynne',
    feedback:
      'Fantastic experience...so incredibly helpful. ' +
      'I never could have come up with such a great name on my own!',
  },
  {
    name: 'remad24',
    feedback:
      'This was a great way to get a name nailed down. ' +
      'I will definitely be using this service again and recommend! ' +
      "I'm so overwhelmed with the amazing entries and the " +
      'step-by-step process made things so go very smoothly',
  },
  {
    name: 'James Lunny',
    feedback:
      'This has been an awesome experience. I like how Squadhelp ' +
      'kept me engaged and offered assistance and hints throughout the entire competition.' +
      " The names submitted were very inventive and creative... I've been very impressed," +
      ' from start to finish. Thanks so much.',
  },
  {
    name: 'Ely Marcio',
    feedback:
      'It was great to run the contest. I achieved  by far more than I expected. ' +
      'The platform is easy to use. A lot of starting entrepreneurs believe that the know more ' +
      'than anyone else about their business. Those ones have no clue how higher they ' +
      'can reach using brainstorming. I would definitely recommend Squadhelp to anyone starting a business.',
  },
  {
    name: 'Michael Caldwell',
    feedback:
      'Squadhelp is a fantastic platform. The UX is really intuitive and feels so easy to use. ' +
      "You've taken a complex, stressful process and made it fun. Kudos.",
  },
  {
    name: 'Chris Heydemann',
    feedback:
      'Squadhelp platform and experience was excellent. It was so much fun to get all the input ' +
      'from Creatives, names I never would have thought of, and think about which my team and I liked ' +
      'the most, and why. Highly recommended!',
  },
  {
    name: 'Pate Moon',
    feedback:
      'This was a great experience for setting up a new brand - saved loads of time!!!',
  },
  {
    name: 'HappyGal',
    feedback:
      'Loved my experience with Squadhelp, was fantastic to be able to interact with the Creatives' +
      ' and receive entries that were tailored according to my feedback and requests. ' +
      'So glad I decided to try this!',
  },
  {
    name: 'Bonnie Larson',
    feedback:
      'I am very pleased with the quantity and quality of the several hundred submissions by the' +
      ' Creatives! It seemed everyone did their best to find just the right name. ' +
      "I will definitely use your program again should we need to - and I've already let hundreds of my " +
      'LinkedIn connections know you all ROCK!',
  },
];

const EXAMPLE_SLIDER_TEXT = [
  'vib.io',
  'Exactly.com',
  'Luresome.com',
  'Galore.com',
  'Dazzlia.com',
  'Overview.com',
  'GladAble.com',
  'Boltmetrics.com',
  'urbanyx.com',
  'upzin.com',
  'SurePawz.com',
  'CityScroll.com',
];

export {
  SERVER_CONFIG,
  BASE_URL,
  PUBLIC_URL,
  AUTH_SLICE_NAME,
  BUNDLE_SLICE_NAME,
  CHAT_SLICE_NAME,
  CONTEST_BY_ID_SLICE_NAME,
  CONTEST_CREATION_SLICE_NAME,
  CONTEST_UPDATION_SLICE_NAME,
  CONTESTS_SLICE_NAME,
  DATA_FOR_CONTEST_SLICE_NAME,
  PAYMENT_SLICE_NAME,
  USER_PROFILE_SLICE_NAME,
  USER_SLICE_NAME,
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
  SLIDER_TYPES,
  MAIN_SLIDER_IMAGES,
  EXAMPLE_SLIDER_IMAGES,
  FEEDBACK_SLIDER_IMAGES,
  FEEDBACK_SLIDER_TEXT,
  EXAMPLE_SLIDER_TEXT,
};
