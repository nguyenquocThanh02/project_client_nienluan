import React from "react";
import {Input} from "antd";
// import { useState } from "react";

function InputForm(props) {
    const {placeholder , ...rest}= props;
    return ( 
        <Input  placeholder={placeholder}  {...rest} style={{margin: '5px 0'}}/>
    );
}

export default InputForm;