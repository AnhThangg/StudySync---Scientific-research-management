import * as request from './HttpRequest';

export const createTopic = (info) => {
    try {
        const res = request.post(`/topic`, info)
        return res;
    } catch (e) {
        console.log(e);
    }
}