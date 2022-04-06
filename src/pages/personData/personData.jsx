import React, { Component } from 'react'
import { Card, Avatar, Descriptions,Col,Statistic,Layout} from 'antd';
import { LikeOutlined,EditOutlined, EllipsisOutlined, SettingOutlined } from '@ant-design/icons';
const gridStyle = {
    width: '50%',
    textAlign: 'center',
    height:'40vh'
  };
export default class personData extends Component {
  
  render() {
    return (
        <Layout>
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
      </Layout>
    )
  }
}
