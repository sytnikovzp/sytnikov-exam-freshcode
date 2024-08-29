import api from '../interceptor';

// User-related requests
export const registerRequest = (data) => api.post('registration', data);
export const loginRequest = (data) => api.post('login', data);
export const getUser = () => api.get('getUser');
export const updateUser = (data) => api.put('updateUser', data);
export const cashOut = (data) => api.post('cashout', data);

// Contest-related requests
export const updateContest = (data) => api.put('updateContest', data);
export const getCustomersContests = ({ limit, offset, contestStatus }) =>
  api.get('getCustomersContests', {
    params: { limit, offset },
    headers: { status: contestStatus },
  });
export const getActiveContests = (query) =>
  api.get('getAllContests', { params: query });
export const getContestById = (contestId) =>
  api.get('getContestById', {
    headers: { contestId },
  });
export const dataForContest = (params) => api.get('dataForContest', { params });
export const changeMark = (data) => api.put('changeMark', data);

// Offer-related requests
export const setNewOffer = (data) => api.post('setNewOffer', data);
export const setOfferStatus = (data) => api.put('setOfferStatus', data);

// Chat-related requests
export const getPreviewChat = () => api.get('getPreview');
export const getDialog = (params) => api.get('getChat', { params });
export const newMessage = (data) => api.post('newMessage', data);
export const changeChatFavorite = (data) => api.put('favorite', data);
export const changeChatBlock = (data) => api.put('blackList', data);
export const getCatalogList = () => api.get('getCatalogs');
export const addChatToCatalog = (data) => api.post('addNewChatToCatalog', data);
export const createCatalog = (data) => api.post('createCatalog', data);
export const deleteCatalog = (data) => api.delete('deleteCatalog', { data });
export const removeChatFromCatalog = (data) =>
  api.delete('removeChatFromCatalog', { data });
export const changeCatalogName = (data) => api.put('updateNameCatalog', data);

// File-related requests
export const downloadContestFile = (fileName) =>
  api.get(`downloadFile/${fileName}`);

// Payment-related requests
export const payMent = (data) => api.post('pay', data.formData);
