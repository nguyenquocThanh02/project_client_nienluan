import styled from 'styled-components';

export const WrapperStyleNameProduct= styled.h1`
    color: rgb(36,36,36);
    font-size: 24px;
    font-weight: 400;
    line-height: 32px;
    word-break: break-word;    

`
export const WrapperStyleTextSell= styled.span`
    font-size: 15px;
    line-height: 24px;
    color: rgb(120, 120, 120);
    margin-left: 10px;
`
export const WrapperPriceProduct= styled.h1`
    font-size: 32px;
    line-height: 40px;
    margin-top: 8px;
    font-weight: 500;
    padding: 10px 0 10px 0;
    margin-top: 10px;
`
export const WrapperAddressProduct= styled.div`
    gap: 6px;
    span.address{
        text-decoration: underline;
        font-size: 15px;
        line-height: 24px;
        font-weight: 500;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
    }
    span.change-address{
        color: rgb(11, 116, 229);
        font-size: 16px;
        line-height: 24px;
        font-weight: 500;
    }

`

export const WrapperQualityProduct= styled.div`
    display: flex;
    align-items: center;
    gap: 6px;
    font-size: 16px;
    font-weight: 400;
`

export const WrapperQualityBtn= styled.button`
    border: none;
    padding-top: 4px;
    background-color: #ccc;
`

export const WrapperBtnBuy= styled.button`
    display: flex;
    gap: 20px;
    padding-left: 0;
    background: transparent;
    border: none;
    margin: 30px 0 10px 0;
`