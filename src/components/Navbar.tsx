import {useDispatch, useSelector} from "react-redux";
import {RootState} from '../redux/store.ts'
import {logout} from "../redux/authSlice.ts";
import {Navigate, useNavigate} from "react-router-dom";


const Navbar = () => {
    const user = useSelector((state: RootState) => state.auth.user)
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const handleLogout = () => {
        dispatch(logout());
        navigate("/login");
    };

    return (
        <div className="flex justify-between items-center p-4 bg-gray-800 shadow-md rounded-b-lg">
            <h1 className="text-2xl font-bold text-gray-300">Flavour Exchange</h1>
            <div className="flex items-center gap-3">
                {user ? (
                    <>
                        <button
                            onClick={() => navigate('/home')}
                            className="rounded-md bg-gray-900 px-3 py-2 text-sm font-medium text-white" aria-current="page"
                        >
                            Home
                        </button>

                        <button
                            onClick={() => navigate('/favorites')}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            Favorites
                        </button>

                        <button
                            onClick={() => navigate('/my-recipes')}
                            className="rounded-md px-3 py-2 text-sm font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
                        >
                            My Recipes
                        </button>

                        <button onClick={handleLogout} className="px-3 py-1 rounded-lg text-red-500 hover:text-white hover:bg-red-500 transition duration-200">
                            Logout
                        </button>
                    </>
                ) : (
                    <>
                        <Navigate to="/login" />
                    </>
                )}
            </div>
        </div>
    )
}

export default Navbar;