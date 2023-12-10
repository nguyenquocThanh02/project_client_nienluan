import axios from 'axios'

export const CreateService= async (data) => {
    const res= await axios.post('http://localhost:3001/api/order/create-order',data)
    return res.data
}
export const updateDeliver= async (id,state) => {
    const res= await axios.put(`http://localhost:3001/api/order/update-deliver/${id}/${state}`)
    return res.data
}

export const GetOrderOfUser= async (id) => {
    const res= await axios.get(`http://localhost:3001/api/order/get-all-ordered-of-user/${id}`)
    return res.data
}
export const CancelOrder= async (id, orderItems, userId) => {
    const data = {orderItems, orderId: id}
    const res= await axios.delete(`http://localhost:3001/api/order/cancel-order/${userId}`,{data})
    return res.data
}

export const GetAllOrder= async (id) => {
    const res= await axios.get(`http://localhost:3001/api/order/get-all-ordered`)
    return res.data
}



