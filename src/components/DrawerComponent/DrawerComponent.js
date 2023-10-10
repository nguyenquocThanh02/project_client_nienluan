import React from 'react';
import {Drawer} from 'antd';


function DrawerComponent(props) {
    const { title, isOpen, onClose, children, ...rests} = props;
    return (  
        <Drawer title={title} placement="right" onClose={onClose} open={isOpen} size="large">
            {children}
        </Drawer>
    );
}

export default DrawerComponent;