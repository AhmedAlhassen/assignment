import * as React from "react";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import UserForm, { FormFiled } from "./UserForm";
import UserTable from "./UserTable";
import axios, { AxiosResponse } from "axios";
import { format } from "date-fns";
import { useToast } from "./ui/use-toast";

function AddUser() {
  const [open, setOpen] = React.useState(false);
  const [key, setKey] = React.useState(0);
  const { toast } = useToast();

  const handleSubmitUser = async (values: FormFiled) => {
    // console.log(`${values.dateOfBirth.getFullYear}/${}`);
    console.log(format(values.dateOfBirth, "yyyy-MM-dd"));
    try {
      const resp = await axios.post("http://localhost:8084/api/users", {
        name: values.name,
        mobileNo: values.mobileNo,
        emailId: values.email,
        nationality: values.nationality,
        dateOfBirth: format(values.dateOfBirth, "yyyy/MM/dd"),
        passportNo: values.passportNo,
        passportExpiryDate: format(values.passportExpiryDate, "yyyy/MM/dd"),
      });
      if (resp.data.id) {
        try {
          const formData = new FormData();
          formData.append("file", values.passport);
          const passport: AxiosResponse = await axios.post(
            `http://localhost:8084/api/users/${resp.data.id}/upload-passport`,
            formData,
            {
              headers: {
                "Content-Type": "multipart/form-data",
              },
            }
          );
          if (passport.status === 200) {
            try {
              const formData = new FormData();
              formData.append("photo", values.photo);
              const photo: AxiosResponse = await axios.post(
                `http://localhost:8084/api/users/${resp.data.id}/upload-photo`,
                formData,
                {
                  headers: {
                    "Content-Type": "multipart/form-data",
                  },
                }
              );
              console.log(photo.status);
              setOpen(false);
              setKey(key + 1);
              toast({
                title: "User Added",
                description: "User Add Successfully",
              });
            } catch (error) {
              console.log(error);

              toast({
                variant: "Erorr",
                title: "Uh oh! Something went wrong.",
                description: "There was a problem with your request.",
              });
            }
          }
        } catch (error) {
          console.log(error);
          toast({
            variant: "Erorr",
            title: "Uh oh! Something went wrong.",
            description: "There was a problem with your request.",
          });
        }
      }
    } catch (e) {
      console.log(e);
      toast({
        variant: "Erorr",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };
  return (
    <>
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogTrigger asChild>
          <Button variant="outline">Add User</Button>
        </DialogTrigger>

        <DialogContent className="overflow-y-scroll max-h-screen">
          <DialogHeader>
            <DialogTitle>Add User</DialogTitle>
            <DialogDescription>Add new User.</DialogDescription>
          </DialogHeader>
          <UserForm handleSubmitUser={handleSubmitUser} />
        </DialogContent>
      </Dialog>
      <UserTable key={key} />
    </>
  );
}

export default AddUser;
