import axios from 'axios'

export const getAllProduct= async () => {
    const res= await axios.get('http://localhost:3001/api/product/getAll' )
    return res.data
}
export const getAllProductOfType= async (type,limit=6, page) => {
    if(type){
        const res= await axios.get(`http://localhost:3001/api/product/getAll?filter=type&filter=${type}&limit=${limit}&page=${page}`)
        return res.data
    }
}

export const getAllType= async () => {
    const res= await axios.get('http://localhost:3001/api/product/get-all-type')
    return res.data
}

export const CreateProduct= async (data) => {
    const res= await axios.post('http://localhost:3001/api/product/create',data)
    return res.data
}

export const getDetailsProduct= async (id) => {
    const res= await axios.get(`http://localhost:3001/api/product/get-details/${id}`)
    return res.data
}

export const updateProduct= async (id,data) => {
    const res= await axios.put(`http://localhost:3001/api/product/update/${id}`, data)
    return res.data
}

export const deleteProduct= async (id) => {
    const res= await axios.delete(`http://localhost:3001/api/product/delete/${id}`)
    return res.data
}