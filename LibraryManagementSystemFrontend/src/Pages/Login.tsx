import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import toast from "react-hot-toast";

const Login: React.FC = () => {

    const navigate = useNavigate();

    const [credential, setCredential] = useState({ email: "", password: "" });

    const loginEve = async (e: React.SubmitEvent) => {
        e.preventDefault();
        if (!credential.email.trim() || !credential.password.trim()) {
            toast.error("Please enter both email and password");
            return;
        }
        const loadingToast = toast.loading("Signing in...");
        try {
            const response = await userService.login(credential);
            localStorage.setItem("user", JSON.stringify(response.data));
            toast.success(`Welcome back, ${response.data.firstName}!`, { id: loadingToast });
            navigate('/');
        } catch (error: any) {
            if (error.response?.status === 401) {
                toast.error("Invalid credentials. Please try again.", { id: loadingToast });
            } else {
                toast.error("Login failed. Check your network.", { id: loadingToast });
            }
        }
    }

    return (
        <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#1C58A6]">
                <div className="p-8 md:p-10">
                    <div className="flex justify-center md-6">
                    </div>
                    <h2 className="text-2xl font-black text-[#1C58A6] text-center uppercase tracking-tighter mb-2">Welcome Back</h2>
                    <p className="text-gray-400 text-center text-xs font-bold uppercase mb-8">Login to your account</p>

                    <form onSubmit={loginEve} className="space-y-5">
                        <div>
                            <input type="email" placeholder="Email Address"  className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e) => setCredential({ ...credential, email: e.target.value })}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e) => setCredential({ ...credential, password: e.target.value })}></input>
                        </div>

                        <button type="submit" className="w-full py-4 bg-[#1C58A6] text-white rounded-xl font-bold hover:bg-[#164684] shadow-lg transition-all transform active:scale-95 uppercase tracking-widest" >Sign In</button>
                    </form>

                    <div className="mat-8 text-center text-sm">
                        <span className="text-gray-500">Don't have an account?</span>
                        <Link to="/register" className="text-[#1C58A6] font-bold hover:underline">Register Now</Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Login