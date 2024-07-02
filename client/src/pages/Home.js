import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    let navigate = useNavigate();

    const handleNavigation = (id) => {
        navigate(`/post/${id}`)
    };

    useEffect(() => {
        axios.get("http://localhost:3001/posts")
        .then((response) => {
        setListOfPosts(response.data);
        })
        .catch((error) => {
        console.error('Error fetching data:', error);
        });
    }, []);


    return (
        <div>
            { listOfPosts.map((value, key) => {
                return <div key={key} className='post' onClick={() => handleNavigation(value.id)}> 
                <div className='title'> {value.title} </div> 
                <div className='body'> {value.postText} </div>
                <div className='footer'> {value.username} </div>
                </div>
            }) }
        </div>
    )
}

export default Home;
