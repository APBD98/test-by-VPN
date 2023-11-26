"use client"

import React, {useState} from 'react'
import Link from 'next/link';
import useQuizStore from '@/app/store/store';
import { redirect } from 'next/navigation';
import Countdown from '@/components/countdown/countdown';

export default function Page({params}) {
  const quiz = useQuizStore((state) => state.quizData)
  const query = useQuizStore((state) => state.query)
  const yourAnswers = useQuizStore((state) => state.yourAnswers)
  const updateAnswers = useQuizStore(state => state.updateAnswers)
  const increamentScore = useQuizStore((state) => state.increamentScore)
  const login = useQuizStore(state => state.login)
  const [activeQuestion, setActiveQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState('');
  const [checked, setChecked] = useState(false);
  const [selectedAnswerIndex, setSelectedAnswerIndex] = useState(null);
  const [count, setCount] = useState(600)

  const { listQuestions } = quiz.questions;
  const { question, answers, correctAnswer } = listQuestions[activeQuestion];


  const onAnswerSelected = (answer, idx) => {
    setChecked(true);
    setSelectedAnswerIndex(idx);
    updateAnswers(answer, activeQuestion)
    if (answer === correctAnswer) {
      setSelectedAnswer(true);
      console.log('true');
    } else {
      setSelectedAnswer(false);
      console.log('false');
      
    }
  }

  const nextQuestion = () => {
    console.log(yourAnswers)
    setSelectedAnswerIndex(null);
    if(selectedAnswer === true){
      increamentScore()
    }
    if (activeQuestion !== listQuestions.length - 1) {
      setActiveQuestion((prev) => prev + 1);
    } else {
      setActiveQuestion(0);
      setShowResult(true);
    }
    setChecked(false);
  }
  const result = () => {
    redirect(`/dashboard/${query}/result`)
  }



  if(login == false){
    redirect('/dashboard')
  }

  return (
    <div className='pt-32 w-full h-screen p-5'>
      <h1 className='mb-5 text-center'>Examination Page</h1>
      <div className='absolute top-28 right-5 text-xl text-white lg:text-2xl'>
        <Countdown count={count} setCount={setCount} result={result}/>
      </div>
      <h2 className='text-center mb-5 lg:mb-1'>Question: {activeQuestion + 1}
          <span>/{listQuestions.length}</span>
        </h2>
      <div className='w-full min-h-52 bg-white mx-auto text-black text-2xl p-5 sm:w-3/4 lg:w-1/2 '>
        
        <div>
          <h3 className='text-2xl lg:text-4xl'>{listQuestions[activeQuestion].question}</h3>
          <ul>
            {
              answers.map((answer, index) => (
                <li
                 
                onClick={() => onAnswerSelected(answer,index)}
                key={index} 
                className={`${selectedAnswerIndex === index && checked === true && 'bg-[#000925] text-[#fff] pointer-events-none'} w-full h-16 border-2 border-gray-800 rounded-sm m-2 pt-4 pl-2 cursor-pointer hover:bg-gray-500`}
                >{answer}</li>
              ))
            }
          </ul>
          {
            activeQuestion + 1 === 5 ? 
            
            <Link href={`/dashboard/${query}/result`}>
              <button className='w-full h-16 bg-gray-900 text-white m-2 hover:opacity-75'
              onClick={() => {
                if(selectedAnswer === true){
                  increamentScore()
                }
              }}>Finish</button> 
            </Link>
            : 
            <button className='w-full h-16 bg-gray-900 text-white m-2 hover:opacity-75'  onClick={nextQuestion}>Save and Next</button>
          }
          
        </div>
      </div>
    </div>
  )
}
