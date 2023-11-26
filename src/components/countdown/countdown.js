"use client"
import { useEffect, useRef, useState } from "react"

const formatTime = (time) => {
    let minutes = Math.floor(time/60)
    let seconds = Math.floor(time - minutes*60)

    if(minutes <=10) minutes = '0' + minutes
    if(seconds <= 10) seconds = '0' + seconds

    return minutes + ':' + seconds
}
export default function Countdown({count, setCount, result}) {
    const timerId = useRef()

    useEffect(() => {
        timerId.current = setInterval(() => {
            setCount(prev => prev - 1)
        }, 1000)
        return () => clearInterval(timerId.current)
    },[])

    useEffect(() => {
        if(count <= 0){
            clearInterval(timerId.current)
            result()
        }
    },[count])
  return (
    <div>Timer: {formatTime(count)}</div>
  )
}
