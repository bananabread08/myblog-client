import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { useEffect, useState } from 'react';
import { BaseButton } from '../components/BaseButton';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../store';
import { useLoginMutation } from '../slice/usersApiSlice';
import { setCredentials } from '../slice/authSlice';
import { errorCheck } from '../helpers/errorCheck';
import { notify } from '../helpers/notify';
import { apiSlice } from '../slice/apiSlice';

type LoginInput = {
  email: string;
  password: string;
};

export const Login = () => {
  const { register, handleSubmit, reset } = useForm<LoginInput>();
  const [passwordShow, setPasswordShow] = useState(false);
  const [login, { error, isLoading }] = useLoginMutation();
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate('/');
    }
  }, [navigate, user]);

  const handleLogin = async (data: LoginInput) => {
    try {
      const res = await login(data).unwrap();
      dispatch(setCredentials({ ...res }));
      // invalidate stale Blog list cache
      dispatch(apiSlice.util.invalidateTags([{ type: 'Blog', id: 'LIST' }]));
      notify({ type: 'success', message: 'Logged in!' });
      reset();
      navigate('/');
    } catch (err) {
      console.log(errorCheck(err));
    }
  };

  return (
    <div className="flex items-center justify-center grow">
      <div className="w-full sm:w-96 mx-4 rounded-lg border-4 border-b-8 border-r-8 border-slate-800 bg-white shadow-2xl shadow-black">
        <h1 className="mb-2 text-3xl font-bold text-center uppercase p-2 border-b-4 border-slate-800 bg-green-400">
          Login
        </h1>
        <form onSubmit={handleSubmit(handleLogin)} className="p-4">
          <div>
            <label htmlFor="email" className="uppercase text-slate-500">
              Email
            </label>
            <input
              type="email"
              id="email"
              placeholder="your@email.com"
              className="w-full my-2 py-1 px-3 border border-slate-600 rounded-lg shadow-md shadow-violet-300 focus:outline-none focus:ring focus:ring-violet-300 transition duration-300"
              {...register('email')}
            />
          </div>

          <div className="relative mt-2">
            <label htmlFor="password" className="uppercase text-slate-500">
              Password
            </label>
            <input
              type={passwordShow ? 'text' : 'password'}
              id="password"
              placeholder="********"
              className="w-full my-2 py-1 px-3 border border-slate-600 rounded-lg shadow-md shadow-violet-300 focus:outline-none focus:ring focus:ring-violet-300 transition duration-300"
              {...register('password')}
            />
            <button
              className="absolute right-5 bottom-5"
              type="button"
              onClick={() => setPasswordShow(!passwordShow)}
            >
              {passwordShow ? <EyeIcon size={20} /> : <EyeOffIcon size={20} />}
            </button>
          </div>
          <BaseButton
            type="submit"
            className="w-full mt-2 py-1 uppercase font-bold bg-accent border-accent hover:text-accent hover:bg-cleanWhite"
            isLoading={isLoading}
          >
            {isLoading ? 'Loading...' : 'Login'}
          </BaseButton>
          {error && (
            <p className="text-red-500 bg-red-200 mt-2 text-center rounded-lg">
              {errorCheck(error)}
            </p>
          )}
        </form>
        <div className="text-center py-2 text-gray-600 bg-gray-300 w-full">
          Don't have an account yet?
          <Link
            to="/register"
            className="underline text-black hover:text-green-500 ml-1"
          >
            Register now!
          </Link>
        </div>
      </div>
    </div>
  );
};
