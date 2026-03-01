import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import type { Book } from "../models/Book";
import { bookService } from "../services/bookService";
import toast from "react-hot-toast";

const EditBook: React.FC = () => {

    const { id } = useParams<{ id: string }>();

    const navigate = useNavigate();

    const [book, setBook] = useState<Book | null>(null);

    useEffect(() => {
        if (id) {
            loadBook(parseInt(id));
        }
    }, [id]);

    const loadBook = async (bookId: number) => {

        try {
            const bookResponse = await bookService.getBookById(bookId);
            setBook(bookResponse.data);
        } catch (error) {
            console.error("Error loading book:", error);
            toast.error("Failed to load book details. Please try again later.");
            navigate('/books');
        }

    }

    const updateFromEvent = async (e: React.SubmitEvent) => {

        e.preventDefault();

        if (!book?.title.trim()) {
            toast.error("Please enter a title");
            return;
        } else if (!book?.author.trim()) {
            toast.error("Please enter an author");
            return;
        } else if (!book?.isbn.trim()) {
            toast.error("Please enter an ISBN");
            return;
        } else if (book.publicationYear < 1000 || book.publicationYear > new Date().getFullYear()) {
            toast.error("Please enter a valid publication year (1000 - current year)");
            return;
        } else if (!book?.description.trim()) {
            toast.error("Please enter a description");
            return;
        }
        if (book && id) {
            const loadingToast = toast.loading("Updating book details...");
            try {
                await bookService.updateBook(parseInt(id), book);
                toast.success("Book updated successfully!", { id: loadingToast });
                navigate('/books');
            } catch (error: any) {
                console.error("Error updating book:", error);
                const errorMsg = error.response?.data?.errors
                    ? Object.values(error.response.data.errors)[0] as string
                    : "Error updating book. Please check your data.";
                toast.error(errorMsg, { id: loadingToast });
            }
        }
    };
    if (!book) {
        return <div>Loading...</div>;
    }
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans">

            <div className="bg-slate-500 p-4 shadow-md flex justify-between items-center px-6 md:px-10">
                <div className="flex items-center gap-4">
                    <button onClick={() => { navigate(-1) }} className="text-white hover:text-gray-300 transition-colors">
                        <span className="text-xl">←</span>
                    </button>
                    <span className="text-white font-bold text-xs tracking-widest uppercase italic">Edit Mode</span>
                </div>
            </div>

            <div className="flex-grow flex items-center  justify-center p-4 md:p-10">
                <div className="bg-white w-full max-w-lg rounded-3xl shadow-2xl p-6 md:p-10 border-t-8 border-yellow-500">
                    <h2 className="text:2xl md:text-3xl font-extrabold text-gray-800 md-8 text-center uppercase tracking-tighter ">Edit Book</h2>

                    <form onSubmit={updateFromEvent}>
                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-2 uppercase">Title</label>
                            <input type="text" value={book.title} onChange={e => setBook({ ...book, title: e.target.value })} className="w-full p-4 mt-1 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none" />
                        </div>


                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-2 uppercase">Author</label>
                            <input type="text" value={book.author} onChange={e => setBook({ ...book, author: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none " />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-2 uppercase">ISBN</label>
                            <input type="text" value={book.isbn} onChange={e => setBook({ ...book, isbn: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none " />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-2 uppercase">Publication Year</label>
                            <input type="year" value={book.publicationYear} onChange={e => setBook({ ...book, publicationYear: parseInt(e.target.value) || 0 })} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none " />
                        </div>

                        <div>
                            <label className="text-xs font-bold text-gray-500 ml-2 uppercase">Description</label>
                            <textarea value={book.description} onChange={e => setBook({ ...book, description: e.target.value })} className="w-full p-4 bg-gray-50 rounded-xl border border-gray-200 focus:ring-2 focus:ring-yellow-500 outline-none resize-none " rows={3}></textarea>
                        </div>

                        <button type="submit" className="w-full py-4 rounded-xl font-bold bg-yellow-500 text-white hover:bg-yellow-600 shadow-lg transition-all transform active:scale-95 ">Update Changes</button>
                    </form>
                </div>
            </div>


        </div>
    );
};
export default EditBook;