
//import {message} from 'antd'
import ajax from './ajax'

const BASE = ''
export const reqAddUser = (username, password, email,major,gender,grade) => ajax(BASE + '/user/addUser', {
    username, password, email,major,gender,grade
}, 'POST')

export const getContent = (amount) => ajax(BASE + '/getContent', {
    amount
})
export const ReqCreate = (title,description,content,author_id) => ajax(BASE + '/create', {
    title,description,content,author_id
}, 'POST')
export const ReqPost = (postId) => ajax(BASE+'/getArticle',{postId})

export const sendComment=(comment,blogId,authorId)=>ajax(BASE + '/sendComment', {
    comment,blogId,authorId
}, 'POST')
export const thumbArticleOne=(blog_id,user_id)=>ajax(BASE+'/thumbArticleOne',{blog_id,user_id},'POST')
export const thumbArticleTwo=(blog_id)=>ajax(BASE+'/thumbArticleTwo',{blog_id},'POST')
export const getComment=(blogId)=>ajax(BASE+'/getComment',{blogId})
export const reqSearchItems = (keyword) => ajax(BASE + '/keyWords', {
     keyword
}, 'POST')
export const collectOne=(blog_id,user_id)=>ajax(BASE+'/collectOne',{blog_id,user_id},'POST')
export const collectTwo=(blog_id)=>ajax(BASE+'/collectTwo',{blog_id},'POST')
export const getPerson = (author_id) => ajax(BASE + '/user/getPerson', {author_id})