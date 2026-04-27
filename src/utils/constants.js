export const PLATFORMS = {
  INSTAGRAM: {
    name: 'Instagram',
    icon: 'FaInstagram',
    color: '#E4405F',
    dimensions: { width: 1080, height: 1080 },
    captionLimit: 2200,
    hashtagLimit: 30,
  },
  LINKEDIN: {
    name: 'LinkedIn',
    icon: 'FaLinkedin',
    color: '#0077B5',
    dimensions: { width: 1200, height: 627 },
    captionLimit: 3000,
    hashtagLimit: 3,
  },
  FACEBOOK: {
    name: 'Facebook',
    icon: 'FaFacebook',
    color: '#1877F2',
    dimensions: { width: 1200, height: 628 },
    captionLimit: 63206,
    hashtagLimit: 30,
  },
  TWITTER: {
    name: 'Twitter',
    icon: 'FaTwitter',
    color: '#1DA1F2',
    dimensions: { width: 1024, height: 512 },
    captionLimit: 280,
    hashtagLimit: 2,
  },
};

export const BRAND_VOICES = {
  WITTY: {
    name: 'Witty',
    icon: 'FaSmileWink',
    description: 'Humorous, clever, and playful',
  },
  PROFESSIONAL: {
    name: 'Professional',
    icon: 'FaBriefcase',
    description: 'Formal, sophisticated, and business-appropriate',
  },
  URGENT: {
    name: 'Urgent',
    icon: 'FaClock',
    description: 'Time-sensitive, action-driven with FOMO',
  },
  INSPIRATIONAL: {
    name: 'Inspirational',
    icon: 'FaStar',
    description: 'Uplifting, motivational, and aspirational',
  },
};

export const SUBSCRIPTION_PLANS = {
  FREE: {
    name: 'Free',
    price: 0,
    campaignsPerMonth: 10,
    features: [
      '10 campaigns per month',
      'Basic AI image generation',
      'Standard quality',
      'Email support',
    ],
  },
  PRO: {
    name: 'Pro',
    price: 29.99,
    campaignsPerMonth: 100,
    features: [
      '100 campaigns per month',
      'HD image generation',
      'Priority processing',
      'Priority support',
      'Advanced brand voice tuning',
      'Custom templates',
    ],
  },
  ENTERPRISE: {
    name: 'Enterprise',
    price: 99.99,
    campaignsPerMonth: 'Unlimited',
    features: [
      'Unlimited campaigns',
      '4K image generation',
      'Fastest processing',
      '24/7 dedicated support',
      'Custom AI model training',
      'API access',
      'Team collaboration',
    ],
  },
};

export const API_ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    ME: '/auth/me',
    UPDATE_PROFILE: '/auth/profile',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  CAMPAIGNS: {
    BASE: '/campaigns',
    REGENERATE_IMAGE: (id) => `/campaigns/${id}/regenerate-image`,
    REGENERATE_COPY: (id) => `/campaigns/${id}/regenerate-copy`,
    DUPLICATE: (id) => `/campaigns/${id}/duplicate`,
    STATS: '/campaigns/stats',
  },
  IMAGES: {
    GENERATE: '/images/generate',
    COMPOSITE: '/images/composite',
    UPLOAD: '/images/upload',
    VARIATIONS: '/images/variations',
  },
  TEXT: {
    GENERATE: '/text/generate',
    VARIATIONS: '/text/variations',
    IMPROVE: '/text/improve',
    ANALYZE: '/text/analyze',
  },
};