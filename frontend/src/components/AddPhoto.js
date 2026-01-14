import {useContext, useState} from 'react'
import {Navigate} from 'react-router';
import {UserContext} from '../userContext';

function AddPhoto(props) {
    const userContext = useContext(UserContext);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [file, setFile] = useState('');
    const [uploaded, setUploaded] = useState(false);

    async function onSubmit(e) {
        e.preventDefault();

        if (!name) {
            alert("Vnesite ime!");
            return;
        }

        const formData = new FormData();
        formData.append('name', name);
        formData.append('image', file);
        formData.append('description', description);
        await fetch('http://localhost:3001/photos', {
            method: 'POST',
            body: formData,
            credentials: 'include'
        });

        setUploaded(true);
    }

    return (
        <div>
            <h1 className="text-4xl text-center text-neutral py-5">Publish a photo</h1>
            <form className="bg-neutral shadow-md rounded px-8 pt-6 pb-8 mb-4 text-neutral w-1/2 mx-auto p-25 mt-20"
                  onSubmit={onSubmit}>
                {!userContext.user ? <Navigate replace to="/login"/> : ""}
                {uploaded ? <Navigate replace to="/"/> : ""}
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="description">
                        Ime slike
                    </label>
                    <input type="text"
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                           id="name" placeholder="Ime slike" value={name} onChange={(e) => {
                        setName(e.target.value)
                    }}/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="description">
                        Opis
                    </label>
                    <input type="text"
                           className="shadow appearance-none border rounded w-full py-2 px-3 leading-tight focus:outline-none focus:shadow-outline"
                           id="description" placeholder="Opis" value={description} onChange={(e) => {
                        setDescription(e.target.value)
                    }}/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="file">
                        Izberi sliko
                    </label>
                    <input type="file"
                           className="file-input file-input-bordered file-input-warning hover:file-input-secondary file-input-sm text-black w-full max-w-md"
                           id="file" onChange={(e) => {
                        setFile(e.target.files[0])
                    }}/>
                </div>
                <div className="flex items-center justify-between">
                    <input
                        className="bg-info hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        type="submit" name="submit" value="Naloži"/>
                </div>
            </form>
        </div>
    )
}

export default AddPhoto;