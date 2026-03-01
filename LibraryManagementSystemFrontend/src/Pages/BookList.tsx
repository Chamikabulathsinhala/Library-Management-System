import React, { useEffect, useState } from "react";
import { bookService } from "../services/bookService";
import type { Book } from "../models/Book";
import { Link, useNavigate } from "react-router-dom";
import Header from "../Components/Header";


const BookList: React.FC = () => {

    const [books, setBooks] = useState<Book[]>([]);
    const [searchItem, setSearchItem] = useState("");
    const navigate = useNavigate();
    useEffect(() => {

        loadBooks();

    }, []);

    const loadBooks = async () => {

        try {
            const response = await bookService.getAllBooks();

            setBooks(response.data);

        } catch (error) {
            console.error("Error Loading books");
        }
    };

    const deleteBooks = async (id: number) => {

        try {
            if (window.confirm("Are you sure you want to delete this book?")) {
                await bookService.deleteBook(id);
                loadBooks();
            }

        } catch (error) {
            console.error("Error deleting book");
        }
    };

    const filteredBooks = books.filter(book => 
        book.title.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()) ||
        book.author.toLocaleLowerCase().includes(searchItem.toLocaleLowerCase()));

    return (
        <div className="min-h-screen bg-gray-50 pd-10">
            <Header />

            <div className="container mx-auto px-4 md:px-6">
                <div className="flex flex-col md:flex-row justify-between items-center gap-4 mb-8">
                <div className="flex items-center gap-4 w-full">
                     <button onClick={()=>{navigate(-1)}} className="text-black hover:text-gray-700 transition-colors">
                        <span className="text-xl">←</span>
                    </button>
                    <h2 className="text-xl md:text-2xl font-black text-[#1C58A6] uppercase tracking-tighter">Library Inventory</h2>
                </div>

                <div className="relative w-full md:max-w-xs">
                    <input 
                        type="text" 
                        placeholder="Search by Title or Author..." 
                        className="w-full pl-10 pr-4 py-2 rounded-xl border border-gray-300 focus:ring-2 focus:ring-[#1C58A6] outline-none shadow-sm"
                        value={searchItem}
                        onChange={(e) => setSearchItem(e.target.value)}
                    />
                    
                </div>
            </div>
                <h2 className="text-xl md:text-2xl font-bold md-6 uppercase tracking-wide">Library All Books</h2>

                <div className="bg-gray-300 rounded-xl overflow-hidden shadow-lg border border-gray-400">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse min-w-[600px] md:min-w-full">
                            <thead className="bg-gray-400/50 border-b border-gray-400">
                                <tr>
                                    <th className="p-3 md:p-4 border-gray-400 text-sm md:text-base font-bold">Title</th>
                                    <th className="p-3 md:p-4 border-gray-400 text-sm md:text-base font-bold">Author</th>
                                    <th className="p-3 md:p-4 border-gray-400 text-sm md:text-base font-bold">ISBN</th>
                                    <th className="p-3 md:p-4 border-gray-400 text-sm md:text-base font-bold">Year</th>
                                    <th className="p-3 md:p-4 border-gray-400 text-sm md:text-base font-bold">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredBooks.map(book => (
                                    <tr key={book.id} className="border-b border-gray-400 hover:bg-gray-200 transition-colors">
                                        <td className="p-3 md:p-4 border-r border-gray-400 text-xs md:text-sm font-medium">{book.title}</td>
                                        <td className="p-3 md:p-4 border-r border-gray-400 text-xs md:text-sm">{book.author}</td>
                                        <td className="p-3 md:p-4 border-r border-gray-400 text-xs md:text-sm hidden sm:table-cell">{book.isbn}</td>
                                        <td className="p-3 md:p-4 border-r border-gray-400 text-xs md:text-sm">{book.publicationYear}</td>
                                        <td className="p-3 md:p-4">
                                            <div className="flex flex-col sm:flex-row justify-center items-center gap-2 md:gap-4">
                                                <Link
                                                    to={`/edit/${book.id}`}
                                                    className="w-full sm:w-auto text-center bg-[#6B712E] text-white px-4 md:px-5 py-1 rounded-full text-[10px] md:text-sm font-semibold hover:bg-opacity-80 transition-all"
                                                >
                                                    edit
                                                </Link>
                                                <button
                                                    onClick={() => book.id && deleteBooks(book.id)}
                                                    className="w-full sm:w-auto bg-[#8B312E] text-white px-4 md:px-5 py-1 rounded-full text-[10px] md:text-sm font-semibold hover:bg-opacity-80 transition-all"
                                                >
                                                    Delete
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="mt-8 flex justify-center md:hidden">
                    <Link
                        to={`/add`}
                        className="bg-indigo-900 text-white px-8 py-3 rounded-full font-bold shadow-lg"
                    >+ Add New Book</Link>
                </div>
            </div>




        </div>
    );
};
export default BookList;