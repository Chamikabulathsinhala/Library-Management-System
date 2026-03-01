import type React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { userService } from "../services/userService";
import type { User } from "../models/User";
import toast from "react-hot-toast";

const Register: React.FC =() =>{
  const navigate = useNavigate();

  const [user, setUser] = useState<User>({firstName: "", lastName: "", email: "", password: ""});

  const registerEve = async (e: React.SubmitEvent) => {
    e.preventDefault();
    
    if (!user.firstName.trim()) {
      toast.error("Please enter your first name");
      return;
    } else if (!user.lastName.trim()) {
      toast.error("Please enter your last name");
      return;
    } else if (!user.email.trim()) {
      toast.error("Please enter your email address");
      return;
    } else if (!user.password.trim()) {
      toast.error("Please enter a password");
      return;
    }

    const loadingToast = toast.loading("Registering account...");
    try {
      await userService.register(user);
      toast.success("User registered successfully!", { id: loadingToast });
      navigate('/login');
    } catch (error: any) {
      console.error("Error registering user:", error);
      const errorMsg = error.response?.data?.errors 
        ? Object.values(error.response.data.errors)[0] as string 
        : "Registration failed. Please try again.";
      toast.error(errorMsg, { id: loadingToast });
    }
  };

  return(
    <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center p-6">
            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl overflow-hidden border-t-8 border-[#1C58A6]">
                <div className="p-8 md:p-10">
              
                        <h2 className="text-2xl font-black text-[#1C58A6] text-center uppercase tracking-tighter mb-2">Create Account</h2>
                        <p className="text-gray-400 text-center text-xs font-bold uppercase mb-8">Join The Library System</p>
          

                    <form onSubmit={registerEve} className="space-y-4">
                        <div>
                            <input type="text" placeholder="First Name" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e)=> setUser({...user, firstName: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="text" placeholder="Last Name" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e)=> setUser({...user, lastName: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="email" placeholder="Email Address" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e)=> setUser({...user, email: e.target.value})}></input>
                        </div>
                        <div>
                            <input type="password" placeholder="Password" className="w-full p-4 bg-gray-50 rounded-xl border border-gray-100 focus:ring-0 outline-none transition-all" onChange={(e)=> setUser({...user, password: e.target.value})}></input>
                        </div>

                        <button type="submit" className="w-full py-4 bg-[#1C58A6] text-white rounded-xl font-bold hover:bg-[#164684] shadow-lg transition-all transform active:scale-95 uppercase tracking-widest" >Register Account</button>
                    </form>

                    <div className="mat-8 text-center text-sm text-gray-500 font-medium">
                       Already have an account?
                        <Link to="/login" className="text-[#1C58A6] font-bold hover:underline">Login</Link>
                    </div>
                </div>
            </div>
        </div>
  );
}
export default Register;