import { Row, Col, Pagination } from "antd";
import React from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { WrapperProduct, WrapperNavBar } from "./style";
function TypeProductPage() {
    const onChange= ()=>{

    }
    return ( 
        <p>
            <Row style={{padding: '0 60px', background: '#ccc', paddingTop: '16px', flexWrap: 'nowrap'}}>
                <WrapperNavBar span={4} >
                    <NavBarComponent />
                </WrapperNavBar>
                <Col span={20}>
                    <WrapperProduct>
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                        <CardComponent />
                    </WrapperProduct>
                    <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} />
                </Col>
            </Row>
        </p>
     );
}

export default TypeProductPage;