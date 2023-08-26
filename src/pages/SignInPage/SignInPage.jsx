import React from "react";
import { WrapperContainerLeft, WrapperContainerRight} from "./style";
import ButtonComponent from "../../components/ButtonComponent/ButtonComponent";
import InputForm from "../../components/InputForm/InputForm";
import {Image} from "antd";
import logIn from "../../assets/images/log-in.jpg";
function SignInPage() {
    return ( 
        <div style={{background: '#ccc', height: '100vh', display: 'flex'}}>
            <div style={{display: 'flex',margin: 'auto', background: '#fff', width: '50%', height: '60vh', borderRadius: '8px'}}>
                <WrapperContainerLeft>
                    <h1>Xin chào</h1>
                    <p>Đăng nhập vào tài khoản</p>
                    <InputForm placeholder="abc@gmail.com" />
                    <InputForm placeholder="password" />
                    <ButtonComponent textBtn="Dang nhap" typeBtn="primary" styleBtn={{width: '100%', marginTop: '20px'}} />
                </WrapperContainerLeft>
                <WrapperContainerRight>
                    <Image src={logIn} style={{borderRadius: '8px'}}/>
                    <span>Hãy đăng nhập để mua sắm</span>
                </WrapperContainerRight>
            </div>
        </div>
     );
}

export default SignInPage;