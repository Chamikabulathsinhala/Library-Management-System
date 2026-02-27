import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Book } from "../models/Book";
import { bookService } from "../services/bookService";

const EditBook: React.FC = ()=>{

    const {id} = useParams<{id : string}>();

    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(()=>{
        if(id){
            loadBook(parseInt(id));
        }
    },[id]);

    const loadBook = async(bookId : number)=>{

        try{
          const bookResponse = await bookService.getBookById(bookId);
            setBook(bookResponse.data);
        }catch(error){
            console.error("Error loading book:");
        }

    }

    const updateFromEvent = async(e: React.SubmitEvent) =>{

        e.preventDefault();
        if(book && id){
            try{
                await bookService.updateBook(parseInt(id), book);
                alert("Book updated successfully");
                navigate('/');
            }catch(error){
                console.error("Error updating book");
            }
        }
    };
    if(!book){
        return <div>Loading...</div>;
    }
    return (
        <div style={{padding: '20px'}}>
            <h2>Edit Book</h2>
            <form onSubmit={updateFromEvent}>
                <div><input type="text" value={book.title} onChange={e =>setBook({...book, title: e.target.value})} required/></div>
                <div><input type="text" value={book.author} onChange={e =>setBook({...book, author: e.target.value})} required/></div>
                <div><input type="text" value={book.isbn} onChange={e =>setBook({...book, isbn: e.target.value})} required/></div>
                <div><input type="number" value={book.publicationYear} onChange={e =>setBook({...book, publicationYear: parseInt(e.target.value) || 0})} required/></div>
                <div><input type="text" value={book.description} onChange={e =>setBook({...book, description: e.target.value})} required/></div>
                <button type="submit" style={{backgroundColor: 'yellow', color: 'white'}}>Update Book</button>
            </form>
        </div>
    );
};
export default EditBook;