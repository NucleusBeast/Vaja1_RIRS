import {useContext, useState} from 'react';
import {UserContext} from '../userContext';
import {Link, Navigate} from 'react-router-dom';

function Login() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const userContext = useContext(UserContext);

    async function Login(e) {
        e.preventDefault(); // Prevents the default action of the form (page reload)
        const res = await fetch("http://localhost:3001/users/login", {
            method: "POST",
            credentials: "include",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                username: username, password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            userContext.setUserContext(data);
        } else {
            setUsername("");
            setPassword("");
            setError("Invalid username or password");
        }
    }

    return (
        <div className="flex items-start pt-24 justify-center h-screen bg-base-100 text-base-100">
            <div className="w-full max-w-xs">
                <h1 className={'text-neutral text-center text-5xl py-5'}>Login</h1>
                <form onSubmit={Login} className="bg-neutral shadow-md rounded px-8 pt-6 pb-8 mb-4 text-base-100">
                    <div className="mb-4">
                        {userContext.user ? <Navigate replace to="/"/> : ""}
                        <label className="block text-sm font-bold mb-2" htmlFor="username">
                            Username
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username" type="text" placeholder="Username" value={username}
                            onChange={(e) => (setUsername(e.target.value))}/>
                    </div>
                    <div className="mb-6">
                        <label className="block text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
                            id="password" type="password" placeholder="Password" value={password}
                            onChange={(e) => (setPassword(e.target.value))}/>
                        <p className="text-error text-xs italic font-bold">{error}</p>
                    </div>
                    <div className="flex items-center justify-between">
                        <button
                            className="bg-accent hover:bg-info text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                            type="submit">
                            Log in
                        </button>
                        <Link to={'/register'}
                              className="inline-block align-baseline font-bold text-sm text-accent hover:text-info">Register
                            here!</Link>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default Login;