import * as request from './HttpRequest';

export const createProposeIdea = async (info) => {
    try {
        const res = await request.post('/proposeIdea/createProposeIdea', info);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getListProposeIdea = () => {
    try {
        const res = request.get('/proposeIdea/ListProposeIdea')
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getProposeIdea = (id) => {
    try {
        const res = request.get(`/proposeIdea/proposeideadetail/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getMyProposeIdea = () => {
    try {
        const res = request.get('/proposeIdea/myproposeidea')
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const deleteProposeIdea = (id) => {
    try {
        const res = request.del(`/proposeIdea/deleteProposeIdea/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

