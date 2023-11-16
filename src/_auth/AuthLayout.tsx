import { Outlet, Navigate } from 'react-router-dom';

const AuthLayout = () => {
  const isAuthentificated = false;

  return (
    <>
      {isAuthentificated ? (<Navigate to="/"/>) : (
        <div className="w-full h-full z-0 bg-gradient-to-tr to-primary from-red-950">
          <div className='bg-[url("/assets/background_one.png")] z-10 overflow-hidden flex w-full object-cover h-full'>
            <div className='w-[600px] h-full max-md:w-full max-md:px-10 max-md:py-0 bg-opacity-80 backdrop-blur-md bg-neutral-900 border-r-2 border-opacity-25 border-white'>
              <Outlet/>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default AuthLayout