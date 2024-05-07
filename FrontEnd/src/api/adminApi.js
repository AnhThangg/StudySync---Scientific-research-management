import * as request from './HttpRequest';

export const getAccount = (role) => {
    try {
        const res = request.get(`/account/${role}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const createAccount = (role, info) => {
    try {
        const res = request.post(`account/${role}`,info)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const deleteAccount = (id) => {
    try {
        const res = request.del(`account/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}