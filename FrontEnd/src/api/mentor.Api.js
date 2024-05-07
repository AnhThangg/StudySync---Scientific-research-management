import * as request from './HttpRequest';

export const getAllFacultiesCodeForUniver = (id) => {
    try {
        const res = request.get(`/faculty/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getMentor = (id) => {
    try {
        const res = request.get(`/mentor/getmentor/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getUnconfirmedTopicsForMentor = () => {
    try {
        const res = request.get(`/mentor/UnconfirmedTopicsForMentor`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getUnconfirmedTopicDetailForMentor = (id) => {
    try {
        const res = request.get(`/mentor/unconfirmedTopicDetailForMentor/${id}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const approveTopicForMentor = (id) => {
    try {
        const res = request.patch(`/mentor/approveTopicForMentor/${id}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getConfirmedTopicsForMentor = () => {
    try {
        const res = request.get(`/mentor/confirmedTopicsForMentor`);
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getConfirmedTopicDetailForMentor = (id) => {
    try {
        const res = request.get(`/mentor/confirmedTopicDetailForMentor/${id}`);
        return res;
    } catch (e) {
        console.log(e);
    }
}