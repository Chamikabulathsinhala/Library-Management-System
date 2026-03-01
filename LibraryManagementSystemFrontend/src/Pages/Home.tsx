import type React from "react";
import { useNavigate } from "react-router-dom";
import Header from "../Components/Header";
import { useEffect, useState } from "react";
import { bookService } from "../services/bookService";
import { userService } from "../services/userService";
import type { Book } from "../models/Book";

const Home: React.FC = () => {
    const navigate = useNavigate();
    const [bookCount, setBookCount] = useState<number>(0);
    const [userCount, setUserCount] = useState<number>(0);
    const [books, setBooks] = useState<Book[]>([]);
    const [viewAllBooks, setViewAllBooks] = useState<boolean>(false);

    useEffect(() => {
        const loadCounts = async () => {
            try {
                const booksRes = await bookService.getAllBooks();
                setBooks(booksRes.data);
                setBookCount(booksRes.data.length);

                const usersRes = await userService.getUserCount();
                setUserCount(usersRes.data);

            } catch (error) {
                console.error("Error Fetching Counts")
            }
        };
        loadCounts();
    }, []);

    const userNavigate = (path: string)=>{
        const user  = localStorage.getItem("user");
        if(!user){
           alert("Please login to access this page");
           navigate('/login');
        } else {
            navigate(path);
        }
    };

    const displayedBooks = viewAllBooks ? books : books.slice(-3).reverse();
    return (
        <div className="min-h-screen bg-gray-50 flex flex-col font-sans overflow-x-hidden">
            <Header />

            <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-10 flex flex-col gap-8 pb-10 lg:pt-14">

                <section className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8 justify-items-center">
                    <div className="bg-slate-400 w-full max-w-md h-28 sm:h-32 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                        <span className="text-3xl sm:text-4xl font-bold">{bookCount}</span>
                        <span className="text-xs sm:text-sm font-medium mt-1 uppercase tracking-tight">All Books</span>
                    </div>
                    <div className="bg-slate-400 w-full max-w-md h-28 sm:h-32 rounded-2xl shadow-lg flex flex-col items-center justify-center text-white">
                        <span className="text-3xl md:text-4xl font-bold">{userCount}</span>
                        <span className="text-xs md:text-sm font-medium mt-1 uppercase tracking-tight ">All Users</span>
                    </div>
                </section>
            

            <section className="mt-2">
                <div className="flex justify-between items-center mb-6">
                    <h3 className="text-xl font-black text-gray-800 uppercase tracking-tight">Recently Added Books</h3>
                    <button onClick={() => setViewAllBooks(!viewAllBooks)} className="text-[#1C58A6] text-sm font-bold hover:underline">
                        {viewAllBooks ? "Show Less" : "View All Collection"}
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {displayedBooks.map((book) => (
                        <div key={book.id} className="bg-white p-6 rounded-3xl shadow-lg border border-gray-100 flex flex-col gap-3 transition-transform hover:-translate-y-2">
                            <div className="flex justify-between items-start">
                                <span className="bg-blue-50 text-[#1C58A6] text-[10px] font-bold px-3 py-1 rounded-full uppercase italic">
                                    {book.isbn}
                                </span>
                                <span className="text-gray-400 text-xs font-bold">{book.publicationYear}</span>
                            </div>
                            <h4 className="text-lg font-bold text-gray-800 leading-tight uppercase">{book.title}</h4>
                            <p className="text-[#4BBFAA] text-xs font-bold uppercase tracking-wide">By {book.author}</p>

                            <div className="mt-2 text-gray-500 text-xs leading-relaxed line-clamp-3 italic">
                                {book.description}
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            <div className="h-8 sm:h-10" />

            <section className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 justify-items-center lg:pt-14">
                <button onClick={()=> userNavigate('/add')} className="w-full max-w-xl bg-indigo-900 hover:bg-indigo-950 text-white py-7 md:py-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">📚</span>
                    <span className="text-lg md:text-2xl font-bold tracking-tight">Add Books</span>
                </button>
                <button onClick={() => userNavigate('/books')} className="w-full max-w-xl bg-indigo-900 hover:bg-indigo-950 text-white py-7 md:py-8 rounded-2xl transition-all active:scale-95 flex items-center justify-center">
                    <span className="text-3xl md:text-4xl">🔍</span>
                    <span className="text-lg md:text-2xl font-bold tracking-tight">View & Edit All Books</span>
                </button>
            </section>
            </div>
        </div>
    );
}

export default Home;