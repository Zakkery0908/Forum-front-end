//写的是创作页面组件
import { Form, Input, Cascader, Button, Upload, message, Layout, Col, Row } from 'antd';
import React, { Component } from 'react'
import './create.css'
import { ReqCreate } from '../../api/index'
import { highlight } from 'highlight.js'
import { InboxOutlined } from '@ant-design/icons';
import { marked } from 'marked'
import storageUtils from "../../utils/storageUtils";
const { TextArea } = Input
export default class create extends Component {

  state = { files: [] }
  render() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      highlight: function (code, lang) {
        const hljs = require(highlight);
        const language = hljs.getLanguage(lang) ? lang : 'plaintext';
        return hljs.highlight(code, { language }).value;
      },
      langPrefix: 'hljs language-', // highlight.js css expects a top-level 'hljs' class.
      pedantic: false,
      gfm: true,
      breaks: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
      xhtml: false
    });

    const changeContent = (e) => {
      this.setState({ articleContent: e.target.value })
      let html = marked(e.target.value)
      console.log("测试markddown")
      console.log(html)
      this.setState({ markdownContent: html })
    }
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
        this.setState({ files: e });
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
      const { title, description } = values
      //修改的地方
      const content = this.state.markdownContent
      const user = storageUtils.getUser()
      const author_id = user.id
      let result = await ReqCreate(title, description, content, author_id)
      if (result.code === 200) {
        message.success('发送成功')
      } else {
        message.error('出了一点问题')
      }
    };
    return (
      <Layout>
        <br />
        <br />
        <h1 className="head"><span>Writing Center</span></h1>
        <br />
        <br />
        <br />
        <br />
        <Form {...layout} className='formitem' name="nest-messages" labelAlign='left' onFinish={onFinish} >


          <Form.Item
            name="title"
            label="Title">
            <Input style={{marginLeft:'-100px'}}/>
          </Form.Item>


          <Form.Item
            name="description"
            label="Description" >
            <Input style={{marginLeft:'-100px'}}/>
          </Form.Item>


          <Form.Item name="major" label="Major">
            <Cascader style={{marginLeft:'-100px'}}
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
          <Form.Item name="content" label="Content">
            <Row gutter={2}>
              <Col span={12}>
                <TextArea alue={this.state.articleContent}
                  className="markdown-content"
                  rows={35}
                  onChange={changeContent}
                  onPressEnter={changeContent}
                  style={{marginLeft:'-100px'}}
                  placeholder="Content" />
              </Col>
              <Col span={12}>
                
                <div className='show-html' style={{marginLeft:'-100px'}}dangerouslySetInnerHTML={{ __html: this.state.markdownContent }} defaultValue="显示内容" >
                </div>


              </Col>



            </Row>
          </Form.Item>


          <Form.Item wrapperCol={{ ...layout.wrapperCol, offset: 8 }}>

            <Dragger style={{marginLeft:'-100px'}} {...props}>
              <p className="ant-upload-drag-icon">
                <InboxOutlined />
              </p>
              <p className="ant-upload-text">Click or drag file to this area to upload</p>
              <p className="ant-upload-hint">
                Support for a single or bulk upload. Strictly prohibit from uploading company data or other
                band files
              </p>
            </Dragger>

            <Button style={{marginLeft:'-100px'}} type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </Layout>
    );
  }
}
