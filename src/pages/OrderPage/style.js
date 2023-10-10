import { styled } from "styled-components";
export const WrapperBodyPrice= styled.div`
    display: flex;
    flex-direction: column;
    background-color: #fff;
    border-radius: 8px;
    padding: 0px 16px 10px;
`
export const WrapperGroupPrice= styled.div`
    display: flex;
    padding: 0px 12px;
    justify-content: space-between;
    line-height: 0.1;
`
export const WrapperGroupSumPrice= styled.div`
    display: flex;
    padding: 0px 18px;
    justify-content: space-between;
    line-height: 0;
    align-items: center;
    gap: 24px;
`
export const WrapperName= styled.div`
    max-width: 200px;
    color: blue;
    padding: 5px 0;
    white-space: nowrap; /* Ngăn text xuống hàng */
    overflow: hidden; /* Ẩn phần vượt quá kích thước */
    text-overflow: ellipsis; /* Hiển thị dấu ... khi văn bản bị cắt */
`
export const WrapperTitleOrder= styled.div`
    font-size: 14px;    
    font-weight: 500;
    padding-bottom: 8px;
`
export const WrapperBodyInfor= styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`
export const WrapperIconOrdered= styled.div`
    
`
