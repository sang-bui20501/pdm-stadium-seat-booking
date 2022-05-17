
import React, {useEffect} from 'react'
import axios from "axios";

const Test = () => {
  useEffect(() => {
      axios.post("http://localhost:8080/authenticate" , {
        username: "wanda",
        password: "1234"
      })
  } , [])
  return (
      <div>
        atest
      </div>
  )
}
export default Test;