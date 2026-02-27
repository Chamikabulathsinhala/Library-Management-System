import axios from "axios";
import type { Book } from "../models/Book";

const API_URL = 'http://localhost:5089/api/Book';

export const bookService = {

    getAllBooks : () => axios.get<Book[]>(API_URL),
    getBookById : (id : number) => axios.get<Book>(`${API_URL}/${id}`),
    createBook : (book : Book) => axios.post<Book>(API_URL, book),
    updateBook : (id : number, book : Book) => axios.put<Book>(`${API_URL}/${id}`, book),
    deleteBook : (id: number)=> axios.delete(`${API_URL}/${id}`)
};