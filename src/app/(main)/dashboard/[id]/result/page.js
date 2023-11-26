"use client"
import useQuizStore from "@/app/store/store"
import { redirect } from "next/navigation"

export default function page() {
  const score = useQuizStore((state) => state.score)
  const quiz = useQuizStore((state) => state.quizData)
  const login = useQuizStore(state => state.login)
  const yourAnswers = useQuizStore((state) => state.yourAnswers)
  
  const {listQuestions} = quiz.questions
  if(login == false){
    redirect('/dashboard')
  }
  const congrats = () => {
    if(score > 3){
      return <h1>Congratulation</h1>
    }else if(score >= 1){
      return <h1>That's good</h1>
    }else{
      return <h1>Not enough</h1>
    }
  }
  return (
    <div className='w-full min-h-screen pt-32'>
      <div className="text-center">
        <h1>Total score: {score * 20}</h1>
        <p>Correct answers: {score}</p>
        <p>Wrong answers: {5 - score}</p>
        <div>
          {congrats()}
        </div>
      </div>

      <div className="w-full min-h-[500px] bg-blue-950 mt-10 text-blue-950 flex flex-col justify-center items-center gap-10 p-3">
        {
          listQuestions.map((question, index) => (
            <div className="border-2 border-gray-700 w-full min-h-40 bg-white p-5 sm:w-3/4 lg:w-1/2" key={question.id}>
              <h1>{question.question}</h1>
              <ul>
                {
                  question.answers.map((answer, index) => (
                    <li className={`${question.correctAnswer === answer && 'bg-[#000925] text-[#fff]'} w-full h-10 border-2 m-2 p-2`} key={index}>{answer}</li>
                  ))
                }
              </ul>
              <p className="p-2">your answer: <span className="border-b-2 border-blue-950 text-xl">{yourAnswers[index]}</span></p>
            </div>
          ))
        }
      </div>
    </div>
  )
}
