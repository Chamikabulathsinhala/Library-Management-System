import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "../services/bookService";

const AddBook: React.FC = ()=>{

    const navigate = useNavigate();

    const [book , setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear : 0,
        isAvailable : true,
        description: ''
    });

    const submitFormEve = async(e: React.SubmitEvent)=>{
       e.preventDefault();
       try{
        await bookService.createBook(book);
        alert("Book added successfully");
        navigate('/');
       }catch(error){
        console.error("Error creating book");
       }
    }

    return (
        <div style={{padding: '20px'}}>
            <h2>Add New Book</h2>
            <form onSubmit={submitFormEve}>
                <div><input type="text" placeholder="Title" value={book.title} onChange={(e) => setBook({...book, title: e.target.value})} required/></div>
                <div><input type="text" placeholder="Author" value={book.author} onChange={(e) => setBook({...book, author: e.target.value})} required/></div>
                <div><input type="text" placeholder="ISBN" value={book.isbn} onChange={(e) => setBook({...book, isbn: e.target.value})} required/></div>
                <div><input type="text" placeholder="Publication Year" value={book.publicationYear} onChange={(e) => setBook({...book, publicationYear: parseInt(e.target.value) || 0})} required/></div>
                <div><input type="text" placeholder="Description" value={book.description} onChange={(e) => setBook({...book, description: e.target.value})} required/></div>
                <button type="submit" style={{backgroundColor:'green', color:'white'}}>Add Book</button>
            </form>
        </div>
    );

};
export default AddBook;