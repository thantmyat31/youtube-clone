import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020'
})

export const newUserRegister = async (newUser) => {
    try {
        await apiCall.post(`/users/register`,newUser);
    } catch (error) {
        console.log("[New User Registration Error]", error.response.data.message);
        return error.response.data.message;
    }
}

export const userLogin = async (email, password) => {
    try {
        const response = await apiCall.post(`/users/login`, {
            email,
            password
        });
        return response;
    } catch (error) {
        console.log("[User Login Error]", error.response.data.message);
        return error.response.data.message;
    }
}

export const increseViewCount = async (videoId) => {
    try {
        const response = await apiCall.post('/video/viewIncrease', {videoId: videoId});
        const result = await response.data;
        if(result.success) {
            console.log('success view increase', result.views);
        }
    } catch (error) {
        console.log("[Increase view count error]", error);
    }
}