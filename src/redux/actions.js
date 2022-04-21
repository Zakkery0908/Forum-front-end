/*
包含n个action creator函数的模块
同步action: 对象 {type: 'xxx', data: 数据值}
异步action: 函数  dispatch => {}
 */
import {
    RESET_USER,
    RECEIVE_USER,
    SHOW_ERROR_MSG,
    SEND_COMMENT
} from './type'
import storageUtils from "../utils/storageUtils";
import axios from 'axios'
import { getComment } from '../api/index';


export const receiveUser = (user) => ({type: RECEIVE_USER, user})
export const showErrorMsg = (errorMsg) => ({type: SHOW_ERROR_MSG, errorMsg})
export const Comment = (comment)=>({type:SEND_COMMENT,comment})
export const logout = () => {
    storageUtils.removeUser()
    return {type: RESET_USER}
}
export const login = (username, password) => {

    return async dispatch => {
        //获得login之后就开始就发送给后台
        //如果发送成功，对面就会返回一个token和一个用户信息，然后存储用户信息和token，然后
        //返回的部分 有code 有user数据 有token
        let data = {"username":username,"password":password}
        axios.post('/user/login', data, {headers: {'Content-Type': 'application/json; charset=utf-8'}}).then((res) => {
            if (res.data.code === 200) {
                console.log(res)
                console.log("验证login中的id的resposne")
                //console.log(userId)
                const user = res.data.data
                const token = res.data.token
                storageUtils.saveUser(user)
               // console.log(user.id)
                storageUtils.saveToken(token)
                //目前store里面的状态就是登陆的user
                dispatch(receiveUser(user))
            } else {
                console.log("登录响应失败")
                const msg = res.msg
                dispatch(showErrorMsg(msg))
            }
        })
    }
}

export const sendComment = (comment, postId,author_id) => {
    return async dispatch => {
        let data = {"comment":comment,"blogId":postId,"authorId":author_id}
        //const result = await getComment(postId)
        //let allComment ={comment:comment,BDcomment:result.data.BDcomment}
        axios.post('/sendComment', data, {headers: {'Content-Type': 'application/json; charset=utf-8'}}).then((res) => {
            if (res.code === 200) {
                console.log("评论发送成功")
                //目前store里面的状态就是登陆的user
                //comment 分为输入的commment 和 BDcomment
                dispatch(Comment(comment))
            } else {
                console.log("评论添加登录响应失败")
                const msg = res.msg
                dispatch(showErrorMsg(msg))
            }
        })
    }
}