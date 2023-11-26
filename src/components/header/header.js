"use client"
import { useRouter } from "next/navigation"
import useQuizStore from "@/app/store/store"
import Link from "next/link"

export default function Header() {
    const router = useRouter()
    const login = useQuizStore(state => state.login)
    const isLogOut = useQuizStore(state => state.isLogOut)

    const logOut = () => {
        router.push('/login')
        isLogOut()
    }
  return (
    <div className="bg-white w-full h-24 text-blue-950 fixed top-0">
        <h1 className="text-center pt-10">Examination Website</h1>
        {
            login?
            <p className="text-right -mt-6 pr-5 underline underline-offset-8 cursor-pointer" onClick={logOut}>Log out</p>
            :
            <Link href={'/login'}>
                <p className="text-right -mt-6 pr-5 underline underline-offset-8">Login</p>
            </Link>
        }
    </div>
  )
}
