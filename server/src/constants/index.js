require('dotenv').config({ path: '../.env' });

module.exports = {
  AUTH: {
    JWT_SECRET: process.env.JWT_SECRET,
    ACCESS_TOKEN_TIME: 60 * 60,
    SALT_ROUNDS: parseInt(process.env.SALT_ROUNDS),
  },

  SQUADHELP_BANK: {
    NUMBER: process.env.CARD_NUMBER,
    NAME: process.env.CARD_NAME,
    CVC: process.env.CARD_CVC,
    EXPIRY: process.env.CARD_EXPIRY,
  },

  USER_ROLES: {
    CUSTOMER: 'customer',
    CREATOR: 'creator',
    CREATOR_ENTRIES: 'creator_entries',
  },

  CONTEST_STATUS: {
    ACTIVE: 'active',
    FINISHED: 'finished',
    PENDING: 'pending',
  },

  CONTEST_TYPES: {
    NAME_CONTEST: 'name',
    LOGO_CONTEST: 'logo',
    TAGLINE_CONTEST: 'tagline',
  },

  OFFER_STATUS: {
    PENDING: 'pending',
    REJECTED: 'rejected',
    WON: 'won',
  },

  PATHS: {
    CONTESTS_DEFAULT_DIR: 'public/contestFiles/',
    FILES_PATH: 'public/',
  },

  SOCKET_EVENTS: {
    CONNECTION: 'connection',
    SUBSCRIBE: 'subscribe',
    UNSUBSCRIBE: 'unsubscribe',
  },

  NOTIFICATIONS: {
    ENTRY_CREATED: 'onEntryCreated',
    CHANGE_MARK: 'changeMark',
    CHANGE_OFFER_STATUS: 'changeOfferStatus',
  },

  MESSAGES: {
    NEW_MESSAGE: 'newMessage',
  },

  BLOCK_STATUS: {
    CHANGE: 'CHANGE_BLOCK_STATUS',
  },
};
