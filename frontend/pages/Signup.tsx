import React from 'react';
import {useNavigate} from "react-router-dom";

export const Signup = () => {
  const url = "http://localhost:8000/api/auth/signup"
  const usernameRef = React.useRef<HTMLInputElement | null>(null);
  const emailRef = React.useRef<HTMLInputElement | null>(null);
  const passwordRef = React.useRef<HTMLInputElement | null>(null);
  const navigate = useNavigate()
  const [isLoading, setIsLoading] = React.useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newData = {
      username: usernameRef.current?.value,
      email: emailRef.current?.value,
      password: passwordRef.current?.value
    }
    setIsLoading(true)
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(newData),
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
        if (data.status === "ok") {
          navigate("/authentication")
        }
        setIsLoading(false)
      })
      .catch(error => {
        console.log("Error in fetch signup: ", error.message)
      })
  }

  return (
    <div>
      {isLoading ? (<h1>Please wait for a while...</h1>) : (
        <form onSubmit={e => handleSubmit(e)}>
          <h1>Signup</h1>
          <label htmlFor="">
            username:
            <input type="text" name={"username"} ref={usernameRef}/>
          </label>
          <br/>
          <label htmlFor="">
            email:
            <input type="email" name={"email"} ref={emailRef}/>
          </label>
          <br/>
          <label htmlFor="">
            password:
            <input type="password" name={"password"} ref={passwordRef}/>
          </label>
          <button type={"submit"}>send</button>
        </form>
      )}
    </div>
  );
};

