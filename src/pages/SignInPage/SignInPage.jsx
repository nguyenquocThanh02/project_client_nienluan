import React, { useState, useEffect } from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperLeftFinal} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {Image, Button, Checkbox, Form, Input } from "antd";
import logIn from "../../assets/images/log-in.jpg";
import { useNavigate } from "react-router-dom";
import * as UserService from '../../services/UserService';
import { useMutationHooks } from "../../hooks/useMutationHook";
import Loading from "../../components/LoadingComponent/Loading";
import * as message from '../../components/Message/Message';

function SignInPage() {
    
    const navigate= useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');

    const handleOnchangeEmail= (e) => {
        setEmail(e.target.value);
    }
    const handleOnchangePassword= (e) => {
        setPassword(e.target.value);
    }

    const handleNavigateSignup = () => {
        navigate('/sign-up');
    }
    
    const mutation = useMutationHooks(
        data => UserService.loginUser(data)
    )

    const { data, isLoading } = mutation

    useEffect(() => {
        if (data?.status === 'ERR') {
          message.error()
        } else if(data?.status === 'OK'){
          message.success();
          navigate('/')
        }
      }, [data?.status])
    

    const handleHienthi= ()=>{
        console.log(email, password)
        mutation.mutate({email, password})
        console.log(mutation)
    }
    
    return ( 
        <div style={{background: '#ccc', height: '100vh', display: 'flex'}}>
            <div style={{display: 'flex',margin: 'auto', background: '#fff', width: '50%', height: '60vh', borderRadius: '8px'}}>
                <WrapperContainerLeft>
                    <Form
                        name="basic" labelCol={{span: 0,}}
                        wrapperCol={{span: 24,}} style={{maxWidth: 600,}}
                        initialValues={{remember: true,}} 
                         autoComplete="off"
                    >
                        <h2>Xin chào</h2>
                        <h3>Đăng nhập vào tài khoản</h3>
                        <Form.Item
                            name="email"
                            rules={[{ required: true,type: "email", message: 'Email incorrect'}]}
                        >
                            <Input placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder="******" value={password} onChange={handleOnchangePassword}/>
                        </Form.Item>

                        {data?.status === 'ERR' && <span style={{color: 'red', marginBottom: '4px'}}>{data?.message}</span>}
                        <Loading isLoading={isLoading}>
                            <Form.Item
                                wrapperCol={{offset: 0,span: 24,}} 
                            >
                                <Button type="primary" htmlType="submit" onClick={handleHienthi} style={{width: '100%'}}>
                                    Đăng nhập
                                </Button>
                                {/* <ButtonComponent htmlTypeBtn="submit" textBtn="Đăng nhập" typeBtn="primary" styleBtn={{width: '100%'}} /> */}
                            </Form.Item>
                        </Loading>
                        <WrapperLeftFinal>
                            <span>Bạn chưa có tài khoản</span>
                            <span onClick={handleNavigateSignup} style={{color: 'blue', marginLeft: '5px', cursor: 'pointer'}}>Tạo tài khoản</span>
                        </WrapperLeftFinal>
                    </Form>
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logIn} style={{borderRadius: '8px'}}/>
                    <span style={{textAlign: 'center'}}>Hãy đăng nhập để mua sắm</span>
                </WrapperContainerRight>
            </div>
        </div>
        
        
     );
}

export default SignInPage;