import {Link} from "react-router-dom";

function Photo(props) {
    return (
        <>
            <figure>
                <img className={props.setup} src={"http://localhost:3001/" + props.photo.path} alt={props.photo.name}/>
            </figure>
        </>
    );
}

export default Photo;