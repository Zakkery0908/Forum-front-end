
//import {message} from 'antd'
import ajax from './ajax'

const BASE = ''

export const reqVerify = ({verifyCode, applicationId}) => ajax(BASE + '/verifyApplication', {
    verifyCode,
    applicationId
}, 'POST')

export const reqRegisterVerifyCode = (email) => ajax(BASE + '/sendVerifyCode', {
    email
}, 'POST')

export const reqAddUser = (username, password, email,major,gender,grade) => ajax(BASE + '/addUser', {
    username, password, email,major,gender,grade
}, 'POST')

export const getContent = (amount) => ajax(BASE + '/getContent', {
    amount
})
export const ReqCreate = (title,description,major,content) => ajax(BASE + '/create', {
    title,description,major,content
}, 'POST')
export const ReqPost = (postId) => ajax(BASE+'/getArticle',{postId})
export const sendComment=(comment,postId)=>ajax(BASE + '/sendComment', {
    comment,postId
}, 'POST')
export const thumbArticleOne=(postId,userId)=>ajax(BASE+'/thumbArticleOne',{postId,userId},'POST')
export const thumbArticleTwo=(postId)=>ajax(BASE+'/thumbArticleTwo',{postId},'POST')