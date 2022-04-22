//个人页面的导航栏
import React, { Component } from 'react'
import { Menu, Button, Result } from 'antd';
import {
  HeartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import { message } from 'antd';
import {Link, withRouter} from 'react-router-dom'
import storageUtils from "../../utils/storageUtils"
import {getPerson} from '../../api/index'

class Nav extends Component { 
    state = {
        collapsed: false,
        likeList:[],
        collectList:[],
        createList:[],
        
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
    
      // 每次进入路由链接时，请求一次getPerson，获得点赞、收藏、创作的文章id列表等信息（为了路由跳转时会更新）
      getPerson = async ()=>{
        const user = storageUtils.getUser();
        const author_id = user.id;
        let result = await getPerson(author_id)
        this.setState({
                      likeList:result.data[1],
                      collectList:result.data[2],
                      createList:result.data[3],
                      })
        console.log(this.state)
        
        if (result.code === 200) {
          message.success('refresh successfully')
      } else {
          message.error('sorry,there\'s something wrong')
      }
    }


    componentDidMount(){
      this.getPerson()
    }



  render() {
    return (
        <div style={{ width: 256 }}>
        <Button type="primary" onClick={this.toggleCollapsed} style={{ marginBottom: 16 }}>
          {React.createElement(this.state.collapsed ? MenuUnfoldOutlined : MenuFoldOutlined)}
        </Button>
        <Menu
          defaultSelectedKeys={['1']}
          defaultOpenKeys={['sub1']}
          mode="inline"
          theme="light"
          inlineCollapsed={this.state.collapsed}
        >

          {/* 设置路由组件并向路由组件传递参数 */}
          <Menu.Item key="1" icon={<PieChartOutlined /> }>
          <Link to='/person/personData'><span>Data display</span></Link>          
          </Menu.Item>

          <Menu.Item key="2" icon={<HeartOutlined />} onClick={value => this.getPerson(value)}>
          <Link to={{pathname:'/person/personLike',state:{likeList:this.state.likeList}}}> <span>Liked posts</span></Link> 
          </Menu.Item>

          <Menu.Item key="3"icon={<BulbOutlined />} onClick={value => this.getPerson(value)}>
          <Link to={{pathname:'/person/personCreate', state:{createList:this.state.createList}}}><span>Published posts</span></Link> 
          </Menu.Item>

          <Menu.Item key="4"icon={<BulbOutlined />} onClick={value => this.getPerson(value)}>
          <Link to={{pathname:'/person/personCollect', state:{collectList:this.state.collectList}}}><span>Favorites</span></Link> 
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default withRouter(Nav)
