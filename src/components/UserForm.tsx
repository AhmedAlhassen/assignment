import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { PhoneInput } from "react-international-phone";
import "react-international-phone/style.css";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Popover, PopoverTrigger } from "@radix-ui/react-popover";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "./ui/popover";
import { Calendar } from "./ui/calendar";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { countries } from "@/lib/country";

type UserFormProp = {
  handleSubmitUser: (values: z.infer<typeof formSchema>) => void;
};

const formSchema = z.object({
  name: z.string().min(2, {
    message: "name must be at least 2 characters.",
  }),
  nationality: z.string({
    required_error: "Nationality is required",
  }),
  mobileNo: z.string({
    required_error: "Phone number is required",
  }),
  email: z.string().email({
    message: "Please enter valid email",
  }),
  dateOfBirth: z.date({
    required_error: "Please select a date",
  }),
  passportNo: z.string({
    required_error: "Please enter passport number",
  }),
  passportExpiryDate: z.date({
    required_error: "Please select a date",
  }),
  passport: z.instanceof(File),
  photo: z.instanceof(File),
});

export type FormFiled = z.infer<typeof formSchema>;

function UserForm({ handleSubmitUser }: UserFormProp) {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      nationality: "AE",
      dateOfBirth: new Date(),
      email: "",
      mobileNo: "",
      passportExpiryDate: new Date(),
      photo: new File([], ""),
      passport: new File([], ""),
      passportNo: "",
    },
  });
  function onSubmit(values: z.infer<typeof formSchema>) {
    handleSubmitUser(values);
    console.log(values);
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 px-2 ">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Name" {...field} required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Email" {...field} required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="mobileNo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <PhoneInput
                  defaultCountry="ae"
                  forceDialCode
                  inputClassName="w-full"
                  {...field}
                  required
                />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="nationality"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nationality </FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a Country" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {countries.map((country) => (
                    <SelectItem id={country.value} value={country.value}>
                      {country.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="dateOfBirth"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Date of birth </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1900-01-01")
                      }
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportNo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input placeholder="Passport Number" {...field} required />
              </FormControl>

              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passportExpiryDate"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Passport expiry date </FormLabel>
              <FormControl>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "PPP")
                        ) : (
                          <span>Pick a date</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) => date < new Date("1900-01-01")}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </FormControl>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="passport"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  required
                  placeholder="Passport"
                  type="file"
                  accept=".pdf"
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="photo"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  placeholder="Photo"
                  type="file"
                  accept=".jpg, .jpeg, .png"
                  multiple={false}
                  onChange={(e) =>
                    field.onChange(e.target.files ? e.target.files[0] : null)
                  }
                  className="file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <Button variant={"default"} type="submit">
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default UserForm;
