//个人页面的导航栏
import React, { Component } from 'react'
import { Menu, Button } from 'antd';
import {
  HeartOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  PieChartOutlined,
  BulbOutlined,
} from '@ant-design/icons';
import {Link, withRouter} from 'react-router-dom'
class Nav extends Component {
    state = {
        collapsed: false,
      };
    
      toggleCollapsed = () => {
        this.setState({
          collapsed: !this.state.collapsed,
        });
      };
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
          <Menu.Item key="1" icon={<PieChartOutlined />}>
          <Link to='/data'><span>数据展示页面</span></Link> 
          </Menu.Item>
          <Menu.Item key="2" icon={<HeartOutlined />}>
          <Link to='/like'> <span>点赞过的文章</span></Link> 
          </Menu.Item>
          <Menu.Item key="3"icon={<BulbOutlined />}>
          <Link to='/publish'><span>创作过的文章</span></Link> 
          </Menu.Item>
        </Menu>
      </div>
    )
  }
}
export default withRouter(Nav)
