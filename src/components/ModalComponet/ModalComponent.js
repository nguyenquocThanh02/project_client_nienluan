import React from 'react';
import { Modal } from 'antd';

function ModalComponent({title, isOpen, children, ...rests}) {
    return (  
        <>
            <Modal title={title} open={isOpen} {...rests}>
                {children}
            </Modal>
        </>

    );
}

export default ModalComponent;