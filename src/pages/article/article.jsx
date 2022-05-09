import React, { Component } from 'react'
import { getComment, ReqPost, thumbArticleOne, thumbArticleTwo, collectOne, collectTwo, sendComment } from '../../api/index';
import './article.less';
import './show.css';
import { Comment, Avatar, Form, Button, List, Input, message, Modal, Col, Row, Layout } from 'antd';
import storageUtils from "../../utils/storageUtils";
import { marked } from 'marked'
import { editBlog,ReqCreate} from '../../api/index'
import { highlight } from 'highlight.js'


const { TextArea } = Input;
const Editor = ({ onChange, onSubmit, submitting, value }) => (
  <>
    <Form.Item>
      <TextArea rows={4} onChange={onChange} value={value} />
    </Form.Item>

    <Form.Item>
      <Button htmlType="submit" loading={submitting} onClick={onSubmit} type="primary">
        Add Comment
      </Button>
    </Form.Item>
  </>
);


export default class article extends Component {
  state = {
    postId: '',
    postInfo1: {},
    postInfo2: {},
    submitting: false,
    value: '',
    //点赞功能: like是点赞的数量 isLiked是用来判断是否已经点赞
    like: null,
    isLiked: null,
    collect: null,
    iscollect: null,
    allComment: [],
    authorId:'',
    
    visible: false,
    
  };
 
  handleSubmit = async (values) => {
    if (!this.state.value) {
      return;
    }
    console.log("测试评论内容")
    console.log(this.state.value)
    console.log(this.state.postId)

  
    const user = storageUtils.getUser();
    console.log(user.id)
    //还有一个功能是 传输输入的值到后台 this.
    const comment = this.state.value;
    const postId = this.state.postId;
    let result = await sendComment(comment, postId, user.id);
    //返回过来
    //content这里可能要用redux
    if (result.code === 200) {
      message.success('评论发送成功')
    } else {
      message.error('评论发送失败')
    }
    this.setState({
      submitting: true,
    });
    setTimeout(() => {
      this.setState({
        submitting: false,
        value: '',
      });
    }, 1000);
  };
  handleChange = e => {
    this.setState({
      value: e.target.value,
    });
  };



  componentWillMount() {
    const user = storageUtils.getUser();
    console.log("测试redux里的comments")
    console.log(user.id)
    console.log(this.props.comments)

    const postId = this.props.match.params.postId;
    console.log("test postId")
    console.log(postId)
    this.setState({ postId });
    getComment(postId).then(response => {
      console.log("测试评论接口获取")
      console.log(response.data)
      const allComment = response.data
      this.setState({ allComment: allComment });
    }).catch(error => {
      console.log("获取评论失败了")
    })
    
    ReqPost(postId,user.id).then(response => {
      console.log("测试请求文章的信息");
      console.log(response.code);
      const postInfo1 = response.data[0];
      const postInfo2 = response.data[1];

      this.setState({isLiked:postInfo1.is_like,iscollect:postInfo1.is_collected, authorId:postInfo1.author_id})

      const date = new Date(postInfo1.post_time);
      let Y = date.getFullYear() + '-';
      let M = (date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + '-';
      let D = date.getDate() + ' ';
      let h = date.getHours() + ':';
      let m = date.getMinutes() + ':';
      let s = date.getSeconds();
      postInfo1.post_time = Y + M + D + h + m + s

      this.setState({ postInfo1, postInfo2 });
    }).catch(error => {
      console.log("出错了")
    })
    //点赞功能: 这个接口是把postId传给后台 然后后台返回点赞的数量,然后把这个数量存储到state中
    thumbArticleTwo(postId).then(response => {
      console.log("test 点赞量");

      console.log(response.like);
      console.log("test postId")
      console.log(postId)
      const like = response.data;
      this.setState({ like: like });
    }).catch(error => { console.log("点赞更新失败") })


    collectTwo(postId).then(response => {
      console.log("test 收藏量");
      console.log(response.data);
      const collect = response.data;
      this.setState({ collect: collect });
    }).catch(error => { console.log("收藏更新失败") })

  }



  render() {


    const thumbArticle = async () => {
      const postId = this.state.postId;
      const user = storageUtils.getUser();
      const userId = user.id;
      
      console.log("下面是userid")
      console.log(userId);
      //点赞功能: 这个接口作用是把postId和userId传给服务器,说明这篇文章点赞过了或者是取消点赞了,然后对应的设置点赞数量
      //判断是不是同一个user_id 如果是的话 数据库就减一 
      //前端就可以不实习state+1-1的操作 直接渲染就可以
      let result = await thumbArticleOne(postId, userId);
      console.log("下面是返回的数据");
      console.log(result);
      if (result.code === 200) {
        if(result.data==='false'){
        message.success('取消点赞')
      }else{message.success('点赞成功')}
      } else {
        message.error('点赞失败')
      }
      //从后台获取like
      // if (isLiked) {
        if (result.data === 'true') {
           this.setState({ isLiked:'true' ,like: this.state.like + 1 })
          } else if( result.data ==='false'){
           this.setState({ isLiked:'false',like: this.state.like-1})
         }
      // }
      // else { this.setState({ isLiked: 'like', like: this.state.like + 1 }) }
    };

    const collectArticle = async () => {
      const postId = this.state.postId;
      const user = storageUtils.getUser();
    
      console.log("下面是userid")
      console.log(user.id);
      //点赞功能: 这个接口作用是把postId和userId传给服务器,说明这篇文章点赞过了或者是取消点赞了,然后对应的设置点赞数量
      let result = await collectOne(postId, user.id);
      console.log("下面是返回的数据");
      //result只包含msg(即json数据)
      console.log(result);
      if (result.code === 200) {
        if(result.data==='false'){
          message.success('取消收藏')
        }else{message.success('收藏成功')}
      } else {
        message.error('收藏失败')
      }
      //从后台获取like
     
      if (result.data === 'true') {
        this.setState({ iscollect:'true' ,collect: this.state.collect + 1 })
       } else if( result.data ==='false'){
        this.setState({ iscollect:'false',collect: this.state.collect-1})
      }
        
        
        }
      // }
      // else { this.setState({ iscollect: 'collect', collect: this.state.collect + 1 }) }

  
    const { submitting, value } = this.state;
    const postInfo1 = this.state.postInfo1;
    const postInfo2 = this.state.postInfo2;
    const postId = this.state.postId;
    
    const authorId = this.state.authorId;
    const user = storageUtils.getUser();
    const userId = user.id;


    console.log("测试获取的postId和postInfo")
    console.log(postId);
    console.log(postInfo1);
    console.log('作者的id:');
    console.log(authorId);


    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require(highlight);
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });

    const changeContent = (e) => {
      this.setState({ articleContent: e.target.value })
      let html = marked(e.target.value)
      console.log("测试markddown")
      console.log(html)
      this.setState({ markdownContent: html })
    }

    const onFinish = async (values) => {
      const { title, description } = values
      //修改的地方
      const content = this.state.markdownContent
      const user = storageUtils.getUser()
      const author_id = user.id
      const blog_id = this.state.postId
      // let result = await ReqCreate(title, description, content, author_id)
      let result = await editBlog(blog_id, title, description, content )
      if (result.code === 200) {
        message.success('更新成功')
      } else {
        message.error('出了一点问题')
      }
    };
 
    
    return (
      <div>
        <span>
          <div>
            <div className="panel" >
              <div className="topic-header">
                <span className="topic-title">
                  {/* 这里的major后面需要改动 */}
                  <span className="topic-tab-type">ICS</span>
                  {this.state.postInfo1.title}
                </span>
                <div className="topic-title-info">
                  <span>Publish time:  {this.state.postInfo1.post_time}     </span><br />
                  <span>Author:   {this.state.postInfo2.username}</span>
                  {/* 点赞功能:这里是调用点赞功能的地方 */}
                   <div className='likecollect'>
                   <div onClick={thumbArticle} style={{fontSize:'20px',display:'inline'}}>
                      {
                       this.state.isLiked === 'true' ? '💖' :'🖤'
                       //this.state.emoji
                      }{this.state.like}   
                    </div>
                   
                    <div onClick={collectArticle} style={{fontSize:'20px',display:'inline'}}>
                       {
                       this.state.iscollect === 'true' ? '🎇':'★'
                         }{this.state.collect}
                         </div>
                        </div>
                </div>
                <br/>
                <div className="topic-description">
                  <span>{this.state.postInfo1.description}</span>
                </div>
              </div>
              <div
                //这里显示内容
                className="topic-content"
                dangerouslySetInnerHTML={{ __html: this.state.postInfo1.content }}
              />    
            </div>
          </div>
        </span>
      
        
        {/* 编辑模态框 */}
        <Modal
          title={'Edit Blog'} 
          width={1000}
          visible={this.state.visible} //visible 判断是否显示模态框 (true | false)
          onCancel={()=>{this.setState({visible: false})}}
          footer={null}
        >
        
            <Form className='formitem' name="nest-messages" labelAlign='left' onFinish={onFinish}
                  initialValues={
                    {
                      title: this.state.postInfo1.title,
                      description: this.state.postInfo1.description,
                      content: this.state.postInfo1.content
                      //初始化表单默认值（原帖子内容）
                      //defalutValue会报错，需要用initialValue

                      //TextArea的initialValue如何显示去掉标签的内容？？？
                      //<div dangerouslySetInnerHTML={{ __html: this.state.postInfo1.content }}/> 显示不了

                      
                      //另外TextArea的部分不可未修改就提交，但是前两个input可以？？？？？？
                      //（只修改title或者description，不修改content，submit不成功。全部不修改submit不成功。只修改content不修改前两个可以成功）
                    }}                                   
                 style={{marginLeft:'10px'}} >
              <div>Title</div>
              <Form.Item name="title">
              <Input style={{width:'800px'}}/>
              </Form.Item>

              <div>Description</div>
              <Form.Item name="description">
              <Input style={{width:'800px'}}/>
              </Form.Item>
              
              <div>Content</div>
              <Form.Item name="content">                
                <TextArea
                  className="markdown-content"
                  rows={20}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  placeholder="Content" />
              </Form.Item>

              <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit
              </Button>

              </Form.Item>
            </Form>
          



        
        </Modal>
        

        {/* 编辑按钮 */}
        {authorId===userId?
        <Button className='edit'
                style={{backgroundColor: '#382173',
                        color:'#FFFFFF',
                        marginTop:'10px',
                        width:'60px'}} 
                onClick={()=>{this.setState({visible: true})}}
                >edit</Button> :
        <Button disabled
                style={{marginTop:'10px',
                        width:'60px'}}>edit
        </Button>}

        {/* 评论展示区 */}
        <List
          className="comment-list"
          itemLayout="horizontal"
          //这里不应该从redux中拿数据 应该从DB中拿
          dataSource={this.state.allComment}
          //dataSource={this.props.comments}
          renderItem={item => (
            <li>
              <Comment
                //actions={item.actions}
                author={item.userName}
                avatar="https://joeschmoe.io/api/v1/random"
                content={item.content}
              //datetime={item.datetime}
              />
            </li>
          )}
        />


        {/* 评论编辑区 */}
        <Comment
          avatar={<Avatar src="https://joeschmoe.io/api/v1/random" alt="Han Solo" />}
          content={
            <Editor
              // 更新input的值到state中
              onChange={this.handleChange}
              //
              onSubmit={this.handleSubmit}
              submitting={submitting}
              value={value}
            />
          }
        />
      </div>
    )
  }
}
