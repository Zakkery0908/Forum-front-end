const express = require('express');
const app = express();
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))

app.post('/user/login',(request,response)=>{
response.setHeader('Access-Control-Allow-Origin','*');
//request.body里面藏了东西，body里面是传来的参数
//返回去一个code 一个token 和一个数据
//这里注意token还没写 后面要补充上token！！！！！！！！
const username = request.body.username;
console.log("这里是服务器")
console.log(username)
response.send({
     data:{id:1,username:"zeqiang"},
     msg:"sadsd",
     
     username:username,
     code:200
})


})




app.post('/user/addUser',(request,response)=>{
response.setHeader('Access-Control-Allow-Origin','*');
const username = request.body.username;
console.log(request.body)
response.send({
    username: username,
    msg:"下面将添加用户",
    code:200
})});





app.post('/sendComment',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    const postId = request.body.postId;
    const comment = request.body.comment;
    console.log(request.body)
    response.send({
        postId: postId,
        comment: comment,
        code:200,
        others:"sadsad"
    })});


app.post('/getComment',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    response.send({
        "BDcomment":[ {
            //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content: 
           
              " We supply a series of design principles, practical patterns and high quality design"
              
        
         
          },
          //回复评论
          {
            //actions: [<span key="comment-list-reply-to-0">Reply to</span>],
            author: 'Han Solo',
            avatar: 'https://joeschmoe.io/api/v1/random',
            content:  " We supply a series of design principles, practical patterns and high quality design"
           
          }]
    });
})

app.post('/keyWords',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    console.log(request.body)
    response.send(
        {   
            code: 200,
            msg:"查询关键字：" + request.body.value,
            allContent:[
              {"href": "https://ant.design",
              "title": "查询结果1",
              "avatar": "https://joeschmoe.io/api/v1/random",
              "description":
                "这是第一条查询结果",
              "content":"第一条内容"},
              {"href": "https://ant.design",
                "title": "查询结果2 ",
                "avatar": "https://joeschmoe.io/api/v1/random",
                "description":
                  "这是第二条查询结果",
                "content":"第二条内容"},
              {"href": "https://ant.design",
                  "title": "查询结果3 ",
                  "avatar": "https://joeschmoe.io/api/v1/random",
                  "description":
                    "这是第三条查询结果",
                  "content":"第三条内容"},
              {"href": "https://ant.design",
                  "title": "查询结果4 ",
                  "avatar": "https://joeschmoe.io/api/v1/random",
                  "description":
                    "这是第四条查询结果",
                  "content":"第四条内容"}]
            }
    )});


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
    app.post('/thumbArticleOne',(request,response)=>{
        response.setHeader('Access-Control-Allow-Origin','*');
        const postId = request.body.postId;
        const userId = request.body.userId;
        console.log(request.body)
        response.send({
            msg:"我已经收到你的点赞",
            userId:userId,
            postId: postId
        })});

        app.post('/thumbArticleTwo',(request,response)=>{
            response.setHeader('Access-Control-Allow-Origin','*');
            const postId = request.body.postId;
          
            console.log(request.body)
            response.send({
                msg:"成功更新点赞量",
                postId: postId,
                like:100
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

    app.post('/collectOne',(request,response)=>{
        response.setHeader('Access-Control-Allow-Origin','*');
        const postId = request.body.postId;
        const userId = request.body.userId;
        console.log(request.body)
        response.send({
            msg:"我已经收到你的收藏",
            userId:userId,
            postId: postId
        })});

 //点赞量
app.post('/collectTwo',(request,response)=>{
    response.setHeader('Access-Control-Allow-Origin','*');
    const postId = request.body.postId;
    
    console.log(request.body)
    response.send({
        msg:"成功更新收藏量",
        postId: postId,
        collect:100
    })});
    app.get('/getPerson',(request,response)=>{
        response.setHeader('Access-Control-Allow-Origin','*');
        response.send(
            {  
                code:200,
                msg:"用户"+request.body.author_id+'的个人信息',
                username: "Wei.Liao",
                grade: "Y3",
                gender:"male",
                major:"ics",
                email:"wei.liao19@student.xjtlu.edu.cn",
                postList:[
                    "Like001",
                    "Like002",
                    "Like003",
                    "Like004",
                ],
                collectList:[
                    "Collect001",
                    "Collect002",
                    "Collect003",
                    "Collect004",
                ],
                createList:[
                    "Create001",
                    "Create002",
                    "Create003",
                ]


            }
            
        )});

    


app.listen(8000,()=>{
    console.log("开启监听模式");
})