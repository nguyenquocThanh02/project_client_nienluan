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
        color: #ccc;
    }
`
export const WrapperHeaderAccount= styled.div`
    display: flex;
    color: #fff;
    font-size: 15px;
    font-weight: bold;
    gap: 10px;
`
export const WrapperHeaderPop= styled.div`
    cursor: pointer;
    padding: 5px 0;
    &:hover{
        color: #ccc;
    }
`