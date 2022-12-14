import React from 'react'

export const Login = () => {
  return (
    <section>
      <div className=" flex flex-wrap justify-center mt-20">
        <div className="w-full max-w-sm">
          <form className=" shadow-md bg-white rounded px-8 py-6 flex flex-col gap-3">
            <h1 className="text-2xl">Welcome Back!</h1>
            <div>
              <label htmlFor="username">Username</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="text"
                name="username"
                placeholder="your_username"
              />
            </div>

            <div>
              <label htmlFor="password">Password</label>
              <input
                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none"
                type="password"
                name="password"
                placeholder="*******"
              />
            </div>
            <button
              className=" bg-orange-400 py-2 rounded text-white text-xl hover:bg-orange-600"
              type="submit"
            >
              Log In
            </button>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Login
