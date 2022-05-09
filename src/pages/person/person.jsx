//用来写的是个人页面组件
//密码修改逻辑;
//
import { Card, Avatar, Descriptions,Col,Statistic,Row,Tag} from 'antd';
import { Layout, Button, message } from 'antd';
import { MessageOutlined, LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined,TwitterOutlined,
  YoutubeOutlined,UserOutlined,SkinOutlined,MailOutlined,CrownOutlined,
  FacebookOutlined,
  LinkedinOutlined,} from '@ant-design/icons';

import React, { Component } from 'react'
import {getPerson,editProfile} from '../../api/index'
import './person.css'
import Nav from '../../components/Nav/Nav'
import storageUtils from "../../utils/storageUtils"
import {Route,Switch,Redirect} from 'react-router-dom'
import PersonData from "./personData"
import PersonLike from "./personLike"
import PersonCollect from "./personCollect"
import PersonCreate from "./personCreate"
import {Form, Input, Checkbox, Modal} from 'antd';


const { Header, Footer, Sider, Content } = Layout;
const {Meta} = Card
const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height:'40vh'
  };


export default class person extends Component {

 //点击个人页面时发送请求  or  将个人信息存储在本地   
 //个人信息页面的信息:姓名 等等
 //state用来组件内部的传输 props 外界传输  result获得然后set state
 //如何自动执行函数？ 有一个生命周期///js中自动执行函数的办法
 //个人信息-------state
 
 //获赞量: state获取
 //点赞机制：
 //redux主要是负责状态变换  点赞机制：redux

  state = {
    author_id:"",
    show: 0,
    username:"",
    grade:"",
    gender:"",
    major:"",
    email:"",
    postList:[]

  }



  getPerson1 = async ()=>{
    const user = storageUtils.getUser();
    const author_id = user.id;
    let result = await getPerson(author_id)
    console.log("这里是测试result person的地方")
    console.log(result.data)
    this.setState({ username:result.data[0].username,
      grade:result.data[0].grade,
      gender:result.data[0].gender,
      major:result.data[0].major,
      email:result.data[0].email,
      postList:result.data[1]
                  })
    console.log(this.state)
    
    if (result.code === 200) {
      message.success('refresh successfully')
  } else {
      message.error('sorry,there\'s something wrong')
  }
}

componentDidMount(){
  this.getPerson1();
}

hideEditForm = () => {
  this.setState({
      show: 0
  })
}

  render() {
    const layout = {
      labelCol: {
          span: 8,
      },
      wrapperCol: {
          span: 12,
      },
  };

  const validateMessages = {
    required: 'it is required!',
    types: {
        email: 'it is not a valid email!',
        number: 'it is not a valid number!',
    },
    number: {
        range: 'it must be between range and',
    },
};

    const edit = () => {
      const onFinish = async (values) => {
          const {username, password, email, major,gender,grade} = values
          const user = storageUtils.getUser();
          const id = user.id;
          let result = await editProfile(id,username, password, email, major,gender,grade)
          console.log(result)
          if (result.code === 200) {
              message.success('编辑成功')
          } else {
              message.error('编辑失败')
          }
          this.setState({show: 0})
      };

      return (
          <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                style={{width: '100%'}} >


              <Form.Item
                  name='username'
                  label="username"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input/>
              </Form.Item>


              <Form.Item
                  name='password'
                  label="password"
                  rules={[
                      {required: true, message: 'password is required!'},
                      {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be alphabet, number or "_"'}
                  ]}
              >
               <Input/>
              </Form.Item>
              
              
              <Form.Item
                  name='passwordCheck'
                  label="password check"
                  dependencies={['password']}
                  rules={[
                      {required: true, message: 'password is required!'},
                      {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'},
                      ({getFieldValue}) => ({
                          validator(_, value) {
                              if (!value || getFieldValue('password') === value) {
                                  return Promise.resolve();
                              }
                              return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                      }),
                  ]}
              >
                  <Input/>
              </Form.Item>


              <Form.Item
                  name='email'
                  label="email"
                  rules={[
                      {
                          type: 'email',
                          required: true,

                      },
                  ]}
              >
                  
                  <Input onChange={(e) => this.setState({email: e.target.value})}/>
              </Form.Item>


              


              <Form.Item
                  name='major'
                  label="major"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input/>
              </Form.Item>

              <Form.Item
                  name='gender'
                  label="gender"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input/>
              </Form.Item>


              <Form.Item
                  name='grade'
                  label="grade"
                  rules={[
                      {
                          required: true,
                      },
                  ]}
              >
                  <Input/>
              </Form.Item>
              
              <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                  <Button type="ghost" htmlType="submit">
                      submit
                  </Button>
              </Form.Item>
          </Form>
      );
  };


    return (
        <Layout>
       
        <div className="site-card-border-less-wrapper">
        <Card  title={ <div className='card-title'>Personal information</div>} 
                bordered={false} theme="dark" style={{ width: 300, background:'#FFFFFFC7'}}>
            <Meta
            avatar={<Avatar style={{width:'50px',height:'50px'}} src="https://joeschmoe.io/api/v1/random" />} 
            />
            <br/>
            <p style={{fontSize:'17px'}}><span style={{fontWeight:'bolder'}}><UserOutlined />{" "}Name: </span>{this.state.username}</p>
            <p style={{fontSize:'17px'}}><span style={{fontWeight:'bolder'}}><SkinOutlined />{" "}Gender: </span> {this.state.gender}</p>
            <p style={{fontSize:'17px'}}><span style={{fontWeight:'bolder'}}><MailOutlined />{" "}E-mail: </span> {this.state.email}</p>
            <p style={{fontSize:'17px'}}><span style={{fontWeight:'bolder'}}><CrownOutlined />{" "}Major: </span> {this.state.major}</p>
    <Tag icon={<TwitterOutlined />} color="#55acee" style={{width:'80px'}}>
      Twitter
    </Tag>
    <Tag icon={<YoutubeOutlined />} color="#cd201f" style={{width:'80px'}}>
      Youtube
    </Tag>
    <Tag icon={<FacebookOutlined />} color="#3b5999" style={{width:'80px'}}>
      Facebook
    </Tag>
    <Tag icon={<LinkedinOutlined />} color="#55acee" style={{width:'80px'}}>
      LinkedIn
    </Tag>
      
    <Button type="primary" ghost="true" onClick={() => this.setState({show: 1})}>
                            Edit
                        </Button>
            </Card>
            {/* 模态窗 */}
            <Modal
                    title="Edit"
                    visible={this.state.show === 1}
                    onOk={this.sendOrder}
                    onCancel={this.hideEditForm}
                    okText='😊'
                    cancelText='back'
                    okButtonProps={{ disabled: true }}
                >
                    <div style={{display: 'flex'}}>
                        {edit()}
                    </div>
                </Modal>


        </div>
    





        <Layout style={{height:'1000px'}}>
        {/* 这里放一个导航信息 */}
        <Sider width='256px'
               style={{
                      overflow: 'auto',
                      left: 0,
                       }}>
              <Nav/>
        </Sider>

        {/* 匹配路由的部分 */}
         <Content>

             

             <Switch>
									<Route path="/person/personData" component={PersonData}/>
                  <Route path="/person/personLike" component={PersonLike}/>
                  <Route path="/person/personCollect" component={PersonCollect}/>
                  <Route path="/person/personCreate" component={PersonCreate}/>
                  <Redirect to="/person/personData"></Redirect>
									
						 </Switch>

         </Content>
          
        </Layout>

      </Layout>
      
       
   









        
    )
  }
}
