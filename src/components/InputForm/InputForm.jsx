import React from "react";
import {Input} from "antd";
import { useState } from "react";

function InputForm({placeholder , ...rest}) {
    const [valueInput, setValueInput]= useState('');
    return ( 
        <Input valueInput={valueInput}  placeholder={placeholder} style={{margin: '10px 0'}} {...rest}/>
    );
}

export default InputForm;