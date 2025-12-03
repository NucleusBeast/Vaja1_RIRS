import {useState} from 'react';

function Register() {
    const [username, setUsername] = useState([]);
    const [password, setPassword] = useState([]);
    const [email, setEmail] = useState([]);
    const [error, setError] = useState([]);

    async function Register(e) {
        e.preventDefault();
        const res = await fetch("http://localhost:3001/users", {
            method: 'POST',
            credentials: 'include',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                email: email,
                username: username,
                password: password
            })
        });
        const data = await res.json();
        if (data._id !== undefined) {
            window.location.href = "/";
        } else {
            setUsername("");
            setPassword("");
            setEmail("");
            setError("Registration failed");
        }
    }

    return (
        <div>
            <h1 className="text-4xl text-center text-neutral py-10">Register</h1>
            <form onSubmit={Register}
                  className="bg-neutral shadow-md rounded px-8 pt-6 pb-8 mb-4 text-base-100 w-1/2 mx-auto p-25 mt-5">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="email">
                        Email
                    </label>
                    <input type="text" name="email" placeholder="Email" value={email}
                           onChange={(e) => (setEmail(e.target.value))}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2" htmlFor="username">
                        Username
                    </label>
                    <input type="text" name="username" placeholder="Username" value={username}
                           onChange={(e) => (setUsername(e.target.value))}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="mb-6">
                    <label className="block text-sm font-bold mb-2" htmlFor="password">
                        Password
                    </label>
                    <input type="password" name="password" placeholder="Password" value={password}
                           onChange={(e) => (setPassword(e.target.value))}
                           className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
                </div>
                <div className="flex items-center justify-between">
                    <input type="submit" name="submit" value="Register"
                           className="bg-accent hover:bg-info text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"/>
                    <p className="text-red-500 text-xs italic">{error}</p>
                </div>
            </form>
        </div>
    );
}

export default Register;