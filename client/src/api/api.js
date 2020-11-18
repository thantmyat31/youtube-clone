import axios from 'axios';

const apiCall = axios.create({
    baseURL: 'http://localhost:2020'
})

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