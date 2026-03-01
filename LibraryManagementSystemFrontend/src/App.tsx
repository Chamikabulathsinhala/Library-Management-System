import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BookList from './Pages/BookList'
import AddBook from './Pages/AddBook'
import EditBook from './Pages/EditBook'
import Home from './Pages/Home'
import Login from './Pages/Login'
import Register from './Pages/Register'
import ProtectedRoute from './Components/ProtectedRoute'
import { Toaster } from 'react-hot-toast'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Toaster position="top-right" reverseOrder={false} />
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/login' element={<Login/>}/>
          <Route path='/register' element={<Register/>}/>


          <Route path="/add" element={
            <ProtectedRoute>
              <AddBook/>
            </ProtectedRoute>
          }
          />
          <Route path="/books" element={
            <ProtectedRoute>
              <BookList/>
            </ProtectedRoute>
          }
          />
          <Route path="/edit/:id" element={
            <ProtectedRoute>
              <EditBook/>
            </ProtectedRoute>
          }
          />

        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
