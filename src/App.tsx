import {Routes, Route, Navigate} from 'react-router-dom'
import { Home } from './pages/Home'
import { RootState } from './redux/store'
import { useSelector } from 'react-redux'
import Login from './pages/Login'
import Signup from './pages/Signup'
import Navbar from "./components/Navbar.tsx";

function App() {
    const user = useSelector((state: RootState) => state.auth.user)
    return (
        <>
            <Navbar/>
            <div className="p-4">
                <Routes>
                    <Route path="/login" element={!user ? <Login /> : <Navigate to="/" />} />
                    <Route path="/signup" element={!user ? <Signup /> : <Navigate to="/" />} />

                    {/*<Route path="/" element={<Home />}/>
                <Route path="/recipe/:id" element={<RecipeDetails />}/>
                <Route path="/add" element={<AddRecipe />}/>
                <Route path="/login" element={<Login />}/>
                <Route path="/signup" element={<Signup />}/>*/}
                </Routes>
            </div>
        </>

  )
}

export default App

/*const App = () => {
    return (
        <div className="p-10 bg-red-500 text-white text-2xl font-bold">
            🚀 Tailwind is working!
        </div>
    );
};

export default App;*/
