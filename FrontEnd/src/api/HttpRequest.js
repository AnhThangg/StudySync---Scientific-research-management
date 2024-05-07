import axios from "axios";

const httpRequest = axios.create({
    baseURL: 'http://localhost:2109'
})
httpRequest.interceptors.request.use(config => {
    // Lấy access token từ local storage hoặc nơi khác
    const accessToken = JSON.parse(localStorage.getItem('accessToken'));
    // Nếu có access token, thêm vào phần header của yêu cầu
    if (accessToken) {
        config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
}, error => {
    return Promise.reject(error);
});

httpRequest.interceptors.response.use(response => {
    if(response.status===401){
        window.location('/');
    }
    return response;
}, error => {
    // Xử lý lỗi ở đây nếu có
    return Promise.reject(error); // Trả về lỗi để được xử lý ở thành phần khác
});

export const get = async (path, options = {}) => {
    try {
        const response = await httpRequest.get(path, options)
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const post = async (path, data, options = {}) => {
    try {
        const response = await httpRequest.post(path, data, options);
        return response;
    } catch (error) {
        return error.response;
    }
};

export const put = async (path, data, options = {}) => {
    try {
        const response = await httpRequest.put(path, data, options);
        return response.data;
    } catch (error) {
        return error.response.data;
    }
};

export const del = async (path, options = {}) => {
    try {
        const response = await httpRequest.delete(path, options);
        return response;
    } catch (error) {
        return error.response.data;
    }
};

export const patch = async (path, data, options = {}) => {
    try {
        const response = await httpRequest.patch(path, data, options);
        return response;
    } catch (error) {
        return error.response.data;
    }
};


export default httpRequest;