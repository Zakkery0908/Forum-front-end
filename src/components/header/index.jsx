import React, {Component} from 'react'
import PubSub from 'pubsub-js'
import { Menu } from 'antd';
import { withRouter} from 'react-router-dom'
import {Input, Modal, message} from 'antd';
import './index.css'
import {connect} from "react-redux";
import {logout} from "../../redux/actions";
import {

    LogoutOutlined,
   
} from '@ant-design/icons';
import { getContent, reqSearchItems } from '../../api';
const {Search} = Input;
const {confirm} = Modal
/*
左侧导航的组件
 */
class Header extends Component {

    logout = () => {
        Modal.confirm({
            content: ' 要退出登录吗?',
            onOk: () => {
                this.props.logout()
            },
            onCancel() {
                console.log('Cancel');
            },
        })
    }



    handleSearch = async (value)=>{
            
        console.log("keyword: "+value)

        if(value!==''){
            
            let result = await reqSearchItems(value)
            console.log(result.data)
            
            if (result.code === 200) {
                //路由到search页
                this.handleClick(value,"/search")
                message.success('request successfully')
                //请求成功后通知List更新状态
                PubSub.publish('KeyWords', {keyWord:value,isSearch:true,pages:result.data})
            } else {
                message.error('sorry,there\'s something wrong')
            }
        }
        
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
                    width:'120px',
                    lineHeight: '250%',
                    backgroundColor: '#0D8FBF',
                    margin: '10px 20px',
                    borderRadius: '10px',
                    float:'right',
                    color:'white',
                    textAlign:'center'
                }} onClick={this.logout}>
                    <LogoutOutlined/>
                    log out
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
