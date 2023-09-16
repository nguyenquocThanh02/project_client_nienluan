import React from "react";
import { SmileOutlined } from "@ant-design/icons";
function WelcomeAdminComponent() {
    return ( 
        <div style={{display: 'flex', gap: '8px', margin: '0 10px', alignItems: 'center', fontSize: '16px'}}>
            Xin chào bạn trở lại trang quản trị!
            <SmileOutlined />
        </div>
    );
}

export default WelcomeAdminComponent;