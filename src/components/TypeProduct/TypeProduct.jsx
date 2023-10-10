import React from "react";
import {WrapperTypeProduct} from './style';
import { useNavigate } from "react-router-dom";
function TypeProduct({name}) {
    const navigate= useNavigate();

    const handleNavigateTypeProduct= (type)=>{
        navigate(`/products/${type}`, {state: type})
    }
    return ( 
        <WrapperTypeProduct onClick={()=>handleNavigateTypeProduct(name)}>
            {name}
        </WrapperTypeProduct>
     );
}

export default TypeProduct;