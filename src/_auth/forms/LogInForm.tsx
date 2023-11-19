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
import { SignInValidation } from "@/lib/validations/user.validation"
import { Link } from "react-router-dom"
import * as z from "zod"
import { loginUserAccount } from "@/lib/appwrite/api"

const LogInForm = () => {

  const { toast } = useToast();

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      email: "",
      password: "",
    },
  })
 
  async function onSubmit(values: z.infer<typeof SignInValidation>) {
      const user = await loginUserAccount({
        email: values.email,
        password: values.password,
      });

      if (!user) 
        return toast({ title: "Failed to login !", 
                description: "Creditentials might be wrong.", 
                className: "border-none bg-red-800 text-white"});
        
      return toast({ title: "Logged In !", 
                  description: "Successfully connected to the account!", 
                  className: "border-none bg-green-800 text-white"});
  }

  return (
    <div className="flex flex-col justify-center px-10 items-center w-full h-full py-60">
      <h1 className="text-white text-5xl font-bold mt-10 max-md:mt-15">Log In</h1>
      <p className="text-white mt-3 font-sans font-semibold">Connect to your account</p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full space-y-8 flex flex-col">
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-white">Email</FormLabel>
              <FormControl>
                <Input className="text-white bg-opacity-5 backdrop-blur-sm bg-white border-2 border-white border-opacity-20" placeholder="enter your name here." {...field} />
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
                <Input type="password" className="bg-opacity-5 backdrop-blur-sm text-white bg-white border-2 border-white border-opacity-20" placeholder="enter your password here." {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="bg-opacity-5 backdrop-blur-sm hover:bg-neutral-400 hover:bg-opacity-5 text-white bg-white border-2 border-white border-opacity-20" type="submit">Submit</Button>
        <div className="flex flex-row max-md:flex-col justify-between">
          <Link to="/" className="text-white mt-3 font-sans font-semibold hover:text-indigo-600 duration-100">Forgotten password</Link>
          <p className="text-white mt-3 font-sans font-semibold flex gap-1 flex-col">
            Don't have an account ? 
            <Link to="/register" className="w-fit text-white font-sans font-semibold hover:text-indigo-600 duration-100">Create one.</Link>
          </p>
        </div>
      </form>
    </Form>

    </div>
  )
}

export default LogInForm