export const validateEmail = (email) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

export const validatePhone = (phone) => {
  const phoneRegex = /^[6-9]\d{9}$/;
  const cleanedPhone = phone.replace(/\s+/g, '').replace(/[-()]/g, '');
  return phoneRegex.test(cleanedPhone);
};

export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

export const validateName = (name) => {
  return name && name.trim().length >= 2;
};

export const validateMessage = (message) => {
  return message && message.trim().length >= 10;
};