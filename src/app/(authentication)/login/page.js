"use client"
import useQuizStore from "@/app/store/store"
import { useState } from "react"
import toast, { Toaster } from 'react-hot-toast';
import { useRouter } from "next/navigation";
export default function Page() {

    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const user = useQuizStore((state) => state.user)
    const isLogin = useQuizStore(state => state.isLogin)
    const router = useRouter()
    const toastSucces = () => toast.success('success, wait a minutes...')
    const toastFailed = () => toast.error('something wrong, check your email or pasword...')

    const handleEmail = (e) => {
        setEmail(e.target.value)
    }

    const handlePassword = (e) => {
        setPassword(e.target.value)
    }

    const handleLogin = () => {
        
        if(email === user.email && password === user.password){
            isLogin()
            toastSucces()
            router.push('/dashboard/')
        }else{
            toastFailed()
        }
    }
  return (
    <div className="w-full h-screen flex flex-col justify-center items-center gap-10 sm:flex-row">
        <h1>Welcome to the exam website</h1>
        <div className="w-[300px] h-[300px] bg-white text-blue-950 p-5 rounded-lg">
            <div>
                <p>Email: <span className="text-[12px] text-yellow-500">azrai@gmail.com</span></p>
                <input type="text" placeholder="your email" className=" p-3 w-full border-2 border-blue-100" onChange={handleEmail}/>
            </div>
            <div>
                <p>Password: <span className="text-[12px] text-yellow-500">1234</span></p>
                <input type="text" placeholder="your email" className="p-3 w-full border-2 border-blue-100" onChange={handlePassword}/>
            </div>
            <button className="w-full h-16 bg-blue-950 text-white mt-5 hover:opacity-90 disabled:opacity-100 disabled:border-2" onClick={handleLogin} disabled={email.length < 1 || password.length < 1}>Login</button>
            
        </div>
        <Toaster/>

    </div>
  )
}
