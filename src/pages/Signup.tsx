import {useState} from "react";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import {login} from "../redux/authSlice";

export const Signup = () => {
    const [username, setUsername] = useState('');
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleSignup = () => {
        if(!username) return alert("Username is required");

        const users = JSON.parse(localStorage.getItem("users") || '[]');
        const userExists = users.find((u:string) => u === username);

        if (userExists) return alert("Username is already taken. Choose a different username.");

        const updatedUsers = [...users, username];
        localStorage.setItem("users", JSON.stringify(updatedUsers));

        dispatch(login(username));
        navigate("/");
    }

    return (
        <div className="flex flex-col gap-4 max-w-sm mx-auto mt-10">
            <h2 className="text-xl font-bold">Sign-up</h2>
            <input
                className="border p-2 rounded"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
            />

            <button onClick={handleSignup} className="bg-blue-500 text-white px-4 py-2 rounded">
                Sign up
            </button>
        </div>
    )
}

export default Signup;