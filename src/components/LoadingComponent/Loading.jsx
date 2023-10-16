import React from 'react';
import {Spin} from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const antIcon = <LoadingOutlined style={{ fontSize: 24 }} spin />;
const Loading = ({children, isLoading, delay= 200}) => {
    return (
        <Spin spinning={isLoading} delay={delay} indicator={antIcon}>
            {children}
        </Spin>
    )
}
export default Loading;