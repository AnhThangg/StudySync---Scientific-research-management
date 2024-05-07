import * as request from './HttpRequest';

export const getAllCodeUniver = () => {
    try {
        const res = request.get(`/univer/getAllUniverCode`)
        return res;
    } catch (e) {
        console.log(e);
    }
}

export const getDashboardForUniver = (id) => {
    try {
        const res = request.get(`/univer/dashboardForUniver/${id}`)
        return res;
    } catch (e) {
        console.log(e);
    }
}
