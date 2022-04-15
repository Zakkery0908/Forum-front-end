import axios from 'axios'
import {message} from 'antd'
import storageUtils from "../utils/storageUtils";


axios.defaults.withCredentials = true
//拦截处理器 axios在发送之前 从本地存储中获取token，如果有的话，就放到请求头 如果没有就算了
axios.interceptors.request.use(config => {
    let uToken = storageUtils.getToken();
    console.log(uToken)
    if (uToken) {
        //我就在请求头里面添加一个头信息叫做U-TOKEN ==》jsessionid(token) 后台通过token作为key值可以在redis中获得loginUser的信息
        config.headers['Authorization'] = uToken;
    }
    return config;
}, error => {
    console.log('发送失败了')
    Promise.reject(error);
})



//在数据返回来的时候 对数据做出处理再返回 看的是返回数据还是返回error
axios.interceptors.response.use(res => {
    //他存进里面的data里面
    let {code} = res;
    console.log(res)
    message.warn("这是成功resposne的发送信息")
    //用户没有登录
    //跳转登录界面
    if (code === 200) {
        // message.success('有token')
        return res;
    } else {
        return res;
    }
}, error => {
    storageUtils.removeToken()
    storageUtils.removeUser()
    window.location.href = "/login"
})



//封装的AJAX登录请求
export default function ajax(url, data = {}, type = 'GET') {

//Promise 里面是另一个新的promise   promise里面有resolve和reject,通过promise.then来调用这两个函数  
    return new Promise((resolve, reject) => {
        let promise
        if (type === 'GET') { // 发GET请求
            promise = axios.get(url, { // 配置对象
                params: data // 指定请求参数
            })
   
           
        } else { // 发POST请求
            promise = axios.post(url, data)
        }
        // 2. 如果成功了, 调用resolve(value)
        promise.then(response => {
            resolve(response.data)
            // 3. 如果失败了, 不调用reject(reason), 而是提示异常信息
        }).catch(error => {
            // reject(error)
            message.error('很抱歉，服务器出了点小问题，请稍后再试', 6)
        })
    })


}
//帖子详情页面接口
// axios.get('/Reqpost',{postId:1}).then(response=>{const postInfo = response.data.data;this.setState({ postInfo });}).catch(error => {message.error('很抱歉，服务器出了点小问题，请稍后再试', 6)})
// 请求登陆接口
// ajax('/login', {username: 'Tom', passsword: '12345'}, 'POST').then()
// 添加用户
// ajax('/manage/user/add', {username: 'Tom', passsword: '12345', phone: '13712341234'}, 'POST').then()
