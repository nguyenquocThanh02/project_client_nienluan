import React from "react";
import { WrapperContainerLeft, WrapperContainerRight, WrapperLeftFinal} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {Image, Button, Checkbox, Form, Input} from "antd";
import logIn from "../../assets/images/log-in.jpg";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as UserService from '../../services/UserService';
import * as message from '../../components/Message/Message';
import Loading from "../../components/LoadingComponent/Loading";

function SignUpPage() {
    const navigate= useNavigate();
    const [email, setEmail]= useState('');
    const [password, setPassword]= useState('');
    const [confirmPassword, setConfirmPassword]= useState('');

    const handleOnchangeEmail= (e) => {
        setEmail(e.target.value);
    }
    const handleOnchangePassword= (e) => {
        setPassword(e.target.value);
    }
    const handleOnchangeConfirmPassword= (e) => {
        setConfirmPassword(e.target.value);
    }

    const handleNavigateSignin = () => {
        navigate('/sign-in');
    }

    const mutation = useMutationHooks(
        data => UserService.SignUpUser(data)
    )

    
    const { data, isLoading } = mutation

    useEffect(() => {
        if (data?.status === 'ERR') {
          message.error()
        } else if(data?.status === 'OK'){
          message.success()
          handleNavigateSignin()
        }
      }, [data?.status])
    

    const hanleHienthi= ()=>{
        mutation.mutate({email, password, confirmPassword })
    }
    return ( 
        <div style={{background: '#ccc', height: '100vh', display: 'flex'}}>
            <div style={{display: 'flex',margin: 'auto', background: '#fff', width: '50%', height: '60vh', borderRadius: '8px'}}>
                <WrapperContainerLeft>
                    <Form
                        name="basic" labelCol={{span: 0,}}
                        wrapperCol={{span: 24,}} style={{maxWidth: 600,}}
                        initialValues={{remember: false,}} autoComplete="off"
                    >
                        <h3>Đăng ký</h3>
                        <Form.Item
                            name="email"
                            rules={[{ required: true,type: "email", message: 'Không đúng định dạng email'}]}
                        >
                            <Input placeholder="abc@gmail.com" value={email} onChange={handleOnchangeEmail}/>
                        </Form.Item>

                        <Form.Item
                            name="password"
                            rules={[{required: true, message: 'Please input your password!'}]}
                        >
                            <Input.Password placeholder="******" value={password} onChange={handleOnchangePassword}/>
                        </Form.Item>

                        <Form.Item
                            name="confirmPassword"
                            rules={[{required: true, message: 'Please input your correct comfirm password!'}]}
                        >
                            <Input.Password placeholder="******" value={confirmPassword} onChange={handleOnchangeConfirmPassword}/>
                        </Form.Item>
                        {data?.status === 'ERR' && <span style={{color: 'red'}}>{data?.message}</span>}
                        <Loading isLoading={isLoading}>
                            <Form.Item
                                wrapperCol={{offset: 0,span: 24,}} 
                            >
                                <Button type="primary" htmlType="submit" onClick={hanleHienthi} style={{width: '100%'}}>
                                    Đăng ký
                                </Button>
                                {/* <ButtonComponent htmlTypeBtn="submit" textBtn="Đăng ký" typeBtn="primary" styleBtn={{width: '100%'}} /> */}
                            </Form.Item>
                        </Loading>
                        <WrapperLeftFinal>
                            <span>Bạn đã có tài khoản</span>
                            <span onClick={handleNavigateSignin} style={{color: 'blue', marginLeft: '5px', cursor: 'pointer'}}>Đăng nhập</span>
                        </WrapperLeftFinal>
                    </Form>
                </WrapperContainerLeft>

                <WrapperContainerRight>
                    <Image src={logIn} style={{borderRadius: '8px'}}/>
                    <span style={{textAlign: 'center'}}>Hãy đăng ký tài khoản để mua sắm!</span>
                </WrapperContainerRight>
            </div>
        </div>
     );
}

export default SignUpPage;