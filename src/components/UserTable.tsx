import React, { useEffect } from "react";
import axios from "axios";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import { MdDeleteForever } from "react-icons/md";
import { MdEditNote } from "react-icons/md";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "./ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTrigger,
} from "./ui/dialog";
import { DialogDescription, DialogTitle } from "@radix-ui/react-dialog";
import UpdateUserForm from "./UpdateUserForm";
import { useToast } from "./ui/use-toast";

export type UserDetails = {
  id: number;
  name: string;
  mobileNo: string;
  emailId: string;
  nationality: string;
  dateOfBirth: string;
  passportNo: string;
  passportExpiryDate: string;
  passport: string;
  photo: string;
};

function UserTable() {
  const [data, setData] = React.useState<UserDetails[]>([]);
  const [open, setOpen] = React.useState(false);
  const { toast } = useToast();

  const handleDelete = async (id: number) => {
    try {
      await axios.delete(`http://localhost:8084/api/users/${id}`);
      setData(data.filter((user) => user.id !== id));
      toast({
        title: "User Delete",
        description: "User Deleted Successfully",
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast({
        variant: "Erorr",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const fetchData = async () => {
    try {
      const resp = await axios.get("http://localhost:8084/api/users/");
      setData(resp.data);
      console.log(data);
    } catch (error) {
      console.log(error);
      toast({
        variant: "Erorr",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  const handleUpdate = async (
    id: number,
    values: { emailId: string; mobileNo: string }
  ) => {
    try {
      await axios.put(`http://localhost:8084/api/users/${id}`, {
        emailId: values.emailId,
        mobileNo: values.mobileNo,
      });
      setOpen(false);
      toast({
        title: "User Update",
        description: "User Updated Successfully",
      });
    } catch (error) {
      console.log(error);
      toast({
        variant: "Erorr",
        title: "Uh oh! Something went wrong.",
        description: "There was a problem with your request.",
      });
    }
  };

  useEffect(() => {
    fetchData();
  }, [open]);

  return (
    <Table>
      <TableCaption>A list of Users.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>ID</TableHead>
          <TableHead>Name</TableHead>
          <TableHead>Nationality</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Email</TableHead>
          <TableHead> Passport No </TableHead>
          <TableHead>Date Of Birth</TableHead>
          <TableHead>Passport Expiry Date</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data.map((Item) => (
          <TableRow key={Item.id}>
            <TableCell>{Item.id}</TableCell>
            <TableCell>{Item.name}</TableCell>
            <TableCell>{Item.nationality}</TableCell>
            <TableCell>{Item.mobileNo}</TableCell>
            <TableCell>{Item.emailId}</TableCell>
            <TableCell>{Item.passportNo}</TableCell>
            <TableCell>{Item.dateOfBirth}</TableCell>
            <TableCell>{Item.passportExpiryDate}</TableCell>
            <TableCell>
              <div className="flex items-center justify-center gap-2">
                <div className="flex items-start justify-center">
                  <Dialog open={open} onOpenChange={setOpen}>
                    <DialogTrigger>
                      <MdEditNote size={24} color="blue" />
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Update User {Item.name}</DialogTitle>
                        <DialogDescription>
                          Update {Item.name}
                        </DialogDescription>
                      </DialogHeader>
                      <div className="grid gap-4 py-4">
                        <UpdateUserForm
                          id={Item.id}
                          userDetails={Item}
                          handleUpdate={handleUpdate}
                        />
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
                <div className="flex items-start justify-center">
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <MdDeleteForever size={24} color="red" />
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>
                          Are you absolutely sure?
                        </AlertDialogTitle>
                        <AlertDialogDescription>
                          This action cannot be undone. This will permanently
                          delete your account and remove your data from our
                          servers.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                        <AlertDialogAction
                          onClick={() => handleDelete(Item.id)}
                        >
                          Continue
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTable;
