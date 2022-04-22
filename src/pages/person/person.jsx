//用来写的是个人页面组件
import { Card, Avatar, Descriptions,Col,Statistic,Row,Tag} from 'antd';
import { Layout, Button, message } from 'antd';
import { MessageOutlined, LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined,TwitterOutlined,
  YoutubeOutlined,UserOutlined,SkinOutlined,MailOutlined,CrownOutlined,
  FacebookOutlined,
  LinkedinOutlined,} from '@ant-design/icons';
import React, { Component } from 'react'
import {getPerson} from '../../api/index'
import './person.css'
import Nav from '../../components/Nav/Nav'
import storageUtils from "../../utils/storageUtils"
import {Route,Switch,Redirect} from 'react-router-dom'
import PersonData from "./personData"
import PersonLike from "./personLike"
import PersonCollect from "./personCollect"
import PersonCreate from "./personCreate"


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
  this.getPerson1()
}

 

  render() {
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
            </Card>
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
