export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  const minLength = 6;
  const hasUpperCase = /[A-Z]/.test(password);
  const hasLowerCase = /[a-z]/.test(password);
  const hasNumbers = /\d/.test(password);
  const hasSpecialChar = /[!@#$%^&*]/.test(password);
  
  return {
    isValid: password.length >= minLength && hasUpperCase && hasLowerCase && hasNumbers,
    errors: {
      minLength: password.length < minLength,
      hasUpperCase: !hasUpperCase,
      hasLowerCase: !hasLowerCase,
      hasNumbers: !hasNumbers,
      hasSpecialChar: !hasSpecialChar,
    },
  };
};

export const validatePrompt = (prompt) => {
  const minLength = 10;
  const maxLength = 500;
  
  return {
    isValid: prompt.length >= minLength && prompt.length <= maxLength,
    errors: {
      tooShort: prompt.length < minLength,
      tooLong: prompt.length > maxLength,
    },
  };
};

export const validateCtaText = (ctaText) => {
  const maxLength = 50;
  
  return {
    isValid: ctaText.length <= maxLength,
    errors: {
      tooLong: ctaText.length > maxLength,
    },
  };
};