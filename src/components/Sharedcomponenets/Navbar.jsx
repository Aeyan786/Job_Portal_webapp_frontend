import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { LogOut, Menu, User2, X } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { USER_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";

const Navbar = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const logoutHandler = async () => {
    try {
      const response = await axios.get(`${USER_END_POINT}/logout`, {
        withCredentials: true,
      });
      if (response.status !== "400") {
        dispatch(setUser(null));
        navigate("/");
        toast.success(response.data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };

  return (
    <div className="bg-white  w-full z-50">
      <div className="flex items-center justify-between px-4 md:px-8 max-w-7xl mx-auto h-16">
        <div>
          <Link to="/" className="text-2xl font-bold text-sky-950">
            Job<span className="text-sky-700">Site</span>
          </Link>
        </div>

        <div className="md:hidden">
          <button className="cursor-pointer" onClick={toggleMobileMenu}>
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        <div className="hidden md:flex items-center gap-6">
          <ul className="flex gap-5 font-medium items-center">
            {user && user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies">Companies</Link></li>
                <li><Link to="/admin/jobs">Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/jobs">Jobs</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="flex gap-2">
              <Button variant="outline" className="border-sky-700">
                <Link to="/login">Login</Link>
              </Button>
              <Button className="bg-sky-700 text-white hover:bg-sky-950">
                <Link to="/signup">Signup</Link>
              </Button>
            </div>
          ) : (
            <Popover>
              <PopoverTrigger>
                <Avatar className="cursor-pointer">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                  />
                </Avatar>
              </PopoverTrigger>
              <PopoverContent>
                <div className="flex gap-3">
                  <Avatar>
                    <AvatarImage
                      src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                    />
                  </Avatar>
                  <div>
                    <h4 className="font-medium capitalize">{user?.fullname}</h4>
                    <p className="text-sm text-muted-foreground">{user?.profile?.bio}</p>
                  </div>
                </div>
                <div className="flex-col text-gray-600 my-2">
                  {user?.role === "applicant" && (
                    <div className="w-fit flex items-center">
                      <User2 />
                      <Button variant="link">
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    </div>
                  )}
                  <div className="w-fit flex items-center">
                    <LogOut />
                    <Button onClick={logoutHandler} variant="link">
                      <Link>LogOut</Link>
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>
          )}
        </div>
      </div>

      {isMobileMenuOpen && (
        <div className="md:hidden px-4 pt-2 pb-4 bg-white shadow-md">
          <ul className="flex flex-col gap-3 font-medium">
            {user && user?.role === "recruiter" ? (
              <>
                <li><Link to="/admin/companies" onClick={toggleMobileMenu}>Companies</Link></li>
                <li><Link to="/admin/jobs" onClick={toggleMobileMenu}>Jobs</Link></li>
              </>
            ) : (
              <>
                <li><Link to="/" onClick={toggleMobileMenu}>Home</Link></li>
                <li><Link to="/jobs" onClick={toggleMobileMenu}>Jobs</Link></li>
              </>
            )}
          </ul>

          {!user ? (
            <div className="mt-4 flex flex-col gap-2">
              <Button variant="outline" className="border-sky-700">
                <Link to="/login" onClick={toggleMobileMenu}>Login</Link>
              </Button>
              <Button className="bg-sky-700 text-white hover:bg-sky-950">
                <Link to="/signup" onClick={toggleMobileMenu}>Signup</Link>
              </Button>
            </div>
          ) : (
            <div className="mt-4 space-y-2">
              <div className="flex items-center gap-2">
                <Avatar className="h-8 w-8">
                  <AvatarImage
                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                  />
                </Avatar>
                <div>
                  <p className="font-medium capitalize">{user?.fullname}</p>
                  <p className="text-xs text-muted-foreground">{user?.profile?.bio}</p>
                </div>
              </div>
              {user?.role === "applicant" && (
                <Button variant="outline" className="w-full justify-start cursor-pointer">
                  <Link to="/profile" onClick={toggleMobileMenu}>View Profile</Link>
                </Button>
              )}
              <Button
                onClick={() => {
                  logoutHandler();
                  toggleMobileMenu();
                }}
                variant="outline"
                className="w-full justify-start cursor-pointer"
              >
                LogOut
              </Button>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Navbar;
