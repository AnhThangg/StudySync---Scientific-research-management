import * as request from './HttpRequest';

export const login = ({
    userName,
    password,
}) => {
    try {
        const res = request.post('/auth/login',{
            userName,
            password
        })
        return res;
    } catch (e) {
        console.log(e);
    }
}


