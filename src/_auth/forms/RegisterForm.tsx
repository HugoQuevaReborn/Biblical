import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { useToast } from "@/components/ui/use-toast"
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignUpValidation } from "@/lib/validations/user.validation"
import { createUserAccount, loginUserAccount } from "@/lib/appwrite/api"
import { Link, useNavigate } from "react-router-dom"
import { useUserContext } from "@/context/AuthContext"
import * as z from "zod"

const RegisterForm = () => {

  const { toast } = useToast();
  const { checkAuthUser } = useUserContext();
  const navigate = useNavigate();

  const form = useForm<z.infer<typeof SignUpValidation>>({
    resolver: zodResolver(SignUpValidation),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })
 
  const onSubmit = async (values: z.infer<typeof SignUpValidation>) => {
    //! CHECK IS checkAuthUser() worketh correctly
    const user = await createUserAccount(values);
    
    if (!user)
      return toast({ title: "Error !", description: "User already exists!", className: "border-none bg-red-800 text-white"});

    const session = await loginUserAccount({email: values.email, password: values.password});

    if (!session)
      return toast({ title: "An error occured !", description: "Could not create session!", className: "border-none bg-red-800 text-white"});

    const isLoggedIn = checkAuthUser();

    if (!isLoggedIn)
      return toast({ title: "An error occured !", description: "Could not connect you to created account!", className: "border-none bg-red-800 text-white"});

    navigate("/");
    return toast({ title: "Registered !", description: "Successfully created the account!", className: "border-none bg-green-800 text-white"});
  }

  return (
    <div className="flex flex-col p-10 pb-20 items-center h-full">
      <h1 className="text-white text-5xl max-md:text-4xl font-bold mt-10 max-md:mt-15">Register</h1>
      <p className="text-white mt-3 font-sans font-semibold">Create a new account</p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full space-y-8 flex justify-center flex-col">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Name</FormLabel>
              <FormControl>
                <Input className="text-white bg-opacity-5 backdrop-blur-sm bg-white border-2 border-white border-opacity-20" placeholder="enter your name here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="username"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Username</FormLabel>
              <FormControl>
                <Input className="text-white bg-opacity-5 backdrop-blur-sm bg-white border-2 border-white border-opacity-20" placeholder="enter your username here." {...field} />
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
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input type="email" className="text-white bg-opacity-5 backdrop-blur-sm bg-white border-2 border-white border-opacity-20" placeholder="enter your email here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Password</FormLabel>
              <FormControl>
                <Input type="password" className="bg-opacity-5 backdrop-blur-sm text-white bg-white border-2 border-white border-opacity-20" placeholder="Enter your password" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-opacity-5 backdrop-blur-sm hover:bg-neutral-400 hover:bg-opacity-5 text-white bg-white border-2 border-white border-opacity-20" type="submit">Submit</Button>
      </form>

      <p className="text-white mt-3 font-sans font-semibold flex gap-1 flex-col">
        Already have an account ?
        <Link to="/login" className="w-fit text-white font-sans font-semibold hover:text-indigo-600 duration-100">Login here.</Link>
      </p>
    </Form>

    </div>
  )
}

export default RegisterForm