import React, {useState} from 'react';
import {Button, Form} from "react-bootstrap";
import {useNavigate} from "react-router-dom";



const SearchBox = () => {

  const [keyword, setKeyword] = useState('')
  let navigate = useNavigate();

  let submitHandler = (e) => {
    e.preventDefault()
    if (keyword) {
      // window.location.href = `/?keyword=${keyword}`;
      console.log(keyword)
      navigate(`/?keyword=${keyword}&page=1`)
    }
    else {
      navigate('/')
    }

  }
    return (
      <Form className="d-flex" onSubmit={submitHandler}>
        <Form.Control
          type="search"
          placeholder="Search"
          className="me-2"
          aria-label="Search"

          onChange={(e) => setKeyword(e.target.value)}
        />
        <Button variant="outline-success" type='submit'>Search</Button>
      </Form>
    );
  };

  export default SearchBox;