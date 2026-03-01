import type React from "react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Header: React.FC = () => {

    const navigate = useNavigate();

    const [lastName, setLastName] = useState<string>("");
    const [firstName, setFirstName] = useState<string>("");
    const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);

    useEffect(()=> {
        const userData = localStorage.getItem("user");
        if (userData) {
            const user = JSON.parse(userData);
            setFirstName(user.firstName || "");
            setLastName(user.lastName || "");
            setIsLoggedIn(true);
        }
    }, []);

    const logoutEve = () => {
        localStorage.removeItem("user");
        setIsLoggedIn(false);
        alert("Logged out successfully");
        navigate('/login');
    }

    const userInitial = firstName.charAt(0).toUpperCase() || "U";

    return(
        <div className="bg-[#1C58A6] p-4 shadow-md flex justify-between items-center px-6 md:px-10 mb-8 transition-all">
            <div className="flex items-center gap-3">
                {isLoggedIn ? (
                    <>
                        <div className="w-8 h-8 md:w-10 md:h-10 bg-[#4BBFAA] rounded-full border-2 border-white flex items-center justify-center text-white font-bold shadow-sm">
                            {userInitial}
                        </div>
                        <span className="text-white font-bold text-[10px] md:text-xs tracking-widest uppercase">{firstName} {lastName}</span>
                    </>
                ) : (
                    <span className="text-white font-bold text-[10px] md:text-xs tracking-widest uppercase">Guest User</span>
                )}
            </div>

               {isLoggedIn ?(
                    <button onClick={logoutEve} className="text-black border border-white px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white hover:text-[] transition-all transform active:scale-95 shadow-sm">LOGOUT</button>
                ) : (
                    <button onClick={() => navigate('/login')} className="text-black border border-white px-3 py-1 md:px-5 md:py-1.5 rounded-full text-[10px] md:text-xs font-bold hover:bg-white hover:text-[] transition-all transform active:scale-95 shadow-sm">LOGIN</button>
                )}
        </div>

        
    );
};
export default Header;