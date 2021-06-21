import axios from "axios";

/*搜索列表*/
export const enter=ser=>{
  const i=axios.create({
    baseURL:'http://localhost:3000',
    timeout:'5000',
    withCredentials: true
  })
  i.interceptors.response.use(res=>{
    return res.data
  },err=>{
    console.log(err)
  })
  return i(ser)
}

/*用户登录*/
export const user=ser=>{
  const i=axios.create({
    baseURL:'http://localhost:3000',
    timeout:'5000',
    withCredentials: true
  })
  i.interceptors.response.use(res=>{
    console.log("用户登录:")
    console.log(+res)
    return res
  },err=>{
   console.log(err)
  })
  return i(ser)
}

