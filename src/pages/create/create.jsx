//写的是创作页面组件
import { Form, Input, Cascader, Button,Upload, message,Layout} from 'antd';
import React, { Component } from 'react'
import './create.css'
import {ReqCreate} from '../../api/index'
import { InboxOutlined } from '@ant-design/icons';

export default class create extends Component {
  
    
  render() {
  const { Dragger } = Upload;

  const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

    const layout = {
      labelCol: {
        span: 8,
      },
      wrapperCol: {
        span: 16,
      },
    };
    
    const onFinish = async (values) => {
      const {title,description,major,content} = values
      let result = await ReqCreate(title,description,major,content)
      if (result.code === 200) {
        message.success('发送成功')
    } else {
        message.error('出了一点问题')
    }
      };
    return (
      <Layout>
        <br/>
        <br/>
        <h1 className="head"><span>创 作 中 心</span></h1>
        <br/>
        <br/>
        <br/>
        <br/>
      <Form {...layout} name="nest-messages" labelAlign='left'  onFinish={onFinish} >


      <Form.Item
        name={['user', 'name']}
        label="Title">
        <Input />
      </Form.Item>


      <Form.Item
        name={['user', 'email']}
        label="Description" >
        <Input />
      </Form.Item>


      <Form.Item label="Cascader">
        <Cascader
          options={[
            {
              value: 'SAT',
              label: 'SAT',
              children: [
                {
                  value: 'ICS',
                  label: 'ICS',
                },
                {
                  value: 'CSE',
                  label: 'CSE',
                },
                {
                  value: 'CST',
                  label: 'CST',
                }
              ],
            },
          ]}
        />
      </Form.Item>
     
      <Form.Item name={['user', 'introduction']} label="Content">
        <Input.TextArea />
      </Form.Item>

      <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

      <Dragger {...props}>
    <p className="ant-upload-drag-icon">
      <InboxOutlined />
    </p>
    <p className="ant-upload-text">Click or drag file to this area to upload</p>
    <p className="ant-upload-hint">
      Support for a single or bulk upload. Strictly prohibit from uploading company data or other
      band files
    </p>
  </Dragger>
        <Button type="primary" htmlType="submit">
          Submit
        </Button>
      </Form.Item>
    </Form>
    </Layout>
  );
  }
}
