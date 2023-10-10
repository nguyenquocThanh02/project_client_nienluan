import React, { useState, useEffect, useRef } from 'react';
import { Button, Modal,Form, Input, Space} from 'antd';
import {PlusOutlined} from '@ant-design/icons';
import { SearchOutlined } from '@ant-design/icons';


import {WrapperUploadFile} from "./style";
import { useNavigate } from "react-router-dom";
import { useMutationHooks } from "../../hooks/useMutationHook";
import * as ProductService from '../../services/ProductService';
import * as message from '../../components/Message/Message';
import Loading from "../../components/LoadingComponent/Loading";
import TableComponent from '../TableComponent/TableComponent';
import DrawerComponent from '../DrawerComponent/DrawerComponent';
import { getBase64 } from '../../utils';
import {useQuery} from "@tanstack/react-query";
import ModalComponent from '../ModalComponet/ModalComponent';

const { TextArea } = Input;

function AdminOrderComponent() {

    
}

export default AdminOrderComponent;