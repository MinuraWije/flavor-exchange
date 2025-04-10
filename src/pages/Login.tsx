import {useState } from "react";
import {useDispatch, useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";
import {RootState} from "../redux/store.ts";
import { setCurrentUser } from '../redux/favoritesSlice.ts';

export const Login = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state: RootState) => state.auth.user);

    const handleLogin = () => {
        if (!username) return alert("Username is required");

        const users = JSON.parse(localStorage.getItem("users") || '[]');
        const userExists = users.find((u: string) => u === username);

        if (!userExists) return alert("User not found! Please Sign up");
        console.log(username);
        dispatch(login(username));
        dispatch(setCurrentUser(username));
        navigate("/home");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Login</h2>

                <div className="mb-6">
                    <label htmlFor="username" className="block text-gray-700">Username</label>
                    <input
                        id="username"
                        type="text"
                        placeholder="Enter your username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                <button
                    onClick={handleLogin}
                    className="w-full p-3 bg-green-500 text-white font-semibold rounded-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-500"
                >
                    Login
                </button>

                <div className="mt-4 text-center text-gray-600">
                    <span>Not signed up with us yet?</span>
                    <a href="/signup" className="text-blue-500 hover:underline ml-1">Sign-up</a>
                </div>
            </div>
        </div>
    )
}

export default Login;
