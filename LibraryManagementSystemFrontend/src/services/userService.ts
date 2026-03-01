import axios from "axios";
import type { User } from "../models/User";

const API_URL = 'http://localhost:5089/api/User';

export const userService = {

    register: (userData: User) => axios.post(API_URL + '/register', userData),
    login: (credentials: Partial<User>) => axios.post(API_URL + '/login', credentials),
    getUserCount: () => axios.get<number>(API_URL + '/count'),
};