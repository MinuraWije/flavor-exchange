import {Routes, Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home'
import { RootState } from './redux/store'
import {useDispatch, useSelector} from 'react-redux'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Layout from "./components/Layout.tsx";
import RecipePage from './pages/RecipePage.tsx'
import FavoritesPage from "./pages/FavoritesPage.tsx";
import MyRecipesPage from "./pages/MyRecipesPage.tsx";
import {useEffect} from "react";
import {loadUserFavorites} from "./redux/favoritesSlice.ts";

function App() {
    const dispatch = useDispatch();

    useEffect(() => {
        const savedUser = localStorage.getItem("currentUser");
        if (savedUser) {
            dispatch(loadUserFavorites(savedUser));
        }
    }, []);

    const user = useSelector((state: RootState) => state.auth.user)

    return (
        <>

            <div className="p-4">
                <Routes>
                    <Route path="/" element={<Navigate to={user ? "/home" : "/login"} />} />

                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/home" />} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/home" />} />

                    {user && (
                        <Route element={<Layout />}>
                            <Route path="/home" element={<Home />} />

                            <Route path="/favorites" element={<FavoritesPage />} />

                            <Route path="/my-recipes" element={<MyRecipesPage />} />


                            <Route path="/recipe/:id" element={<RecipePage />} />


                        </Route>
                    )}
                </Routes>
            </div>
        </>

  )
}

export default App

