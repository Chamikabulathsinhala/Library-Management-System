import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { bookService } from "../services/bookService";
import toast from "react-hot-toast";

const AddBook: React.FC = () => {

    const navigate = useNavigate();

    const [book, setBook] = useState({
        title: '',
        author: '',
        isbn: '',
        publicationYear: 2026,
        isAvailable: true,
        description: ''
    });

    const submitFormEve = async (e: React.SubmitEvent) => {
        e.preventDefault();

        if (!book.title.trim()) {
            toast.error("Please enter the book title");
            return;
        } else if (!book.author.trim()) {
            toast.error("Please enter the book author");
            return;
        } else if (!book.isbn.trim()) {
            toast.error("Please enter the book ISBN");
            return;
        }else if (book.publicationYear < 1000 || book.publicationYear > new Date().getFullYear()) {
            toast.error("Please enter a valid publication year (1000 - current year)");
            return;
        }if (!book.description.trim()) {
            toast.error("Please enter the book description");
            return;
        }
        const loadingToast = toast.loading("Adding book...");
        
        try {
            await bookService.createBook(book);
            toast.success("Book added successfully", { id: loadingToast });
            navigate('/');
        } catch (error: any) {
            console.error("Error adding book:", error);


            if (error.response && error.response.data && error.response.data.errors) {

                const errorMessages = Object.values(error.response.data.errors);
                const firstError = (errorMessages[0] as string[])[0] || "Validation failed";
                toast.error(`Failed: ${firstError}`, { id: loadingToast });
            }
            else if (error.response && error.response.data) {

                toast.error(error.response.data || "Error adding book", { id: loadingToast });
            }
            else {
                toast.error("Failed to add book. Please try again later.", { id: loadingToast });
            }

        }
    }

    return (
        <div className="min-h-screen bg-gray-50 flexf flex-col">

            <div className="bg-slate-500 p-4 shadow-md flex justify-between items-center px-6 md:px-6 border-rounded">
                <div className="flex items-center gap-4">
                    <button onClick={() => { navigate(-1) }} className="text-white hover:text-gray-300 transition-colors">
                        <span className="text-xl">←</span>
                    </button>

                    <span className="text-white font-bold text-xs tracking-widest uppercase">Add New Entry</span>
                </div>

            </div>

            <div className="flex-grow flex items-center justify-center p-4 md:p-10">
                <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-10 border border-gray-100">
                    <h2 className="text-2xl md:text-3xl font-extrabold text-indigo-900 md-8 text-center uppercase tracking-tighter">Add New Book</h2>

                    <form onSubmit={submitFormEve} className="space-y-5">
                        <input type="text" placeholder="Title" className="w-full p-4 bg-gray-400 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={book.title} onChange={(e) => setBook({ ...book, title: e.target.value })} />
                        <input type="text" placeholder="Author" className="w-full p-4 bg-gray-400 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={book.author} onChange={(e) => setBook({ ...book, author: e.target.value })} />
                        <input type="text" placeholder="ISBN (978-2-14-451212-0)" className="w-full p-4 bg-gray-400 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={book.isbn} onChange={(e) => setBook({ ...book, isbn: e.target.value })} />
                        <input type="year" placeholder="Year" className="w-full p-4 bg-gray-400 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all" value={book.publicationYear} onChange={(e) => setBook({ ...book, publicationYear: parseInt(e.target.value) || 0 })} />
                        <textarea placeholder="Description" rows={3} className="w-full p-4 bg-gray-400 rounded-xl border-none focus:ring-2 focus:ring-indigo-500 outline-none transition-all resize-none" value={book.description} onChange={(e) => setBook({ ...book, description: e.target.value })} />
                        <div className="flex gap-4 pt-4 flex-col md:flex-row">
                            <button type="button" onClick={() => navigate('/')} className="flex-1 py-4 rounded-xl font-bold bg-gray-200 text-gray-700 hover:bg-gray-300 transition-all">Cancel</button>
                            <button type="submit" className="flex-[2] py-4 rounded-xl font-bold bg-indigo-900 text-white hover:bg-indigo-950 shadow-lg transition-all transform active:scale-95">Add Book</button>
                        </div>

                    </form>
                </div>
            </div>


        </div>
    );

};
export default AddBook;