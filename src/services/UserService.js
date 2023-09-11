import axios from 'axios'
export const axiosJWT = axios.create();

export const loginUser= async (data) => {
    const res= await axios.post('http://localhost:3001/api/user/sign-in', data)
    return res.data
}

export const SignUpUser= async (data) => {
    const res= await axios.post('http://localhost:3001/api/user/sign-up', data)
    return res.data
}

export const getDetailsUser= async (id, access_token) => {
    const res= await axiosJWT.get(`http://localhost:3001/api/user/get-details/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const refreshToken= async () => {
    const res= await axios.post(`http://localhost:3001/api/user/refresh-token`, {
        withCredentials: true
    })
    return res.data
}

