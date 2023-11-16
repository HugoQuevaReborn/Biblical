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
import { Input } from "@/components/ui/input"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { SignInValidation } from "@/lib/validations/user.validation"
import * as z from "zod"
import { Link } from "react-router-dom"

const LogInForm = () => {

  const form = useForm<z.infer<typeof SignInValidation>>({
    resolver: zodResolver(SignInValidation),
    defaultValues: {
      name: "",
      password: "",
    },
  })
 
  function onSubmit(values: z.infer<typeof SignInValidation>) {
    console.log(values)
  }

  return (
    <div className="flex flex-col justify-center px-10 items-center w-full h-full py-60">
      <h1 className="text-white text-5xl font-bold mt-10 max-md:mt-15">Log in</h1>
      <p className="text-white mt-3 font-sans font-semibold">Connect to your account</p>

      <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full h-full space-y-8 flex flex-col">
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