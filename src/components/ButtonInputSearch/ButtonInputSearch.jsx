import React from "react";
import {Input, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
function ButtonInputSearch(props) {
    const { size, placeholder, textButton}= props;
    return (  
        <div style={{display: 'flex', background: 'white'}}>
            <Input  size={size} placeholder={placeholder} style={{borderRadius: '0'}}/>
            <Button size={size} icon={<SearchOutlined/>} style={{borderRadius: '0'}}>{textButton}</Button>
        </div>
    );
}

export default ButtonInputSearch;