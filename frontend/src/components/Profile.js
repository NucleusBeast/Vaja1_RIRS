import { useContext, useEffect, useState } from 'react';
import { UserContext } from '../userContext';
import { Navigate } from 'react-router-dom';

function Profile(){
    const userContext = useContext(UserContext); 
    const [profile, setProfile] = useState({});

    useEffect(function(){
        const getProfile = async function(){
            const res = await fetch("http://localhost:3001/users/profile", {credentials: "include"});
            const data = await res.json();
            setProfile(data);
        }
        getProfile();
    }, []);

    return (
        <>
            {!userContext.user ? <Navigate replace to="/login" /> : ""}
            <div className="container mx-auto px-4 py-5">
                <h1 className="text-3xl font-bold mb-5">User profile</h1>
                <div className="card bg-base-200 text-base-content shadow-lg rounded-lg overflow-hidden p-4">
                    <p className="text-xl font-semibold">Username: {profile.username}</p>
                    <p className="text-xl font-semibold">Email: {profile.email}</p>
                </div>
            </div>
        </>
    );
}

export default Profile;