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
        <div className="flex justify-between p-4 bg-gray-100">
            <h1 className="text-xl font-bold">Flavour Exchange</h1>
            <div className="flex items-center gap-4">
                {user ? (
                    <>
                        <button onClick={() => navigate('/home')} className="text-blue-500 underline">
                            Home
                        </button>

                        <button onClick={() => navigate('/favorites')} className="text-blue-500 underline">
                            Favorites
                        </button>

                        <button onClick={() => navigate('/my-recipes')} className="text-blue-500 underline">
                            My Recipes
                        </button>

                        <button onClick={handleLogout} className="text-red-500 underline">
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