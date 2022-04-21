//用来写的是个人页面组件
import { Card, Avatar, Descriptions,Col,Statistic,Row} from 'antd';
import { Layout, Button, message } from 'antd';
import { MessageOutlined, LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
import React, { Component } from 'react'


const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height:'40vh'
  };


export default class personData extends Component {

  render() {
    return (

          <Card title="数据展示">

          <Card.Grid style={gridStyle}>
    
          <Col span={25}>
          <Statistic title="获赞量" 
                     value={1128} 
                     prefix={<LikeOutlined />} />
          </Col>

          </Card.Grid>

          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          <Card.Grid style={gridStyle}>Content</Card.Grid>
          </Card>

            
    )
  }
}
