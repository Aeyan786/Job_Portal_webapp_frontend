import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "./ui/dialog";
import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Loader2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_END_POINT } from "@/lib/Endpoint";
import axios from "axios";
import { toast } from "sonner";
import { setUser } from "@/Redux/authSlice";

const UpdateProfilePopup = ({ open, setOpen }) => {
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const [updatedData, setUpdatedData] = useState({
    fullname: user?.fullname || "",
    email: user?.email || "",
    phoneNumber: user?.phoneNumber || "",
    bio: user?.profile?.bio || "",
    skills: user?.profile?.skills.map((e) => e) || "",
    file: user?.profile?.resume || "",
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullname", updatedData.fullname);
    formData.append("email", updatedData.email);
    formData.append("phoneNumber", updatedData.phoneNumber);
    formData.append("bio", updatedData.bio);
    formData.append("skills", updatedData.skills);
    if (updatedData.file) {
      formData.append("file", updatedData.file);
    }

    try {
      setLoading(true);

      const response = await axios.post(
        `${USER_END_POINT}/profile/update`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );

      if (response.status !== "400") {
        toast.success(response.data.message);
        dispatch(setUser(response.data.updatedUser));
        setOpen(false);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  return (
    <div>
      <Dialog open={open}>
        <DialogContent
          className="sm:max-w-[425px] "
          onInteractOutside={() => {
            setOpen(false);
          }}
        >
          <DialogHeader>
            <DialogTitle className="font-medium text-center">
              Update Profile
            </DialogTitle>
            <DialogDescription className="font-sm text-center">
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleSubmit}>
            <div>
              <div className="flex gap-2 my-2 justify-between">
                <Label>Name:</Label>
                <Input
                  name="name"
                  value={updatedData.fullname}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      fullname: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-3 my-2 justify-between">
                <Label>Email:</Label>
                <Input
                  name="email"
                  value={updatedData.email}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      email: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 my-2 justify-between">
                <Label>Phone:</Label>
                <Input
                  name="phone"
                  value={updatedData.phoneNumber}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      phoneNumber: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-6 my- justify-between">
                <Label>Bio:</Label>
                <Input
                  name="bio"
                  value={updatedData.bio || ""}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      bio: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-3 my-2 justify-between">
                <Label>Skills:</Label>
                <Input
                  name="skills"
                  placeholder="seperate by ( comma )"
                  value={updatedData.skills}
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      skills: e.target.value,
                    });
                  }}
                />
              </div>
              <div className="flex gap-2 my-2 justify-between">
                <Label>Resume:</Label>
                <Input
                  name="file"
                  type="file"
                  onChange={(e) => {
                    setUpdatedData({
                      ...updatedData,
                      file: e.target.files[0],
                    });
                  }}
                  accept="application/pdf"
                />
              </div>
            </div>
            <DialogFooter>
              {loading ? (
                <Button
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
                  Save
                </Button>
              )}
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default UpdateProfilePopup;
