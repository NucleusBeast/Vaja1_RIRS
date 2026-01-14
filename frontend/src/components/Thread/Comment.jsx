import {useEffect, useState} from 'react';

function Comment(props) {
    const [commentUser, setCommentUser] = useState({});
    const [likes, setLikes] = useState(props.comment.likes);
    const [hasLiked, setHasLiked] = useState(false);

    useEffect(() => {
        const getUser = async function () {
            const res = await fetch("http://localhost:3001/users/" + props.comment.author, {credentials: "include"});
            const data = await res.json();
            setCommentUser(data);
        }
        getUser();
    }, [props.comment.author]);

    async function like(event) {
        event.preventDefault();
        setHasLiked(true);
        const res = await fetch('http://localhost:3001/comments/like', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commentId: props.comment._id
            })
        });

        const data = await res.json();
        console.log(data);
        setLikes(data.likes)
    }

    async function dislike(event) {
        event.preventDefault();
        setHasLiked(true);
        const res = await fetch('http://localhost:3001/comments/dislike', {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                commentId: props.comment._id
            })
        });

        const data = await res.json();
        setLikes(data.likes)
        console.log(data);
    }

    return (
        <div key={props} className="bg-white p-4 rounded-lg shadow-md mb-2">
            <div className="flex justify-between">
                <div className="flex flex-col">
                    <p className={"text-neutral/50 text-sm"}>Author: {commentUser.username}</p>
                    <p className={"text-neutral/50 text-sm"}>Published: {new Date(props.comment.postedOn).toLocaleDateString()}: {new Date(props.comment.postedOn).toLocaleTimeString()}</p>
                    <p className="text-lg font-medium leading-relaxed underline">{props.comment.content}</p>
                </div>
                <div className="flex flex-col items-center">
                    <div className="flex items-center mb-2">
                        <i className="material-icons text-accent mr-2">favorite</i>
                        <span className="font-bold text-lg">{likes}</span>
                    </div>
                    <div className="flex">
                        {!hasLiked && (<>
                                <button className="btn btn-ghost hover:bg-accent btn-circle" onClick={like}>
                                    <i className="material-icons">thumb_up</i>
                                </button>
                                <button className="btn btn-ghost hover:bg-accent btn-circle ml-2" onClick={dislike}>
                                    <i className="material-icons">thumb_down</i>
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Comment;