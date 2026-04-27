import { useDispatch, useSelector } from 'react-redux';
import {
  fetchCampaigns,
  createCampaign,
  deleteCampaign,
  regenerateImage,
  regenerateCopy,
  setCurrentCampaign,
  clearCurrentCampaign,
  setPage,
} from '../store/slices/campaignSlice';

export const useCampaign = () => {
  const dispatch = useDispatch();
  const { campaigns, currentCampaign, total, page, limit, loading, error } = useSelector(
    (state) => state.campaigns
  );
  
  const getCampaigns = (params = {}) => {
    dispatch(fetchCampaigns({ page, limit, ...params }));
  };
  
  const createNewCampaign = (formData) => {
    return dispatch(createCampaign(formData)).unwrap();
  };
  
  const removeCampaign = (id) => {
    return dispatch(deleteCampaign(id)).unwrap();
  };
  
  const regenerateCampaignImage = (id) => {
    return dispatch(regenerateImage(id)).unwrap();
  };
  
  const regenerateCampaignCopy = (id) => {
    return dispatch(regenerateCopy(id)).unwrap();
  };
  
  const selectCampaign = (campaign) => {
    dispatch(setCurrentCampaign(campaign));
  };
  
  const clearSelectedCampaign = () => {
    dispatch(clearCurrentCampaign());
  };
  
  const changePage = (newPage) => {
    dispatch(setPage(newPage));
    getCampaigns({ page: newPage });
  };
  
  return {
    campaigns,
    currentCampaign,
    total,
    page,
    limit,
    loading,
    error,
    getCampaigns,
    createNewCampaign,
    removeCampaign,
    regenerateCampaignImage,
    regenerateCampaignCopy,
    selectCampaign,
    clearSelectedCampaign,
    changePage,
  };
};