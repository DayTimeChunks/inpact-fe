
import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
// const test = process.env.TEST_VAR;
// console.log("process ", process)
// console.log("process.env ", process.env)
// console.log("API: ", api);
// console.log("test: ", test);
const headers = {
    'Accept': 'application/json',
    // 'Authorization': token
};

export const create = (body: object) =>
    fetch(`${api}/register`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(res => res.json());

export const login = (body: object) =>
    fetch(`${api}/users/login`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(res => res.json());

export const logout = () =>
    fetch(`${api}/logout`, {
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'GET'
    }).then(res => res.json());

export const uploadAvatar = (body: FormData) =>
    fetch(`${api}/avatar-upload`, {
        body: body,
        headers: {
            ...headers // IMPORTANT! No Content-Type!!
        },
        method: 'POST'
    })
        .then(res => res.json());

export const getUserProfile = (body: object) =>
    fetch(`${api}/get-profile`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    }).then(res => res.json());


export const updateProfile = (body: object) =>
    axios({
        method: 'POST',
        url: `${api}/update-profile`,
        data: body
    }).then(res => res);