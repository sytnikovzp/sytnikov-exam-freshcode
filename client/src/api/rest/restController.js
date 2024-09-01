import api from '../interceptor';

const restController = {
  // Authentication
  registerRequest: (data) => api.post('registration', data),
  loginRequest: (data) => api.post('login', data),
  getUser: () => api.get('getUser'),

  // User management
  updateUser: (data) => api.put('updateUser', data),
  changeMark: (data) => api.post('changeMark', data),

  // Contest management
  updateContest: (data) => api.put('updateContest', data),
  setNewOffer: (data) => api.post('setNewOffer', data),
  setOfferStatus: (data) => api.post('setOfferStatus', data),
  downloadContestFile: (data) => api.get(`downloadFile/${data.fileName}`),
  dataForContest: (data) => api.post('dataForContest', data),
  getActiveContests: (query) => api.get('getAllContests', { params: query }),
  getContestById: (data) =>
    api.get('getContestById', {
      headers: {
        contestId: data.contestId,
      },
    }),

  // Payments
  payMent: (data) => api.post('pay', data.formData),
  cashOut: (data) => api.post('cashout', data),

  // Chat management
  getPreviewChat: () => api.get('getPreview'),
  getDialog: (data) => api.get('getChat', data),
  newMessage: (data) => api.post('newMessage', data),
  changeChatFavorite: (data) => api.patch('favorite', data),
  changeChatBlock: (data) => api.patch('blackList', data),

  // Catalog chat management
  getCatalogList: (data) => api.get('getCatalogs', data),
  addChatToCatalog: (data) => api.put('addNewChatToCatalog', data),
  createCatalog: (data) => api.post('createCatalog', data),
  deleteCatalog: (data) => api.delete('deleteCatalog', data),
  removeChatFromCatalog: (data) => api.patch('removeChatFromCatalog', data),
  changeCatalogName: (data) => api.put('updateNameCatalog', data),

  // Customer contests
  getCustomersContests: (data) =>
    api.get(
      'getCustomersContests',
      {
        limit: data.limit,
        offset: data.offset,
      },
      {
        headers: {
          status: data.contestStatus,
        },
      }
    ),
};

export default restController;
