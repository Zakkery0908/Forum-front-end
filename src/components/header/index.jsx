//头部导航
import React, {Component} from 'react'
import { Layout, Menu, Breadcrumb } from 'antd';
import {Redirect, withRouter} from 'react-router-dom'
import {Input, Space, Modal, Tooltip, Dropdown, Button, message, Divider} from 'antd';
import './index.css'
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import {

    LogoutOutlined,
   
} from '@ant-design/icons';
const {Search} = Input;
const {confirm} = Modal

/*
左侧导航的组件
 */
class Header extends Component {

    logout = () => {
        Modal.confirm({
            content: ' 你确定要退出登录吗?',
            onOk: () => {
                console.log('OK', this)
                // 跳转到login
                // this.props.history.replace('/login')
                this.props.logout()
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }



    handleSearch = (value) => {
        window.location.href = 'https://www.baidu.com/s?wd=' + value
    }
    handleClick = (value, key) => {
        this.props.history.push(key)
    }

  
//<Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
//<Header1/>
//</Menu>
    render() {
      

        return (
           
        <div className="header">

        <div className="header-nav"> 
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']}>
        <Menu.Item key="1" onClick={value => this.handleClick(value, "/person")}>个人主页</Menu.Item>
        <Menu.Item key="2" onClick={value => this.handleClick(value, "/home")}>首页</Menu.Item>
        <Menu.Item key="3" onClick={value => this.handleClick(value, "/fenlei")}>分类 </Menu.Item>
        <Menu.Item key="4" onClick={value => this.handleClick(value, "/create")}>开始创作</Menu.Item>
        <Menu.Item key="5">
        <div className='search'>
    

 
 
        <Search placeholder="input search text" 
         allowClear onSearch={(value) => this.handleSearch(value)}
                            enterButton
                            className='header-search'/> </div>
         </Menu.Item>
         <Menu.Item key="6" style={{
                    height: '40px',
                    width:'40px',
                    lineHeight: '250%',
                    backgroundColor: '#0D8FBF',
                    margin: ' 10px 20px',
                    borderRadius: '10px'
                }} onClick={this.logout}>
                    <LogoutOutlined/>
                  
                </Menu.Item>
      </Menu>

        </div>

   

   
    </div>

  
        );
    }


}

export default connect(
    state => ({user: state.user}),
    {logout}
)(withRouter(Header))
