import Form from 'react-bootstrap/Form';
import { Formik } from "formik";
import React from 'react'
import { useState } from 'react';



const forgetpPass = () => {
const [email,setEmail] = useState("");
const [error,setError] = useState("");

    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        const url = `http://localhost:8080/api/password-reset`;
        const { data } = await axios.post(url, { email });
        setMsg(data.message);
        setError("");
      } catch (error) {
         {
          setError(error.response.data.message);
          setMsg("");
        }
      }
    } 


  return (
    
        
    <Form onSubmit={handleSubmit}>
        
        <Form.Group className="mb-3" controlId="formGroupEmail">
        <Form.Label>Email address</Form.Label>
        <Form.Control 
          type="email" 
          placeholder="Enter email"
          name = "email"
          onChange={(e)=> setEmail(e.target.value)}
          value={email}
          required
          
        />
      </Form.Group>
      <button type="submit" className={styles.green_btn}>
					Submit
			</button>

    </Form>
   
  );
}

export default forgetpPass;