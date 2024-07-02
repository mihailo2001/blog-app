import React from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';

const Registration = () => {

    const initialValues = {
        username: "",
        password: "",
    };

    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .max(15, 'Username must be at most 15 characters long')
            .required(),
        password: Yup.string()
            .min(4, 'Password must be at least 4 characters long')
            .max(20, 'Username must be at most 20 characters long')
            .required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/auth", data)
        .then(() => {
            console.log(data);
        });
    };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Username: </label>
                <ErrorMessage name="username" component="span"/>
                <Field 
                    className="inputCreatePost" 
                    name="username" 
                    placeholder="(Ex. John123...)"
                />
                <label>Password: </label>
                <ErrorMessage name="password" component="span"/>
                <Field 
                    type="password"
                    className="inputCreatePost" 
                    name="password" 
                    placeholder="Your Password..."
                />
                <button type='submit'> Register </button>
            </Form>
        </Formik>
    </div>
  )
}

export default Registration
