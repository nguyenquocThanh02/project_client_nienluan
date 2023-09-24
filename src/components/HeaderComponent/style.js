import { Row } from "antd";
import styled from "styled-components";

export const WrapperHeader= styled(Row)`
    padding: 10px 60px;
    background-color: black;
    align-items: center;
`
export const WrapperTextHeader= styled.span`
    font-size: 18px;
    color: #fff;
    font-weight: bold;
    text-align: left;
    cursor: pointer;
    &:hover{
        color: #fff;
    }
`
export const WrapperTextContact= styled.span`
    font-size: 14px;
    color: #fff;
    cursor: pointer;
    &:hover{
        color: #fff;
    }
`

export const WrapperHeaderAccount= styled.div`
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 14px;
    gap: 10px;
    &:hover{
        cursor: pointer;
        opacity: 0.8;
    }
`
export const WrapperHeaderPop= styled.div`
    cursor: pointer;
    padding: 5px 0;
    &:hover{
        color: #ccc;
    }
`