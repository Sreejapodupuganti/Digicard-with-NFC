import api from "./base";

export const getMyCard = () => api.get("/card/me");
export const updateMyCard = (data) => api.put("/card/me", data);
export const getPublicCard = (handle) => api.get(`/card/public/${handle}`);
export const getPublicWalletUrl = (data) => api.post(`/wallet/pass`, data);