import React from "react";
import { 
    WrapperCardStyle,
    StyleNameProduct,
    WrapperReportText,
    WrapperPriceText,
    WrapperDiscountText
} from "./style";
import { StarFilled } from "@ant-design/icons";

function CardComponent(props) {
    const { countInStock, description, image, name, price, rating, type, selled, discount, id}= props;
        
    return ( 
        <div>
            <WrapperCardStyle
                hoverable
                headStyle={{width: '200px', height: '200px'}}
                style={{ width: 200 }}
                bodyStyle={{padding: '10px'}}
                cover={<img alt="example" src={image} />}
            >
                <StyleNameProduct>{name}</StyleNameProduct>
                <WrapperReportText>
                    <span>
                        <span>{rating}</span>
                        <StarFilled style={{fontSize: '10px', color: 'yellow'}}/>
                    </span>
                    <span> | Đã bán {selled || 1000}+</span>
                </WrapperReportText>
                <WrapperPriceText>
                    {price}đ
                    <WrapperDiscountText>
                        -{discount}%
                    </WrapperDiscountText>
                </WrapperPriceText>
            </WrapperCardStyle>
        </div>
     );
}

export default CardComponent;