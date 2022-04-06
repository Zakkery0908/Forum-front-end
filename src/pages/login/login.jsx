import * as React from "react";
import './login.less'
import {Form, Input, Button, Checkbox, Modal, message} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {reqAddUser} from '../../api/index'
import {connect} from "react-redux";
import {login} from "../../redux/actions";
import {Redirect} from "react-router-dom";
import storageUtils from "../../utils/storageUtils";
//import {reqRegisterVerifyCode} from '../../api/index'



//UI组件
class Login extends React.Component {
    state = {
        show: 0,
        email: '',
       
    }
    getVerifyCode = async () => {
        const reg = /^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        const {email} = this.state
        if (!reg.test(email)) {
            return
        }
        console.log(email)
    }
    hideRegisterForm = () => {
        this.setState({
            show: 0
        })
    }


    render() {
    
        const layout = {
            labelCol: {
                span: 8,
            },
            wrapperCol: {
                span: 12,
            },
        };


        
        const validateMessages = {
            required: 'it is required!',
            types: {
                email: 'it is not a valid email!',
                number: 'it is not a valid number!',
            },
            number: {
                range: 'it must be between range and',
            },
        };
      





//Demo方法  向服务器发送数据+返回注册界面
//await必须写在async函数当中，如果await右边的promise是失败的
        const Demo = () => {
            const onFinish = async (values) => {
                const {username, password, email, major} = values
                let result = await reqAddUser(username, password, email, major)
                console.log(result)
                if (result.code === 200) {
                    message.success('register successfully')
                } else {
                    message.error('sorry,there\'s something wrong')
                }
                this.setState({show: 0})
            };

            return (
                <Form {...layout} name="nest-messages" onFinish={onFinish} validateMessages={validateMessages}
                      style={{width: '100%'}} >


                    <Form.Item
                        name='username'
                        label="username"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name='password'
                        label="password"
                        rules={[
                            {required: true, message: 'password is required!'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                     <Input/>
                    </Form.Item>
                    
                    
                    <Form.Item
                        name='passwordCheck'
                        label="password check"
                        dependencies={['password']}
                        rules={[
                            {required: true, message: 'password is required!'},
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'},
                            ({getFieldValue}) => ({
                                validator(_, value) {
                                    if (!value || getFieldValue('password') === value) {
                                        return Promise.resolve();
                                    }
                                    return Promise.reject(new Error('The two passwords that you entered do not match!'));
                                },
                            }),
                        ]}
                    >
                        <Input/>
                    </Form.Item>


                    <Form.Item
                        name='email'
                        label="email"
                        rules={[
                            {
                                type: 'email',
                                required: true,

                            },
                        ]}
                    >
                        
                        <Input onChange={(e) => this.setState({email: e.target.value})}/>
                    </Form.Item>


                    


                    <Form.Item
                        name='major'
                        label="major"
                        rules={[
                            {
                                required: true,
                            },
                        ]}
                    >
                        <Input/>
                    </Form.Item>
                    <Form.Item wrapperCol={{...layout.wrapperCol, offset: 8}}>
                        <Button type="primary" htmlType="submit">
                            submit
                        </Button>
                    </Form.Item>
                </Form>
            );
        };







        const user = this.props.user
        if (user && user.id) {
            return <Redirect to='/home'/>
        }






// 返回登录界面
        const NormalLoginForm = () => {
            const onFinish = async (values) => {
                console.log('Received values of form: ', values)
                //调用login，把值传递给login
                this.props.login(values.username, values.password)
                if (values.remember) {
                    storageUtils.saveUserName(values.username)
                } else {
                    storageUtils.removeUserName()
                }
            };

            return (
                <Form
                    name="normal_login"
                    className="login-form"
                    initialValues={{
                        remember: true,
                        username: 'admin',
                        password: 'admin'
                    }}
                    onFinish={onFinish}
                >
                    <Form.Item
                        name="username"
                        rules={[
                            {
                                // type: 'email',
                                required: true,
                                message: 'please enter your email',
                            },
                        ]}
                    >
                        <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="邮箱"/>
                    </Form.Item>
                    <Form.Item
                        name="password"
                        rules={[
                            {required: true, message: 'password please'},
                            // {pattern: /^[a-zA-Z0-9_]+$/, message: '密码必须是英文、数字或下划线组成'}
                            {pattern: /^[a-zA-Z0-9_]+$/, message: 'the passcode must be English words, integer or "_"'}
                        ]}
                    >
                        <Input 
                            prefix={<LockOutlined className="site-form-item-icon"/>}
                            type="password"
                            placeholder="password"
                        />

                    </Form.Item>


                    <Form.Item>
                        <Button type="primary" htmlType="submit" ghost="true" className="login-form-button">
                            login
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" ghost="true" className="register-form-button"
                                onClick={() => this.setState({show: 1})}>
                            Register
                        </Button>
                    </Form.Item>
                    <Form.Item className='login-form-remember'>
                        <Form.Item name="remember" valuePropName="unchecked" className='login-form-remember-switch'>
                            {/*<Switch/>*/}
                            {/*<span style={{fontSize: '.75rem', fontWeight: '400'}}>&nbsp;&nbsp;&nbsp;记住用户名</span>*/}
                            <Checkbox className="rem">remember username</Checkbox>
                            {/*<Switch checkedChildren="记住密码" unCheckedChildren="" defaultChecked />*/}
                        </Form.Item>
                    </Form.Item>
                </Form>
            );
        };





// 最终调用的return 如果调用Demo就返回注册界面 如果调用Nomral就i返回登陆界面
        return (
            <div className='login'>
                <header className='login-header'>
                    
                    <h1>XJTLU Online Learning Content Sharing Website </h1>
                </header>
        
                <section className='login-content'>
                    <h2><UserOutlined />XJTLU </h2>
                    {NormalLoginForm()}
                </section>
                <footer>
        
                </footer>
                <Modal
                    title="Register"
                    visible={this.state.show === 1}
                    onOk={this.sendOrder}
                    onCancel={this.hideRegisterForm}
                    okText='submit'
                    cancelText='back'
                >
                    <div style={{display: 'flex'}}>
                        {Demo()}
                    </div>
                </Modal>

            </div>
        );
    }
}



//zeqiang
//生成一个container组件 Login是UI组件 state
export default connect(
    //容器组件传递给UI组件的redux中处理的状态
    state => ({user: state.user}),
    //UI组件中让redux做的事情
    {login}
)(Login)