import {useState, useEffect} from 'react';
import PhotoCard from './PhotoCard';

function Photos() {
    const [photos, setPhotos] = useState([]);
    useEffect(function () {
        const getPhotos = async function () {
            const res = await fetch("http://localhost:3001/photos");
            const data = await res.json();
            setPhotos(data);
        }
        getPhotos().then(r => _ => _);
    }, []);

    return (
        <>
            <div className="container mx-auto px-4 py-5">
                <h3 className="text-2xl font-bold mb-5">Photos:</h3>
                <div className="grid grid-cols-3 gap-4">
                    {photos.map(photo => (<PhotoCard photo={photo} key={photo._id}></PhotoCard>))}
                </div>
            </div>
        </>
    )
        ;
}

export default Photos;