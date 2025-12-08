// /**
//  * Validation utilities for form inputs
//  */

// export const validation = {
//   /**
//    * Validate email format
//    * @param {string} email - Email to validate
//    * @returns {object} { isValid: boolean, error: string }
//    */
//   validateEmail: (email) => {
//     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//     if (!email) {
//       return { isValid: false, error: 'Email is required' };
//     }
//     if (!emailRegex.test(email)) {
//       return { isValid: false, error: 'Please enter a valid email address' };
//     }
//     return { isValid: true, error: '' };
//   },

//   /**
//    * Validate password strength
//    * @param {string} password - Password to validate
//    * @returns {object} { isValid: boolean, error: string }
//    */
//   validatePassword: (password) => {
//     if (!password) {
//       return { isValid: false, error: 'Password is required' };
//     }
//     if (password.length < 6) {
//       return { isValid: false, error: 'Password must be at least 6 characters' };
//     }
//     if (!/[A-Z]/.test(password)) {
//       return { isValid: false, error: 'Password must contain at least one uppercase letter' };
//     }
//     if (!/[a-z]/.test(password)) {
//       return { isValid: false, error: 'Password must contain at least one lowercase letter' };
//     }
//     if (!/[0-9]/.test(password)) {
//       return { isValid: false, error: 'Password must contain at least one number' };
//     }
//     return { isValid: true, error: '' };
//   },

//   /**
//    * Validate username
//    * @param {string} username - Username to validate
//    * @returns {object} { isValid: boolean, error: string }
//    */
//   validateUsername: (username) => {
//     if (!username) {
//       return { isValid: false, error: 'Username is required' };
//     }
//     if (username.length < 3) {
//       return { isValid: false, error: 'Username must be at least 3 characters' };
//     }
//     if (username.length > 20) {
//       return { isValid: false, error: 'Username must not exceed 20 characters' };
//     }
//     if (!/^[a-zA-Z0-9_-]+$/.test(username)) {
//       return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
//     }
//     return { isValid: true, error: '' };
//   },

//   /**
//    * Validate password confirmation
//    * @param {string} password - Password
//    * @param {string} confirmPassword - Confirm password
//    * @returns {object} { isValid: boolean, error: string }
//    */
//   validatePasswordMatch: (password, confirmPassword) => {
//     if (!confirmPassword) {
//       return { isValid: false, error: 'Please confirm your password' };
//     }
//     if (password !== confirmPassword) {
//       return { isValid: false, error: 'Passwords do not match' };
//     }
//     return { isValid: true, error: '' };
//   },

//   /**
//    * Validate login form
//    * @param {object} formData - Form data object
//    * @returns {object} Validation errors
//    */
//   validateLoginForm: (formData) => {
//     const errors = {};
//     const usernameValidation = validation.validateUsername(formData.username);
//     if (!usernameValidation.isValid) {
//       errors.username = usernameValidation.error;
//     }
//     if (!formData.password) {
//       errors.password = 'Password is required';
//     }
//     return errors;
//   },

//   /**
//    * Validate signup form
//    * @param {object} formData - Form data object
//    * @returns {object} Validation errors
//    */
//   validateSignupForm: (formData) => {
//     const errors = {};
    
//     const usernameValidation = validation.validateUsername(formData.username);
//     if (!usernameValidation.isValid) {
//       errors.username = usernameValidation.error;
//     }

//     const emailValidation = validation.validateEmail(formData.email);
//     if (!emailValidation.isValid) {
//       errors.email = emailValidation.error;
//     }

//     const passwordValidation = validation.validatePassword(formData.password);
//     if (!passwordValidation.isValid) {
//       errors.password = passwordValidation.error;
//     }

//     const passwordMatchValidation = validation.validatePasswordMatch(
//       formData.password,
//       formData.confirmPassword
//     );
//     if (!passwordMatchValidation.isValid) {
//       errors.confirmPassword = passwordMatchValidation.error;
//     }

//     return errors;
//   },
// };

// export default validation;


/**
 * Validation utilities for form inputs (Updated for PIN-based signup)
 */

export const validation = {
  // Existing: Email validation
  validateEmail: (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email) return { isValid: false, error: 'Email is required' };
    if (!emailRegex.test(email)) return { isValid: false, error: 'Please enter a valid email address' };
    return { isValid: true, error: '' };
  },

  // Existing: Username validation
  validateUsername: (username) => {
    if (!username) return { isValid: false, error: 'Username is required' };
    if (username.length < 3) return { isValid: false, error: 'Username must be at least 3 characters' };
    if (username.length > 20) return { isValid: false, error: 'Username must not exceed 20 characters' };
    if (!/^[a-zA-Z0-9_-]+$/.test(username))
      return { isValid: false, error: 'Username can only contain letters, numbers, underscores, and hyphens' };
    return { isValid: true, error: '' };
  },

  // New: PIN validation (exactly 4 digits)
  validatePin: (pin) => {
    if (!pin) return { isValid: false, error: 'PIN is required' };
    if (pin.length !== 4) return { isValid: false, error: 'PIN must be exactly 4 digits' };
    if (!/^\d{4}$/.test(pin)) return { isValid: false, error: 'PIN must contain only numbers' };
    return { isValid: true, error: '' };
  },

  // New: Confirm PIN match
  validatePinMatch: (pin, confirmPin) => {
    if (!confirmPin) return { isValid: false, error: 'Please confirm your PIN' };
    if (pin !== confirmPin) return { isValid: false, error: 'PINs do not match' };
    return { isValid: true, error: '' };
  },

  // Optional: Phone number validation (basic international format)
  validatePhone: (phone) => {
    if (!phone) return { isValid: false, error: 'Phone number is required' };
    // Removes spaces, dashes, parentheses
    const cleaned = phone.replace(/[\s\-\(\)]/g, '');
    // Accepts + followed by 10–15 digits, or just 10–15 digits
    const phoneRegex = /^\+?[0-9]{10,15}$/;
    if (!phoneRegex.test(cleaned)) {
      return { isValid: false, error: 'Please enter a valid phone number' };
    }
    return { isValid: true, error: '' };
  },

  // Updated: Signup form validation for PIN + Phone
  validateSignupForm: (formData) => {
    const errors = {};

    // Username
    const usernameValidation = validation.validateUsername(formData.username);
    if (!usernameValidation.isValid) errors.username = usernameValidation.error;

    // Email
    const emailValidation = validation.validateEmail(formData.email);
    if (!emailValidation.isValid) errors.email = emailValidation.error;

    // PIN
    const pinValidation = validation.validatePin(formData.pin);
    if (!pinValidation.isValid) errors.pin = pinValidation.error;

    // Confirm PIN
    const pinMatchValidation = validation.validatePinMatch(formData.pin, formData.confirmPin);
    if (!pinMatchValidation.isValid) errors.confirmPin = pinMatchValidation.error;

    // Phone
    const phoneValidation = validation.validatePhone(formData.phone);
    if (!phoneValidation.isValid) errors.phone = phoneValidation.error;

    return errors;
  },

  // You can keep login validation as-is or update it later if login also uses PIN
  // validateLoginForm: (formData) => {
  //   const errors = {};

  //   const usernameValidation = validation.validateUsername(formData.username);
  //   if (!usernameValidation.isValid) errors.username = usernameValidation.error;

  //   if (!formData.pin) {
  //     errors.pin = 'PIN is required';
  //   }

  //   return errors;
  // },
  validateLoginForm: (formData) => {
  const errors = {};

  // Email validation
  const emailValidation = validation.validateEmail(formData.email);
  if (!emailValidation.isValid) {
    errors.email = emailValidation.error;
  }

  // PIN validation
  const pinValidation = validation.validatePin(formData.pin);
  if (!pinValidation.isValid) {
    errors.pin = pinValidation.error;
  }

  return errors;
},
};

export default validation;