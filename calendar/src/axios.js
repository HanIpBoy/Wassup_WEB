import axios from "axios"
import cookie from "js-cookie";

const instance = axios.create({ //동일 형태로 url 설정
    baseURL: 'http://43.201.102.29:8080'
})

//인터셉터
instance.interceptors.request.use(function (config) {
    const token = cookie.get('token') //쿠키의 토큰값을 가져와서 header에 넣어줌
    console.log('token', token)

    if (
        config.url.endsWith('auth/signup') ||
        config.url.endsWith('/auth/email-send') ||
        config.url.endsWith('auth/email-verify')
    ) {
        console.log('No token required');
    } else {
        //나머지 URL에는  s'Bearer' 토큰을 포함시킴
        config.headers = {
            Authorization: `Bearer ${token}` // Authorization에 token값 넣기
        }
    }

    // console.log(config)
    //요청이 전달되기 전에 작업 수행
    return config;
})

// instance.interceptors.response.use(console.log, console.log)

export default instance