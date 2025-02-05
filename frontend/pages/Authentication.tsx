import React from 'react';

export const Authentication = () => {
  const url = "http://localhost:8000/api/auth/authentication"

  const inputRef = React.useRef<HTMLInputElement | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const key = {verifyCode: inputRef.current?.value}
    console.log(key)
    await fetch(url, {
      method: "POST",
      body: JSON.stringify(key),
      headers: {"Content-Type": "application/json"},
      credentials: "include"
    })
      .then((response) => {
        return response.json()
      })
      .then((data) => {
        console.log(data)
      })
      .catch(error => {
        console.log("Error in fetch signup: ", error.message)
      })
  }

  return (
    <form onSubmit={e => handleSubmit(e)}>
      <h1>Verify Code</h1>
      <input type="text" ref={inputRef}/>
      <button type={"submit"}>put</button>
    </form>
  );
};

