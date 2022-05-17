import axios from 'axios';
const API_KEY = 'AIzaSyBAmPOlp2jgp7RO36AjRihtktQiJOj0yHw';

export const authenticate = async (mode, email, password) => {
    const url = `https://identitytoolkit.googleapis.com/v1/accounts:${mode}?key=${API_KEY}`;
    const response = await axios.post(
        url,
        {
            email,
            password,
            returnSecureToken: true,
        }
    );
    return response.data.idToken;
};

export const createUser = async (email, password) => {
    return authenticate('signUp', email, password);
};

export const login = async (email, password) => {
    return authenticate('signInWithPassword', email, password);
}
