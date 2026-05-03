import emailjs from 'emailjs-com';

const PUBLIC_KEY = 'mODfoaaVs8-CWgH7y';
const SERVICE_ID = 'service_gp93srs';
const ADMIN_TEMPLATE_ID = 'template_375zf9o';

// Initialize EmailJS
emailjs.init(PUBLIC_KEY);

/**
 * Sends an appointment request email
 * @param {Object} formData 
 * @returns {Promise}
 */
export const sendAppointmentEmail = async (formData) => {
  try {
    const response = await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, formData);
    return response;
  } catch (error) {
    console.error('Error sending appointment email:', error);
    throw error;
  }
};

/**
 * Sends a general contact message email
 * @param {string} name 
 * @param {string} phone 
 * @param {string} email 
 * @param {string} subject 
 * @param {string} message 
 * @returns {Promise}
 */
export const sendContactEmail = async (name, phone, email, subject, message) => {
  const templateParams = {
    name,
    phone,
    email,
    subject,
    message
  };
  
  try {
    const response = await emailjs.send(SERVICE_ID, ADMIN_TEMPLATE_ID, templateParams);
    return response;
  } catch (error) {
    console.error('Error sending contact email:', error);
    throw error;
  }
};