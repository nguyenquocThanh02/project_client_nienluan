import { message } from "antd";

const success = (mes = 'Thành công') => {
    message.success(mes);
};

const error = (mes = 'Không thành công!') => {
    message.error(mes);
};

const warning = (mes = 'Cảnh báo nguy hiểm') => {
    message.warning(mes);
};

export { success, error, warning }