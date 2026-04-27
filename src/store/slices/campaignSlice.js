import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import api from '../../services/api';

export const fetchCampaigns = createAsyncThunk(
  'campaigns/fetchAll',
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get('/campaigns', { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const createCampaign = createAsyncThunk(
  'campaigns/create',
  async (formData, { rejectWithValue }) => {
    try {
      const response = await api.post('/campaigns', formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const deleteCampaign = createAsyncThunk(
  'campaigns/delete',
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/campaigns/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const regenerateImage = createAsyncThunk(
  'campaigns/regenerateImage',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/campaigns/${id}/regenerate-image`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

export const regenerateCopy = createAsyncThunk(
  'campaigns/regenerateCopy',
  async (id, { rejectWithValue }) => {
    try {
      const response = await api.post(`/campaigns/${id}/regenerate-copy`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data?.error);
    }
  }
);

const initialState = {
  campaigns: [],
  currentCampaign: null,
  total: 0,
  page: 1,
  limit: 12,
  loading: false,
  error: null,
};

const campaignSlice = createSlice({
  name: 'campaigns',
  initialState,
  reducers: {
    setCurrentCampaign: (state, action) => {
      state.currentCampaign = action.payload;
    },
    clearCurrentCampaign: (state) => {
      state.currentCampaign = null;
    },
    setPage: (state, action) => {
      state.page = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Campaigns
      .addCase(fetchCampaigns.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCampaigns.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns = action.payload.data;
        state.total = action.payload.pagination?.total || action.payload.data.length;
      })
      .addCase(fetchCampaigns.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create Campaign
      .addCase(createCampaign.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCampaign.fulfilled, (state, action) => {
        state.loading = false;
        state.campaigns.unshift(action.payload.data);
        state.currentCampaign = action.payload.data;
      })
      .addCase(createCampaign.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete Campaign
      .addCase(deleteCampaign.fulfilled, (state, action) => {
        state.campaigns = state.campaigns.filter(c => c._id !== action.payload);
      })
      // Regenerate Image
      .addCase(regenerateImage.fulfilled, (state, action) => {
        const index = state.campaigns.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.campaigns[index] = action.payload.data;
        }
        if (state.currentCampaign?._id === action.payload.data._id) {
          state.currentCampaign = action.payload.data;
        }
      })
      // Regenerate Copy
      .addCase(regenerateCopy.fulfilled, (state, action) => {
        const index = state.campaigns.findIndex(c => c._id === action.payload.data._id);
        if (index !== -1) {
          state.campaigns[index] = action.payload.data;
        }
        if (state.currentCampaign?._id === action.payload.data._id) {
          state.currentCampaign = action.payload.data;
        }
      });
  },
});

export const { setCurrentCampaign, clearCurrentCampaign, setPage, clearError } = campaignSlice.actions;
export default campaignSlice.reducer;