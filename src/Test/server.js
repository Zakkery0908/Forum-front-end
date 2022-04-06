const express = require('express');
const app = express();
const bodyParser = require('body-parser')
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.post('/login',(request,response)=>{
response.setHeader('Access-Control-Allow-Origin','*');
//request.body里面藏了东西，body里面是传来的参数
//返回去一个code 一个token 和一个数据
//这里注意token还没写 后面要补充上token！！！！！！！！
const username = request.body.username;
const password = request.body.password;
response.send({
 
     data:{id:1,username:"zeqiang"},
     msg:"sadsd",
     code:200


})


})

app.post('/addUser',(request,response)=>{
response.setHeader('Access-Control-Allow-Origin','*');
const username = request.body.username;
console.log(request.body)
response.send({
    username: username,
    msg:"下面将添加用户"
})});

app.get('/getArticle',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    
    console.log(request.body)
    response.send({
        
        title: `这是第1篇文章的title`,
        description: "这里是这篇文章的介绍",
        major:"ICS",
        username:"Zeqiang Ning",
        content:"引入axios,然后在页面中进行请求axios.get('url').then(res=>{}),这里默认会导出实例，通常使用这个axios就可以了"
    })});



app.post('/create',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    const title = request.body.title;
    const description = request.body.description;
    console.log(request.body)
    response.send({
        msg:"我已经收到信息",
        description:description,
        title: title
    })});



app.get('/getContent',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    console.log(request.body)
    response.send(
        {
            "allContent":[
              {"href": "https://ant.design",
              "title": "分享贴子 ",
              "avatar": "https://joeschmoe.io/api/v1/random",
              "description":
                "这是第一条简单介绍",
              "content":"第一条内容"},
              {"href": "https://ant.design",
                "title": "分享贴子 ",
                "avatar": "https://joeschmoe.io/api/v1/random",
                "description":
                  "这是第二条简单介绍",
                "content":"第一条内容"},
              {"href": "https://ant.design",
                  "title": "分享贴子 ",
                  "avatar": "https://joeschmoe.io/api/v1/random",
                  "description":
                    "这是第三条简单介绍",
                  "content":"第一条内容"},
              {"href": "https://ant.design",
                  "title": "分享贴子 ",
                  "avatar": "https://joeschmoe.io/api/v1/random",
                  "description":
                    "这是第四条简单介绍",
                  "content":"第一条内容"}]
            }
          

    )});



app.listen(8000,()=>{
    console.log("开启监听模式");
})