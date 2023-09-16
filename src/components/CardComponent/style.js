import styled from "styled-components";
import {Card} from "antd";

export const WrapperCardStyle= styled(Card)`
    width: 200px;
    & img{
        height: 200px;
        width: 200px;
    }
`
export const StyleNameProduct= styled.div`
    font-weight: 400;
    font-size: 16px;
    line-height: 16px;
    color: #494747;
    margin-bottom: 2px;
`
export const WrapperReportText= styled.div`
    font-size: 11px;
    color: #000;
    display: flex;
    align-items: center;
    margin: 5px 0;

`
export const WrapperPriceText= styled.div`
    font-weight: 500;
    font-size: 18px;
    color: red;
`
export const WrapperDiscountText= styled.span`
    font-weight: 500;
    font-size: 12px;
    color: red;
`