import React, { useEffect, useState } from "react";
import { bookService } from "../services/bookService";
import type { Book } from "../models/Book";
import { Link } from "react-router-dom";


const BookList: React.FC = ()=>{

    const [books, setBooks] =  useState<Book[]>([]);

    useEffect(()=>{

        loadBooks();
        
    },[]);

    

    const loadBooks = async()=>{

        try {
        const response = await bookService.getAllBooks();

        setBooks(response.data);

        }catch(error){
            console.error("Error Loading books");
        }
    }

    const deleteBooks = async(id : number)=>{

        try {
            if(window.confirm("Are you sure you want to delete this book?")){
            await bookService.deleteBook(id);
            loadBooks();
            }
            
        }catch(error){
            console.error("Error deleting book");
        }
    }

    return (
        <div style={{padding: '20px'}}>
           <h2>Library Books</h2>
           <table border={1} style={{width:'100%', textAlign: 'left'}}>
            <thead>
                <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>ISBN</th>
                    <th>Year</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {books.map(book=>(
                    <tr key={book.id}>
                        <td>{book.title}</td>
                        <td>{book.author}</td>
                        <td>{book.isbn}</td>
                        <td>{book.publicationYear}</td>
                        <td>
                            <Link to={`/edit/${book.id}`}>Edit</Link>
                            <button onClick={() => book.id && deleteBooks(book.id)} style={{color:'red'}}>Delete</button>
                        </td>
                    </tr>
                ))}
            </tbody>
           </table>
        </div>
    );
};
export default BookList;