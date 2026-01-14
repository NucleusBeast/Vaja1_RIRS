import {useContext, useEffect, useState, useCallback} from 'react';
import {UserContext} from '../userContext';
import {Navigate, useParams} from 'react-router-dom';
import Photo from "./Photo";
import Comment from "./Thread/Comment";

function PhotoThread(props) {
    const userContext = useContext(UserContext);
    const photoId = useParams().id; // get id from url

    const [photo, setPhoto] = useState({});
    const [isLoading, setIsLoading] = useState(true); // Add this line
    const [comments, setComments] = useState([]);
    const [comment, setNewComment] = useState('');
    const [likes, setLikes] = useState(photo.likes);

    const getComments = useCallback(async function () {
        const res = await fetch("http://localhost:3001/comments/" + photoId, {credentials: "include"});
        const data = await res.json();
        setComments(data);
    }, [photoId]);


    useEffect(function () {
        const getPhoto = async function () {
            setIsLoading(true); // Set loading to true when the fetch starts
            const res = await fetch("http://localhost:3001/photos/" + photoId, {credentials: "include"});
            const data = await res.json();
            setPhoto(data);
            setLikes(data.likes);
            setIsLoading(false); // Set loading to false when the fetch is done
        }
        getPhoto();
        getComments();
    }, [photoId, getComments]);

    const handleCommentChange = (event) => {
        setNewComment(event.target.value);
    }

    async function handleCommentSubmit(event) {
        event.preventDefault();
        // publish form data
        await fetch('http://localhost:3001/comments/', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                content: comment, thread: photoId, likes: 1
            })
        });

        getComments();
    }

    async function like(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:3001/photos/like', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                photoId: photoId
            })
        });

        const data = await res.json();
        console.log(data);
        setLikes(data.likes)
    }

    async function dislike(event) {
        event.preventDefault();
        const res = await fetch('http://localhost:3001/photos/dislike', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                photoId: photoId
            })
        });

        const data = await res.json();
        setLikes(data.likes)
        console.log(data);
    }

    return (<>
        {!userContext.user ? <Navigate replace to="/login"/> : ""}
        {isLoading ? <div className="flex items-center justify-center h-screen">
            <span className="loading loading-dots loading-bg"></span>
        </div> : <div className="flex flex-col justify-center items-center bg-gray-100 p-4 rounded-lg shadow-md">
            <Photo photo={photo} setup={"card-img w-full h-100 object-contain object-center"}/>
            <h2 className="text-2xl font-bold mt-4">{photo.name}</h2>
            <p className="text-gray-600">{photo.description}</p>
            <p className="text-gray-500">Posted
                by {photo.postedBy.username} on {new Date(photo.postedOn).toLocaleDateString()}</p>
            <p className="text-gray-500">Likes: {likes}</p>
            <div className="flex justify-center w-full mt-2">
                <button className="btn btn-ghost hover:bg-accent btn-circle" onClick={like}>
                    <i className="material-icons">thumb_up</i>
                </button>
                <button className="btn btn-ghost hover:bg-accent btn-circle ml-2" onClick={dislike}>
                    <i className="material-icons">thumb_down</i>
                </button>
            </div>
            <form onSubmit={handleCommentSubmit} className="mt-4 w-full">
                <div className="flex items-center">
        <textarea
            className="form-textarea h-11 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-600"
            placeholder="Add a comment..."
            value={comment}
            onChange={handleCommentChange}
        />
                    <button type="submit" className="btn btn-info ml-2 h-10">Submit</button>
                </div>
            </form>
            <div className="mt-4 w-full">
                {comments.map((comment, index) => (
                    <Comment comment={comment} key={index}/>
                ))}
            </div>
        </div>}
    </>);
}

export default PhotoThread;