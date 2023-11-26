"use client"

import { useRouter } from "next/navigation"
import Link from "next/link"
import Buttons from "@/components/button/buttons"
import useQuizStore from "@/app/store/store"
import { useState } from "react"
import { IoIosArrowForward } from "react-icons/io";
export default function Dashboard() {
  const [side, setSide] = useState(false)
  const router = useRouter()
  const quiz = useQuizStore((state) => state.quizData)
  const updateQuery = useQuizStore((state) => state.updateQuery)
  const login = useQuizStore(state => state.login)
  const handleRoute = (id) => {
    updateQuery(id)
    router.push(`/dashboard/${id}`)
  }
  return (
    <div className='w-full h-screen flex justify-center items-center'>
        <div className={`sidebar absolute top-0 left-0  w-80 h-screen bg-white text-gray-950 z-10 pt-20 pl-10  ${side ? '-translate-x-[250px] transition-all duration-700' : '-translate-x-0 transition-all duration-1000'}`}>
            <h1 className='text-gray-950'>Dashboard</h1>
            <IoIosArrowForward  className="absolute top-1/2 right-0 text-3xl font-bold cursor-pointer" onClick={() => setSide(prev => !prev)}/>
        </div>
        {
          login? <div className="pt-32 grid grid-cols-2 place-content-center w-[300px] gap-5 ml-20">
          {
            quiz.listExam.map((exam) => (
              <div className="w-32 h-24 border-white border-2 flex items-center justify-center cursor-pointer hover:bg-white hover:text-blue-950"
              key={exam.id}
              onClick={() => handleRoute(exam.id)}>
                <h1>{exam.title}</h1>
              </div>
            ))
          }
        </div>
        :

        <div className="pt-28 grid place-content-center w-[300px] gap-5 text-center">
          <h1 className="text-xl">You must be Login, Go to Login page</h1>
          <Link href={'/login'}>
           <Buttons title='Login here'/>
          </Link>
        </div>
        }
        
    </div>
  )
}
