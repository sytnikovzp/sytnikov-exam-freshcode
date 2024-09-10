import api from '../interceptor';

const restController = {
  // Authentication
  registerRequest: (data) => api.post('auth/registration', data),
  loginRequest: (data) => api.post('auth/login', data),

  // User management
  getUser: () => api.get('user/getUser'),
  updateUser: (data) => api.patch('user/updateUser', data),
  changeMark: (data) => api.patch('user/changeMark', data),

  // Payments & create contest
  payMent: (data) => api.post('payment/pay', data.formData),
  cashOut: (data) => api.post('payment/cashout', data),

  // Contest management
  createOffer: (data) => api.post('contest/createOffer', data),
  setOfferStatus: (data) => api.post('contest/setOfferStatus', data),
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
  updateContest: (data) => api.put('contest/updateContest', data),
  getDataForContest: (data) => api.post('contest/getDataForContest', data),
  downloadFile: (data) => api.get(`contest/downloadFile/${data.fileName}`),

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
