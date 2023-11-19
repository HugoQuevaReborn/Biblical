import { Routes, Route } from 'react-router-dom';
import { Home } from './_root/pages';
import LogInForm from './_auth/forms/LogInForm';
import RegisterForm from './_auth/forms/RegisterForm';
import AuthLayout from './_auth/AuthLayout';
import RootLayout from './_root/RootLayout';

/*Styling*/
import './globals.css'
import { Toaster } from './components/ui/toaster';

const App = () => {
    return (
        <main className="flex h-screen">
            <Routes>
                {/*Public routes*/}
                <Route element={<AuthLayout/>}>
                    <Route path="/login" element={<LogInForm/>} />
                    <Route path="/register" element={<RegisterForm/>}/>
                </Route>

                {/*Private routes*/}
                <Route element={<RootLayout/>}>
                    <Route index element={<Home/>}  />
                </Route>
            </Routes>

            <Toaster/>
        </main>
    )
}

export default App;