import React, { useState } from 'react'
import '../css/header.css'

export default function Header() {
  // storing the input value to this state to use it later
  const[inputValue,setInputValue] = useState('');
  // storing the data got from the API 
  const[data,setData] = useState(null);
  /* setting error to true when there is error and 
    false when there is not error and also to decide 
    whether an element is going to be displayed or not
    i mean the error message cause it depends on whether 
    error is true or false
  */  
  const[error,setError] = useState(false)
    // storing error message to this state 
  const[errorMessage,setErrorMessage] = useState('')


  function handleChange(event){
    setInputValue(event.target.value)
  }
  function handleSubmit(e){  
    e.preventDefault();
      // displaying error message when the user didn't enter anything 
    if(inputValue === ''){
      setError(true)
      setErrorMessage('please enter a book name ')
      setData('')      
    }else{    
      const url = `https://www.googleapis.com/books/v1/volumes?q=${encodeURIComponent(inputValue)}`
      fetch(url)
      .then((res)=> res.json())
      .then((data)=>{     
        setError(false)
          /*  displaying error message when the user
              enters something but do not match any book or simpling saying not a valid book */
        if(data.items === undefined){
          setError(true)
          setErrorMessage("no books found, sorry")
          setData('')
          return;
        }
        setError(false)
        setData(data)
        
      })
    }

    
  }

  return (
    <div className='headerContainer'>
        <h1>virtual bookshelf</h1>

        <form>
            <input type="text" placeholder="Book name: " required onChange={handleChange} />
            <button type="submit" onClick={handleSubmit}>Search</button>
        </form>
        {error? <div className='errorMessage'>{errorMessage}</div>: null}
        {data? 
        <div className="displayData">
          <img src={data.items[0].volumeInfo.imageLinks.thumbnail} alt="" />
          <div className="info">
            <h3>{data.items[0].volumeInfo.title}</h3>
            <p>Author: {data.items[0].volumeInfo.authors}</p>
            <p>published year: {data.items[0].volumeInfo.publishedDate}</p>
            <p>pages: {data.items[0].volumeInfo.pageCount}</p>
            <div className="links">
              <a href={data.items[0].volumeInfo.previewLink} style={{display: 'block'}} target='_blank'>preview</a>
              <a href={data.items[0].volumeInfo.canonicalVolumeLink} style={{display: 'block'}} target='_blank'>get the book</a>
            </div>
          </div>
        </div>
        : ''}
    </div>
  )
}
