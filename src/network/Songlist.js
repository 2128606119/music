import axios from "axios";

export function details(signature) {
  const i=axios.create({
    baseURL:'http://localhost:3000',
    withCredentials: true
  })
  i.interceptors.response.use(res=>{

    return res.data
  },err=>{
    console.log(err)
  })

  return i(signature)
}