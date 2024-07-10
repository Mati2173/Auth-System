import axios from 'axios';
import { HttpStatusCode } from 'axios';

/**
 * URL of the API endpoint obtained from environment variables.
 */
const API_URL = process.env.REACT_APP_API_URL;

/**
 * Creates header configuration based on the content type and optional JWT token.
 * @param {string} type - Type of header configuration ('json' or 'multipart').
 * @param {string|null} token - Optional JWT token for authorization.
 * @returns {Object} Configuration object with headers set according to the type.
 * @throws {Error} If an invalid header configuration type is provided.
 */
const createHeadersConfig = (type, token = null) => {
    const config = {
        headers: {},
    };

    switch (type) {
        case 'json':
            config.headers['Content-Type'] = 'application/json';
            if (token) config.headers['Authorization'] = `JWT ${token}`;
            break;
        case 'multipart':
            config.headers['Content-Type'] = 'multipart/form-data';
            break;
        default:
            throw new Error(
                `Tipo de configuración de encabezados no válido: ${type}`
            );
    }

    return config;
};

/**
 * Creates a FormData object from an array of key-value pairs.
 * @param {Array} formDataFields - Array of key-value pairs to populate the FormData object.
 * @returns {FormData} FormData object populated with key-value pairs.
 */
const createFormData = (formDataFields) => {
    const formData = new FormData();
    Object.entries(formDataFields).forEach(([key, value]) => {
        formData.append(key, value);
    });
    return formData;
};

/**
 * Creates a JWT token for authentication using email and password.
 * @returns {Object} Object with information about JWT creation.
 * - `created`: true if creation was successful, false if there was an error.
 * - `access`: Generated JWT access token.
 * - `refresh`: Generated JWT refresh token.
 * - Other specific error information in case of failure.
 */
async function createJWT({ email, password }) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ email, password });

    try {
        const response = await axios.post(`${API_URL}/jwt/create/`, body, config);
        const { access, refresh } = response.data;
        return { created: true, access, refresh };
    } catch (error) {
        const response = error.response;
        return { created: false, ...(response ? response.data : {}) };
    }
}

/**
 * Refreshes a JWT token using a refresh token.
 * @returns {Object} Object with information about JWT refresh.
 * - `refreshed`: true if refresh was successful, false if there was an error.
 * - `access`: New JWT access token generated.
 * - Other specific error information in case of failure.
 */
async function refreshJWT(refreshToken) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ refresh: refreshToken });

    try {
        const response = await axios.post(`${API_URL}/jwt/refresh/`, body, config);
        const { access } = response.data;
        return { refreshed: true, access };
    } catch (error) {
        const response = error.response;
        return { refreshed: false, ...(response ? response.data : {}) };
    }
}

/**
 * Verifies the validity of a JWT access token.
 * @returns {Object} Object with information about JWT verification.
 * - `verified`: true if the token is valid, false if there was an error.
 * - Other specific error information in case of failure.
 */
async function verifyJWT(accessToken) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ token: accessToken });

    try {
        await axios.post(`${API_URL}/jwt/verify/`, body, config);
        return { verified: true };
    } catch (error) {
        const response = error.response;
        return { verified: false, ...(response ? response.data : {}) };
    }
}

/**
 * Retrieves current user information using a JWT access token.
 * @returns {Object} Object with user information fetched from the backend.
 * - `user`: Object with user data.
 * - Other specific error information in case of failure.
 */
async function getUser(accessToken) {
    const config = createHeadersConfig('json', accessToken);

    try {
        const response = await axios.get(`${API_URL}/users/me/`, config);
        return { user: response.data };
    } catch (error) {
        const response = error.response;
        return { user: null, ...(response ? response.data : {}) };
    }
}

/**
 * Retrieves all users information using a JWT access token.
 * @returns {Object} Object with users information fetched from the backend.
 * - `users`: Array of objects, each containing user data.
 * - Other specific error information in case of failure.
 */
async function getAllUsers(accessToken) {
    const config = createHeadersConfig('json', accessToken);

    try {
        const response = await axios.get(`${API_URL}/users/`, config);
        return { users: response.data };
    } catch (error) {
        const response = error.response;
        return { users: [], ...(response ? response.data : {}) };
    }
}

/**
 * Creates a new user by sending data to the backend.
 * @returns {Object} Object with information about registration result.
 * - `registered`: true if registration was successful, false if there was an error.
 * - `user`: Object with registered user data.
 * - Other specific error information in case of failure.
 */
async function createUser({
    email,
    first_name,
    last_name,
    date_of_birth,
    password,
    re_password,
    image,
}) {
    const config = createHeadersConfig('multipart');

    const formData = createFormData({
        email,
        first_name,
        last_name,
        date_of_birth,
        password,
        re_password,
    });
    const imageExtension = image.name.split('.').pop();
    const imageName = `${email}_profile_image.${imageExtension}`;
    formData.append('image', image, imageName);

    try {
        const response = await axios.post(`${API_URL}/users/`, formData, config);
        return { registered: true, user: response.data };
    } catch (error) {
        const response = error.response;
        return { registered: false, ...(response ? response.data : {}) };
    }
}

/**
 * Activates a user by sending uid and token to the backend.
 * @returns {Object} Object with information about activation result.
 * - `activated`: true if activation was successful, false if there was an error.
 * - `alreadyActive`: true if the user is already active, false otherwise.
 * - Other specific error information in case of failure.
 */
async function activateUser({ uid, token }) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ uid, token });

    try {
        await axios.post(`${API_URL}/users/activation/`, body, config);
        return { activated: true };
    } catch (error) {
        const response = error.response;

        if (response.status === HttpStatusCode.Forbidden)
            return {
                activated: false,
                alreadyActive: true,
                ...(response ? response.data : {}),
            };
        else
            return { activated: false, ...(response ? response.data : {}) };
    }
}

/**
 * Resends activation email for a user given their email address.
 * @returns {Object} Object with information about resend result.
 * - `success`: true if resend was successful, false if there was an error.
 * - Other specific error information in case of failure.
 */
async function resendActivationEmail(email) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ email: email });
    try {
        await axios.post(`${API_URL}/users/resend_activation/`, body, config);
        return { success: true };
    } catch (error) {
        const response = error.response;
        return { success: false, ...(response ? response.data : {}) };
    }
}

/**
 * Sends an email to reset the user's password given their email address.
 * @returns {Object} Object with information about the email sending result.
 * - `success`: true if sending was successful, false if there was an error.
 * - Other specific error information in case of failure.
 */
async function sendPasswordResetEmail(email) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({ email: email });
    try {
        await axios.post(`${API_URL}/users/reset_password/`, body, config);
        return { success: true };
    } catch (error) {
        const response = error.response;
        return { success: false, ...(response ? response.data : {}) };
    }
}

/**
 * Confirms password reset for the user using uid, token, and new password.
 * @returns {Object} Object with information about the confirmation result.
 * - `changed`: true if password was successfully changed, false if there was an error.
 * - Other specific error information in case of failure.
 */
async function confirmResetPassword({
    uid,
    token,
    new_password,
    re_new_password,
}) {
    const config = createHeadersConfig('json');

    const body = JSON.stringify({
        uid,
        token,
        new_password,
        re_new_password,
    });
    try {
        await axios.post(`${API_URL}/users/reset_password_confirm/`, body, config);
        return { changed: true };
    } catch (error) {
        const response = error.response;
        return { changed: false, ...(response ? response.data : {}) };
    }
}

/**
 * Object containing various authentication-related API functions.
 */
const authAPI = {
    createJWT,
    refreshJWT,
    verifyJWT,
    getUser,
    getAllUsers,
    activateUser,
    resendActivationEmail,
    createUser,
    sendPasswordResetEmail,
    confirmResetPassword,
};

export default authAPI;
