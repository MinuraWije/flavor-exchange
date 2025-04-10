import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { login } from "../redux/authSlice";

export const Signup = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = () => {
        if (!username) return alert("Username is required");

        const users = JSON.parse(localStorage.getItem("users") || '[]');
        const userExists = users.find((u: string) => u === username);

        if (userExists) return alert("Username is already taken. Choose a different username.");

        const updatedUsers = [...users, username];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        dispatch(login(username));
        navigate("/home");
    }

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-md p-8 bg-white shadow-lg rounded-lg">
                <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Sign Up</h2>

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
                    onClick={handleSignup}
                    className="w-full p-3 bg-blue-500 text-white font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                    Sign Up
                </button>

                <div className="mt-4 text-center text-gray-600">
                    <span>Already a member?</span>
                    <a href="/login" className="text-blue-500 hover:underline ml-1">Login</a>
                </div>
            </div>
        </div>
    );
}

export default Signup;
