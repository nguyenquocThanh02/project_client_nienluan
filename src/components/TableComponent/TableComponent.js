import React, {useState} from 'react';
import {Button, Table} from 'antd';
import Loading from '../LoadingComponent/Loading';


function TableComponent(props) {
    const {isLoading, data= [], columns, rowSelectionUse }= props;

    // Tất cả sản phẩm 
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);
    // const [loading, setLoading] = useState(false);
    // const start = () => {
    //     setLoading(true);
    //     setTimeout(() => {
    //         setSelectedRowKeys([]);
    //         setLoading(false);
    //     }, 1000);
    // };
    const onSelectChange = (newSelectedRowKeys) => {
        console.log('selectedRowKeys changed: ', newSelectedRowKeys);
        setSelectedRowKeys(newSelectedRowKeys);
    };
    const rowSelection = {
        selectedRowKeys,
        onChange: onSelectChange,
    };
    const hasSelected = selectedRowKeys.length > 0;

    return ( 
        <Loading isLoading={isLoading}>
            <div
                style={{
                marginBottom: 16,
                }}
            >   
                {/* <Button type="primary" onClick={start} disabled={!hasSelected} loading={loading}>
                    Bỏ chọn
                </Button> */}
                <span
                style={{
                    marginLeft: 8,
                }}
                >
                    {hasSelected ? `Selected ${selectedRowKeys.length} items` : ''}
                </span>
            </div>
            <Table rowSelection={rowSelectionUse || rowSelection} columns={columns} dataSource={data} {...props}/>
        </Loading>
    );
}

export default TableComponent;