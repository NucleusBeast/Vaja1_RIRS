import {Link} from "react-router-dom";
import Photo from "./Photo";

function PhotoCard(props) {
    return (
        <div>
            <div className="card w-96 bg-base-100 shadow-xl card-bordered">
                <Link to={"/photo/" + props.photo._id} className="card-image">
                    <Photo photo={props.photo} setup={"card-img w-full h-64 object-contain object-center"}/>
                    <div className="card-body">
                        <h2 className="card-title">
                            {props.photo.name}
                            <div className="badge badge-secondary">NEW</div>
                        </h2>
                        <p>{props.photo.description}</p>
                        <div className="card-actions justify-end">
                            <div className="badge badge-outline">Author : {props.photo.postedBy.username}</div>
                            {/*<div className="badge badge-outline">Products</div>*/}
                        </div>
                    </div>
                </Link>
            </div>
        </div>
    );
}

export default PhotoCard;