import React, { useState } from "react";
import Navbar from "../Sharedcomponenets/Navbar";
import { Label } from "../ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { Link, Navigate, useNavigate } from "react-router-dom";
import axios from "axios";
import { USER_END_POINT } from "@/lib/Endpoint";
import { toast } from "sonner";
import { setloading } from "@/Redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Eye, EyeOff, Loader2 } from "lucide-react";

const Signup = () => {
  const [showpass, setshowPass] = useState(false);
  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [input, setInput] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
    file: "",
  });

  if (user) {
    return <Navigate to="/" replace />;
  }

  const submitHandler = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("fullname", input.fullname);
    formData.append("email", input.email);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("password", input.password);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setloading(true));

      const response = await axios.post(
        `${USER_END_POINT}/register`,
        formData,
        {
          headers: {
            "content-type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      if (response.status !== "400") {
        toast.success(response.data.message);
        navigate("/login");
      }
    } catch (error) {
      console.log(error);
      if (error) {
        toast.error(error.response.data.message);
      }
    } finally {
      dispatch(setloading(false));
    }
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center justify-center max-w-7xl mx-auto px-4">
        <form
          onSubmit={submitHandler}
          className="w-full sm:w-[90%] md:w-2/3 lg:w-1/2 max-w-md p-6 sm:p-8 my-10 border border-b-gray-200 rounded-md shadow-md"
        >
          <h1 className="text-2xl text-center font-bold mb-5">Sign Up</h1>
          <div className="my-2">
            <Label className="my-2">Fullname</Label>
            <Input
              type="text"
              placeholder="John Doe"
              onChange={(e) => {
                setInput({ ...input, fullname: e.target.value });
              }}
            />
          </div>
          <div className="my-4">
            <Label className="my-2">Email</Label>
            <Input
              type="email"
              placeholder="example@gmail.com"
              autoComplete="email"
              onChange={(e) => {
                setInput({ ...input, email: e.target.value });
              }}
            />
          </div>
          <div className="my-4">
            <Label className="my-2">PhoneNumber</Label>
            <Input
              type="number"
              placeholder="92312456789"
              onChange={(e) => {
                setInput({ ...input, phoneNumber: e.target.value });
              }}
            />
          </div>
          <div className="my-4 relative">
            <Label className="my-2 block">Password</Label>
            <Input
              type={showpass ? "text" : "password"}
              placeholder="xyz123!#"
              autoComplete="new-password"
              className="pr-10"
              onChange={(e) => {
                setInput({ ...input, password: e.target.value });
              }}
            />
            <button
              type="button"
              onClick={() => setshowPass(!showpass)}
              className="absolute  right-3 top-10 transform -translate-y-1/2 text-gray-500 hover:text-black"
            >
              {showpass ? <EyeOff size={20} /> : <Eye size={20} />}
            </button>
          </div>
          <div className="flex flex-col gap-4 sm:flex-row sm:justify-between">
            <RadioGroup defaultValue="option-one">
              <div className="flex items-center space-x-6 my-3">
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="applicant"
                    className="cursor-pointer"
                    onChange={(e) => {
                      setInput({ ...input, role: e.target.value });
                    }}
                  />
                  <Label htmlFor="option-one">Applicant</Label>
                </div>
                <div className="flex items-center space-x-2">
                  <input
                    type="radio"
                    name="role"
                    value="recruiter"
                    className="cursor-pointer"
                    onChange={(e) => {
                      setInput({ ...input, role: e.target.value });
                    }}
                  />
                  <Label htmlFor="option-two">Recruiter</Label>
                </div>
              </div>
            </RadioGroup>

            <div className="flex items-center gap-2">
              <Label>Profile</Label>
              <Input
                accept="image/*"
                type="file"
                className="cursor-pointer"
                onChange={(e) => {
                  setInput({ ...input, file: e.target.files[0] });
                }}
              />
            </div>
          </div>

          <div>
            {loading ? (
              <Button
                disabled={loading}
                type="submit"
                className="cursor-pointer w-full my-5 bg-sky-900 hover:bg-sky-950 font-bold text-md"
              >
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer w-full my-5 bg-sky-900 hover:bg-sky-950 font-bold text-md"
              >
                Signup
              </Button>
            )}
            <Link
              className="text-sm text-sky-700 hover:text-sky-950"
              to="/login"
            >
              Already have an account?
            </Link>
          </div>
        </form>
      </div>
    </>
  );
};

export default Signup;
