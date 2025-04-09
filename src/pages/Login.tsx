import {useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice";

export const Login = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogin = () => {
        if(!username) return alert("Username is required");

        const users = JSON.parse(localStorage.getItem("users") || '[]');
        const userExists = users.find((u:string) => u === username);

        if (!userExists) return alert("User not found! Please Sign up");

        dispatch(login(username));
        navigate("/");
    }

    return (
        <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <h2 className="text-xl font-bold">Login</h2>
            <input
                className="border p-2 rounded"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={handleLogin} className="bg-green-500 text-white px-4 py-2 rounded">
                Login
            </button>
        </div>
    )
}

export default Login;