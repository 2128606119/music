import axios from "axios";

export function HotSearch(signature) {
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


export function MESSURL(signature) {
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

export function geci(signature) {
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

export function artists(signature) {
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
