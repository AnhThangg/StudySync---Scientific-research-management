import * as request from './HttpRequest';

export const getInfo = () => {
    try {
        const res = request.get(`/info`)
        return res
    } catch (error) {
        console.log(e);
    }
}

export const getNameMentor = (id) => {
    try {
        const res = request.get(`/info/nameMentor/${id}`)
        return res
    } catch (e) {
        console.log(e);
    }
}