import React from 'react'
import { Formik, Form, Field, ErrorMessage } from 'formik';
import '../App.css'
import * as Yup from 'yup';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CreatePost = () => {

    let navigate = useNavigate();

    const initialValues = {
        title: "",
        postText: "",
        username: ""
    };

    const validationSchema = Yup.object().shape({
        title: Yup.string().required(),
        postText: Yup.string().required(),
        username: Yup.string()
            .min(3, 'Username must be at least 3 characters long')
            .max(15, 'Username must be at most 15 characters long')
            .required(),
    });

    const onSubmit = (data) => {
        axios.post("http://localhost:3001/posts", data)
        .then((response) => {
            navigate.push('/');
        });
    };

  return (
    <div className='createPostPage'>
        <Formik initialValues={initialValues} 
            onSubmit={onSubmit} 
            validationSchema={validationSchema}>
            <Form className='formContainer'>
                <label>Title: </label>
                <ErrorMessage name="title" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="title" 
                    placeholder="(Ex. Title...)"
                />
                <label>Post: </label>
                <ErrorMessage name="postText" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="postText" 
                    placeholder="(Ex. Post...)"
                />
                <label>Username: </label>
                <ErrorMessage name="username" component="span"/>
                <Field 
                    id="inputCreatePost" 
                    name="username" 
                    placeholder="(Ex. John123...)"
                />
                <button type='submit'> Create Post </button>
            </Form>
        </Formik>
    </div>
  )
}

export default CreatePost
