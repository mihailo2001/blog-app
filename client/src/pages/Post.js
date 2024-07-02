import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom';
import axios from 'axios';

const Post = () => {
    let {id} = useParams();
    const [postObject, setPostObject] = useState({});
    const [comments, setComments] = useState([]);
    const [newComment, setNewComment] = useState("");

    useEffect(() => {
        axios.get(`http://localhost:3001/posts/byId/${id}`)
        .then((response) => {
            setPostObject(response.data);
        });
    }, []);

    useEffect(() => {
      axios.get(`http://localhost:3001/comments/${id}`)
      .then((response) => {
          setComments(response.data);
      });
  }, []);

  const addComment = () => {
    if(newComment != ""){
      axios.post("http://localhost:3001/comments", {commentBody: newComment, PostId: id})
      .then(() => {
        const commentToAdd = {commentBody: newComment};
        setComments([...comments, commentToAdd]);
        setNewComment("");
      })
    }
  }

  return (
    <div className='postPage'>
      <div className='leftSide'>
        <div className='post' id='individual'>
          <div className='title'> {postObject.title} </div>
          <div className='body'> {postObject.postText} </div>
          <div className='footer'> {postObject.username} </div>
        </div>
      </div>
      <div className='rightSide'>
        <div className='addCommentContainer'>
          <input type='text' 
                  placeholder='Comment...' 
                  onChange={(event) => {setNewComment(event.target.value)}} 
                  value={newComment}/>
          <button onClick={addComment}> Add Comment </button>
        </div>
        <div className='listOfComments'>
          {comments.map((comment, key) => {
            return <div key={key} className='comment'> 
              {comment.commentBody} 
            </div>
          })}
        </div>
      </div>
    </div>
  )
}

export default Post
