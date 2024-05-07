import * as request from './HttpRequest';

export const getProvinces = () => {
    try {
        const res = request.get(`/unitvietnam/provinces`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getDistricts = (id) => {
    try {
        const res = request.get(`/unitvietnam/districts/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getWards = (id) => {
    try {
        const res = request.get(`/unitvietnam/wards/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}
