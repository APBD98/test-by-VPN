"use client"
import Buttons from "@/components/button/buttons"
import useQuizStore from "@/app/store/store"
import Link from "next/link"
import { redirect } from "next/navigation"

export default function Page() {
  const quiz = useQuizStore((state) => state.quizData)
  const query = useQuizStore((state) => state.query)
  const login = useQuizStore(state => state.login)

  const filter = quiz.listExam.filter((item) => item.id === query)
  if(login == false){
    redirect('/dashboard')
  }

  return (
      
      <div className="w-full h-screen pt-32 bg-blue-950 flex justify-center items-start">
        {
          filter.map((item) => (
            <div className="w-[400px] min-h-40 p-5" key={item.id}>
              <h1 className="text-2xl text-center underline underline-offset-8 mb-5">{item.title}</h1>
              <article className="pr-2 w-full">Description: {item.desc}</article>
              <p>Times: {item.times} minutes</p>
              <p>Rules: {item.rules}</p>
              <p>Count: {item.count} question</p>
              <Link href={'/dashboard'}><Buttons title='Back to Dashboard'/></Link>
              <Link href={`/dashboard/${query}/exam`}><Buttons title='Start Quiz'/></Link>
            </div>
          ))
        }
      </div>
  )
}