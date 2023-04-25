import axios from "axios"
import cookie from "js-cookie";

const instance = axios.create({ //동일 형태로 url 설정
    baseURL: 'https://3.38.208.251:5005'
})

//인터셉터
instance.interceptors.request.use(function (config) {
    const token = cookie.get('token') //쿠키의 토큰값을 가져와서 header에 넣어줌
    config.headers = {
        Authorization: token //Authorization에 token값 넣기
    }
    //요청이 전달되기 전에 작업 수행
    return config;
})

export default instance