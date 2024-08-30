import api from '../interceptor';

const restController = {
  // User-related requests
  registerRequest: (data) => api.post('registration', data),
  loginRequest: (data) => api.post('login', data),
  getUser: () => api.get('getUser'),
  updateUser: (data) => api.put('updateUser', data),
  cashOut: (data) => api.post('cashout', data),

  // Contest-related requests
  updateContest: (data) => api.put('updateContest', data),
  getCustomersContests: ({ limit, offset, contestStatus }) =>
    api.get('getCustomersContests', {
      params: { limit, offset },
      headers: { status: contestStatus },
    }),
  getActiveContests: (query) => api.get('getAllContests', { params: query }),
  getContestById: (contestId) => api.get(`getContestById/${contestId}`),
  dataForContest: (params) => api.get('dataForContest', { params }),
  changeMark: (data) => api.put('changeMark', data),

  // Offer-related requests
  setNewOffer: (data) =>
    api.post('setNewOffer', data, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    }),
  setOfferStatus: (data) => api.put('setOfferStatus', data),

  // Chat-related requests
  getPreviewChat: () => api.get('getPreview'),
  getDialog: (params) => api.get('getChat', { params }),
  newMessage: (data) => api.post('newMessage', data),
  changeChatFavorite: (data) => api.put('favorite', data),
  changeChatBlock: (data) => api.put('blackList', data),
  getCatalogList: () => api.get('getCatalogs'),
  addChatToCatalog: (data) => api.post('addNewChatToCatalog', data),
  createCatalog: (data) => api.post('createCatalog', data),
  deleteCatalog: (catalogId) => api.delete('deleteCatalog', { catalogId }),
  removeChatFromCatalog: (data) =>
    api.delete('removeChatFromCatalog', { data }),
  changeCatalogName: (data) => api.put('updateNameCatalog', data),

  // File-related requests
  downloadContestFile: (fileName) => api.get(`downloadFile/${fileName}`),

  // Payment-related requests
  payMent: (data) => api.post('pay', data.formData),
};

export default restController;
