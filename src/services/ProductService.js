import axios from 'axios'

export const getAllProduct= async () => {
    const res= await axios.get('http://localhost:3001/api/product/getAll' )
    return res.data
}

export const CreateProduct= async (data) => {
    const res= await axios.post('http://localhost:3001/api/product/create',data)
    return res.data
}