import axios from "axios"
import logo from "./logo.svg"
import "./App.css"
import { useEffect, useState } from "react"
import Navbar from "./pages/layout/Navbar"
import MainContent from "./pages/layout/MainContent"

function App() {
  const [message, setMessage] = useState("")

  useEffect(() => {
    ;(async () => {
      const { data } = await axios.get(
        `${process.env.REACT_APP_API_BASE_URL}/greetings`
      )
      setMessage(data?.message || "")
    })()
  }, [])
  return (
    <>
      <Navbar />
      <MainContent />
    </>
  )
}

export default App
