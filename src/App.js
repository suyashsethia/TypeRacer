import React, { useEffect } from 'react'
import ParagraphsGenerator from './Components/Paragraphs.js'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { FaCar, FaCarSide } from "react-icons/fa";


const paragraphs = [
  "Virat Kohli is an Indian international cricketer and the former captain of the Indian national cricket team who plays as a right-handed batsman for Royal Challengers Bangalore in the IPL and for Delhi in Indian domestic cricket Widely regarded as one of the greatest batsmen of all time, and the best of his time. ", "Rohit Gurunath Sharma, is an Indian international cricketer and the current captain of India men’s cricket team in all formats. Considered one of the best batsmen of his generation and one of greatest opening batters of all time, Sharma is known for his timing, elegance, six-hitting abilities and leadership skills.", "Kannaur Lokesh Rahul is an Indian international cricketer who plays as a right-handed wicket-keeper batsmen for Karnataka at the domestic level and is the captain for Lucknow Super Giants in the Indian Premier League.", "Mahendra Singh Dhoni, commonly known as MS Dhoni, is a former Indian cricketer and captain of the Indian national team in limited-overs formats from 2007 to 2017 and in Test cricket from 2008 to 2014, who plays as a Wicket-keeper-Batsman"]

//devide the paragraphs into words 
const random = Math.floor(Math.random() * paragraphs.length)
const paragraph = paragraphs[random]

const words = paragraph.split(" ")
let words_letters = []
//divide the words into letters and " " at end of each word
for (let i = 0; i < words.length; i++) {
  words_letters[i] = words[i].split("")
  words_letters[i].push(" ")
}
console.log(words_letters)

const App = () => {

  const [input, setInput] = React.useState('');
  const [wordindex, setWordIndex] = React.useState(0);
  const [correct, setCorrect] = React.useState(true);
  const [letterindex, setLetterIndex] = React.useState(0);
  const [time, setTime] = React.useState(30);
  const [timerOn, setTimerOn] = React.useState(false);
  const [wpm, setWpm] = React.useState(0);
  const [finished, setFinished] = React.useState(false)
  const [progress, setProgress] = React.useState(0)


  const notify = () => toast(`Your Speed is ${wpm} WPM !!`);

  const CheckInput = (e) => {
    if (!finished) {

      setInput(e.target.value)
    }



  }
  useEffect(() => {
    if (input.length > 0) {
      setTimerOn(true)
    }
  }, [input])
  useEffect(() => {
    let index = input.length
    let expected_corect_input = words[wordindex].substring(0, index)
    if (input === expected_corect_input) {
      setCorrect(true)
      setLetterIndex(index)
    }
    else if (input === expected_corect_input + " ") {
      setCorrect(true)
      setProgress(Math.floor(((wordindex + 1) * 100) / words.length))
      setWordIndex(wordindex => wordindex + 1)
      setInput('')
      setLetterIndex(0)
    }
    else if (input != expected_corect_input) {
      setCorrect(false)
    }
    if (wordindex === words.length - 1) {
      setFinished(true)
      setTimerOn(false)
    }
  }, [input])
  useEffect(() => {
    if (timerOn && time > 0) {
      setTimeout(() => {
        setTime(time => time - 1)
      }, 1000)
    }
    if (wordindex > 0) {
      setWpm(Math.floor((wordindex * 60) / (30 - time)))
    }
    if (time === 0) {

      setFinished(true)
      setTimerOn(false)
      setInput("Sorry Time is Up !!")

    }
  }, [timerOn, time])

  useEffect(() => {
    if (finished) {
      notify()
    }
  }, [finished])
  const Restart = () => {
    window.location.reload()
  }
  // console.log(letterindex)
  return (

    <div className='d-flex justify-content-center flex-column'>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      {/* Same as */}
      <ToastContainer />
      <div className='m-3 p-2 align-self-center '>
        <h1 className=''>
          TypeRacer
        </h1>

        <div className='m-3 p-2 align-self-center '>
          <button className='btn btn-success ' onClick={Restart}>Restart</button>
        </div>
      </div>
      <div className='align-self-center border d-flex justify-content-center my-2 py-3 flex-column ' style={{ width: "80%" , backgroundColor:"#F1EDFA"}}>

        <div style={{ width: "70%", backgroundColor: "#F0F9F5" }} className='rounded m-2 align-self-center border border-3  '>
          <p className='h5 float-start m-2'>Time: {time} s</p>
          <p className='h5 float-end m-2  '>WPM: {wpm}</p>

        </div>
        <div style={{ backgroundColor: correct ? "#A9EAD2" : "#E87672", width: "70%" }} className='rounded m-2 align-self-center border border-3 '>
          <FaCarSide className='m-2 p-3' size={"100px"} style={{ position: "relative", left: `${progress}%` }} />
        </div>

        <div style={{ width: "70%", backgroundColor: "#B0ECFE" }} className='m-2 justify-content-center d-flex rounded align-self-center border border-3 '>

          <p className='h5 m-2 align-self-center'>Progress: {progress}%</p>
        </div>
        <div style={{ width: "70%" , backgroundColor:"#FAF2E7" }} className='rounded d-flex m-2 p-3 justify-content-center flex-column border border-3 border-info align-self-center'>

          <div className=' rounded m-4 px-3 align-self-center mb-auto ' style={{ width: "90%"  }}>
            <p className='h5'>
              {words_letters.map((word, index) => {
                return (
                  <span key={index} style={{ textDecoration: (index == wordindex) ? "underline" : "none" }}>
                    {word.map((letter, indexx) => {

                      return (
                        <span key={indexx} style={{
                          color: (
                            index < wordindex || (index == wordindex && indexx < letterindex)) ? "green" : "none"

                        }}>

                          {letter}
                        </span>
                      )
                    })
                    }
                  </span>
                )
              })
              }
            </p>
          </div>


          <input className='w-75 border-5 p-2 m-4 align-self-center form-control input-lg ' placeholder='Start Typing Here ...' style={{ borderColor: correct ? 'green' : 'red' }} type="text" value={input} onChange={CheckInput} />
        </div>
      </div>
    </div>

  )
}

export default App


