import * as request from './HttpRequest';

export const getRole = () => {
    try {
        const res = request.get('/info/role')
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getInfo = () => {
    try {
        const res = request.get('/info');
        return res;
    } catch (e) {
        console.log(e);
    }
}