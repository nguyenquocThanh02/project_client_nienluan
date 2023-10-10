import axios from 'axios'

export const CreateService= async (data) => {
    const res= await axios.post('http://localhost:3001/api/order/create-order',data)
    return res.data
}

export const GetOrderOfUser= async (id) => {
    const res= await axios.get(`http://localhost:3001/api/order/get-ordered/${id}`)
    return res.data
}

