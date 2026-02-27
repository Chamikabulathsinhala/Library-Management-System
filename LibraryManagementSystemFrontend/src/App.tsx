import {BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import BookList from './Pages/BookList'
import AddBook from './Pages/AddBook'
import EditBook from './Pages/EditBook'

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path='/' element={<BookList/>}/>
          <Route path='/add' element={<AddBook/>}/>
          <Route path='/edit/:id' element={<EditBook/>}/>
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
