//用来写的是个人页面组件
import { Card, Avatar, Descriptions,Col,Statistic,Row} from 'antd';
import { LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { Component } from 'react'
import './person.css'
import { Layout } from 'antd';
import Nav from '../../components/Nav/Nav'
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

 

  render() {
    return (
        <Layout>
       
        <div className="site-card-border-less-wrapper">
        <Card title="Personal information" bordered={false} theme="dark" style={{ width: 300 }}>
            <Meta
            avatar={<Avatar src="https://joeschmoe.io/api/v1/random" />} 
            />
            <br/>
            <p>name: </p>
            <p>gender: male</p>
            <p>email: zeqiang.ning19@student</p>
            <p>major: ICS</p>
            </Card>
        </div>
    



        <Layout>
        {/* 这里放一个导航信息 */}
        <Sider width='256px'
                       style={{
                           overflow: 'auto',
                           height: '100vh',
                           left: 0,
                       }}><Nav/></Sider>
        {/* 匹配路由的部分 */}
          <Content>
          <Card title="数据展示">
    <Card.Grid style={gridStyle}>
    
    <Col span={25}>
      <Statistic title="获赞量" value={1128} 
       prefix={<LikeOutlined />} />
    </Col>


    </Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
    <Card.Grid style={gridStyle}>Content</Card.Grid>
  </Card>


          {/* 
          <Switch>
                            <Redirect from='/' exact to='/home'/>
                            <Route path='/home' component={Home}/>
                        </Switch>
          */}
          </Content>
          
        </Layout>
      </Layout>
      
       
   









        
    )
  }
}
