import api from '../interceptor';

const restController = {
  // Authentication
  registerRequest: (data) => api.post('auth/registration', data),
  loginRequest: (data) => api.post('auth/login', data),
  getUser: () => api.get('auth/getUser'),

  // User management
  updateUser: (data) => api.put('user/updateUser', data),
  changeMark: (data) => api.patch('user/changeMark', data),

  // Contest management
  updateContest: (data) => api.patch('contest/updateContest', data),
  setNewOffer: (data) => api.post('contest/setNewOffer', data),
  setOfferStatus: (data) => api.post('contest/setOfferStatus', data),
  downloadContestFile: (data) =>
    api.get(`contest/downloadFile/${data.fileName}`),
  dataForContest: (data) => api.post('contest/dataForContest', data),
  getAllContests: (params) => api.get('contest/getAllContests', { params }),
  getContestById: (data) =>
    api.get('contest/getContestById', {
      headers: {
        contestId: data.contestId,
      },
    }),
  getCustomersContests: (data) =>
    api.get('contest/getCustomersContests', {
      params: {
        limit: data.limit,
        offset: data.offset,
      },
      headers: {
        status: data.contestStatus,
      },
    }),

  // Payments
  payMent: (data) => api.post('payment/pay', data.formData),
  cashOut: (data) => api.post('payment/cashout', data),

  // Chat management
  getPreviewChat: () => api.get('chat/getPreview'),
  getDialogMessages: (data) =>
    api.get('chat/getChat', {
      params: {
        interlocutorId: data.interlocutorId,
      },
    }),
  newMessage: (data) => api.post('chat/newMessage', data),
  changeChatFavorite: (data) => api.patch('chat/favorite', data),
  changeChatBlock: (data) => api.patch('chat/blackList', data),

  // Catalog chat management
  getCatalogList: () => api.get('chat/getCatalogs'),
  addChatToCatalog: (data) => api.patch('chat/addNewChatToCatalog', data),
  createCatalog: (data) => api.post('chat/createCatalog', data),
  deleteCatalog: (data) => api.delete('chat/deleteCatalog', data),
  removeChatFromCatalog: (data) =>
    api.patch('chat/removeChatFromCatalog', data),
  changeCatalogName: (data) => api.patch('chat/updateNameCatalog', data),
};

export default restController;
