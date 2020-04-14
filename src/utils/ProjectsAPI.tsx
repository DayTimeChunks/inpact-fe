import axios from 'axios';
const api = process.env.REACT_APP_API_URL;
const headers = {
    'Accept': 'application/json',
    // 'Authorization': token
};

export const getProjectById = (body: object) =>
    fetch(`${api}/projects/get-project`, {
        body: JSON.stringify(body),
        headers: {
            ...headers,
            'Content-Type': 'application/json'
        },
        method: 'POST'
    })
    .then(res => res.json())
    .catch( err => console.error(` Failed to fetch project ${err}`));