import { create } from 'zustand'
import { exam } from '../data/data'


const useQuizStore = create((set) => ({
    user:{
      email:'azrai@gmail.com',
      password:'1234'
    },
    login:false,
    isLogin: () => set((state) => ({login:true})),
    isLogOut:() => set((state) => ({login:false})),
    quizData: exam,
    query:1,
    updateQuery: (newQuery) => set((state) => ({query: newQuery})),
    score:0,
    increamentScore: () => set((state) => ({score: state.score + 1})),
    yourAnswers: ['none', 'none', 'none', 'none', 'none'],
    updateAnswers: (newValue, index) => set((state) => {
      const updatedAnswers = [...state.yourAnswers];
      updatedAnswers[index] = newValue;
      return { yourAnswers: updatedAnswers };
    }),
  }))

export default useQuizStore