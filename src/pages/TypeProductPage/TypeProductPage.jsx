import { Row, Col, Pagination } from "antd";
import React, {useEffect} from "react";
import CardComponent from "../../components/CardComponent/CardComponent";
import NavBarComponent from "../../components/NavBarComponent/NavBarComponent";
import { WrapperProduct, WrapperNavBar } from "./style";
import * as ProductService from "../../services/ProductService";
import { useLocation } from "react-router-dom";
import Loading from '../../components/LoadingComponent/Loading';
import { useQuery } from "@tanstack/react-query";
import {useSelector} from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce'


function TypeProductPage() {
    const onChange= ()=>{
        
    }
    const searchProduct= useSelector((state)=>state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500)

    const {state} = useLocation();
    const fetchAllProductOfType= async (type) => {
        const res= await ProductService.getAllProductOfType(type)
        return res;
    }
    console.log('state', state)
    const {isLoading, data: productsType} = useQuery(['product-of-product'], ()=>fetchAllProductOfType(state))
    return ( 
        <Loading isLoading={isLoading}>
            <Row style={{padding: '0 60px', background: '#eaf0f4', paddingTop: '16px', flexWrap: 'nowrap', minHeight: '90vh'}}>
                <WrapperNavBar span={4}>
                    <NavBarComponent />
                </WrapperNavBar>
                <Col span={20}>
                    <WrapperProduct>
                        {
                            productsType?.data?.filter((pro) => {
                                if(searchDebounce === '') {
                                    return pro
                                }else if(pro?.name?.toLowerCase()?.includes(searchDebounce?.toLowerCase())) {
                                    return pro
                                }
                            })
                            .map(product => (
                                <CardComponent 
                                    key={product._id}
                                    countInStock={product.countInStock}
                                    description={product.description}
                                    image={product.image}
                                    name={product.name}
                                    price={product.price}
                                    rating={product.rating}
                                    type={product.type}
                                    selled={product.selled}
                                    discount={product.discount}
                                    id={product._id}
                                />
                            ))
                        }
                    </WrapperProduct>
                    {/* <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{textAlign: 'center', marginTop: '10px'}} /> */}
                </Col>
            </Row>
        </Loading>
     );
}

export default TypeProductPage;