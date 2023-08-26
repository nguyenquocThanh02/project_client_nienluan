import React from "react";
import { Card } from 'antd';
import { 
    WrapperCardStyle,
    StyleNameProduct,
    WrapperReportText,
    WrapperPriceText,
    WrapperDiscountText
} from "./style";
import { StarFilled } from "@ant-design/icons";

function CardComponent() {
    return ( 
        <div>
            <WrapperCardStyle
                hoverable
                headStyle={{width: '200px', height: '200px'}}
                style={{ width: 200 }}
                bodyStyle={{padding: '10px'}}
                cover={<img alt="example" src="https://os.alipayobjects.com/rmsportal/QBnOOoLaAfKPirc.png" />}
            >
                <StyleNameProduct>Iphone</StyleNameProduct>
                <WrapperReportText>
                    <span>
                        <span>5.55</span>
                        <StarFilled style={{fontSize: '10px', color: 'yellow'}}/>
                    </span>
                    <span> | Đã bán 1000+</span>
                </WrapperReportText>
                <WrapperPriceText>1.000.000d
                    <WrapperDiscountText>
                        -5%
                    </WrapperDiscountText>
                </WrapperPriceText>
            </WrapperCardStyle>
        </div>
     );
}

export default CardComponent;