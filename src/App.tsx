import './App.css'
import {Routes, Route} from 'react-router-dom'

function App() {
  return (
      <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="/recipe/:id" element={<RecipeDetails />}/>
          <Route path="/add" element={<AddRecipe />}/>
          <Route path="/login" element={<Login />}/>
          <Route path="/signup" element={<Signup />}/>
      </Routes>
  )
}

export default App
