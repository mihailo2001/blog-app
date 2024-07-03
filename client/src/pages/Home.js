import React from 'react'
import axios from 'axios';
import { useEffect, useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import { AuthContext } from '../helpers/AuthContext';

function Home() {

    const [listOfPosts, setListOfPosts] = useState([]);
    const [likedPosts, setLikedPosts] = useState([]);
    const { authState } = useContext(AuthContext); 
    let navigate = useNavigate();

    const handleNavigation = (id) => {
        navigate(`/post/${id}`)
    };

    useEffect(() => {
        if(!localStorage.getItem("accessToken")){
            navigate('/login');
        } else {
            axios
            .get("http://localhost:3001/posts", {
                headers: { accessToken: localStorage.getItem("accessToken") },
            })
            .then((response) => {
                setListOfPosts(response.data.listOfPosts);
                setLikedPosts(
                response.data.likedPosts.map((like) => {
                    return like.PostId;
                })
                );
            });
        }
    }, []);

    const likeAPost = (postId) => {
        axios.post(
            "http://localhost:3001/likes", 
            { PostId: postId },
            { headers: { accessToken: localStorage.getItem('accessToken') }}
        ).then((response) => {
            setListOfPosts(
              listOfPosts.map((post) => {
                if(post.id === postId) {
                    if(response.data.liked){
                        return {...post, Likes: [...post.Likes, 0]};
                    } else {
                        const likesArray = [...post.Likes];
                        likesArray.pop();
                        return {...post, Likes: likesArray};                       
                    }
                } else {
                    return post;
                }
            }));
            if (likedPosts.includes(postId)) {
                setLikedPosts(
                    likedPosts.filter((id) => {
                        return id != postId;
                    })
                );
            } else {
                setLikedPosts([...likedPosts, postId]);
            }
        });
    }

    return (
        <div>
            { listOfPosts.map((value, key) => {
                return <div key={key} className='post'> 
                <div className='title'> {value.title} </div> 
                <div className='body' onClick={() => handleNavigation(value.id)}> {value.postText} </div>
                <div className='footer'> 
                    <div className='username'>
                        {value.username} 
                    </div>
                    <div className='buttons'>
                        {likedPosts.includes(value.id) ?
                            <ThumbUpAltIcon onClick={() => { likeAPost(value.id) }}/>
                        :
                            <ThumbUpOffAltIcon onClick={() => { likeAPost(value.id) }}/>
                        }
                        <label>{value.Likes.length}</label>
                    </div>
                </div>
                </div>
            }) }
        </div>
    )
}

export default Home;
