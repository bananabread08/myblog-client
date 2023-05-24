import { NavLink } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store';
import { useLogoutMutation } from '../slice/usersApiSlice';
import { logout } from '../slice/authSlice';
import { notify } from '../helpers/notify';
export const Header = () => {
  const { user } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const [logoutMutation] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutMutation(null).unwrap();
      dispatch(logout());
      notify({ type: 'success', message: 'Logged out!' });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="bg-primary sticky top-0">
      <header className="flex justify-between p-4 max-w-5xl mx-auto">
        <a href="" className="flex items-center gap-1">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="2em"
            height="2em"
            viewBox="0 0 256 256"
          >
            <path
              fill="#F06A35"
              d="M29.251 254.992c-4.79-1.262-8.924-3.12-12.737-5.722c-3.218-2.197-7.922-6.739-9.711-9.376c-2.185-3.222-4.696-8.738-5.72-12.564c-1.044-3.903-1.06-5.457-1.08-99.134c-.018-93.203.003-95.253 1.026-99.258C4.648 14.773 15.853 3.996 30.305.78C34.46-.144 220.08-.305 224.562.61c12.135 2.483 21.673 9.78 27.192 20.805c4.388 8.765 3.996-.88 4.197 103.185c.128 66.212.01 94.01-.412 97.473c-1.976 16.205-13.134 28.775-29.19 32.882c-4.108 1.05-5.537 1.066-98.789 1.037c-90.164-.027-94.794-.074-98.309-1Z"
            ></path>
            <path
              fill="#FFF"
              d="M164.338 206.474c11.47-1.564 20.458-6.162 28.89-14.776c6.1-6.232 9.918-12.977 12.414-21.93c1.036-3.719 1.123-5.53 1.313-27.365c.144-16.481.024-24.2-.405-26.148c-.622-2.825-2.385-5.448-4.397-6.541c-.62-.337-4.586-.766-8.815-.953c-7.087-.315-7.88-.453-10.116-1.764c-3.548-2.08-4.525-4.324-4.535-10.42c-.019-11.647-4.866-22.46-14.442-32.22c-6.823-6.952-14.434-11.658-23.12-14.295c-2.08-.632-6.737-.847-22.333-1.03c-24.472-.29-29.904.212-38.236 3.53c-15.36 6.118-26.395 19.011-30.421 35.541c-.756 3.105-.903 8.08-1.082 36.663c-.223 35.808.023 41.066 2.26 48.162c1.85 5.863 3.715 9.456 7.557 14.555c7.32 9.715 18.29 16.73 29.258 18.712c5.22.943 69.615 1.179 76.21.28Z"
            ></path>
            <path
              fill="#F06A35"
              d="M162.317 150.441c4.233 3.953 3.34 10.99-1.761 13.88l-5.243.853l-30.939.358c-20.86.195-27.128-.216-28.409-.724l-.04-.017c-2.518-1.097-4.862-4.143-5.267-6.845c-.386-2.573.908-6.11 2.89-7.905l.441-.384c1.954-1.605 4.202-1.893 22.635-1.958l21.317-.022c21.549.016 21.738.301 24.376 2.764ZM131.944 92.09c3.286 1.66 4.714 4 4.714 7.727c0 3.236-1.24 5.54-3.994 7.398l-.534.341c-1.34.8-2.654.939-13.041 1.02l-6.703.038c-8.309.017-14.705-.157-15.727-.439c-5.864-1.616-8.055-10.029-3.745-14.38l.401-.398c2.307-2.235 3.775-2.466 17.292-2.487l10.186.008c8.608.04 9.295.235 11.151 1.172Z"
            ></path>
          </svg>
          <span className="font-bold text-xl hidden md:block text-cleanWhite">
            muni-muni
          </span>
        </a>
        <div className="flex items-center gap-2 text-cleanWhite">
          <NavLink
            to="/"
            className={({ isActive, isPending }) => {
              return (
                (isPending
                  ? 'text-gray-400'
                  : isActive
                  ? 'underline underline-offset-4 decoration-wavy decoration-2'
                  : '') + ' hover:text-accent'
              );
            }}
          >
            Home
          </NavLink>
          {user ? (
            <>
              <NavLink
                to="/profile"
                className={({ isActive, isPending }) => {
                  return (
                    (isPending
                      ? 'text-gray-400'
                      : isActive
                      ? 'underline underline-offset-4 decoration-wavy decoration-2'
                      : '') + ' hover:text-accent'
                  );
                }}
              >
                Profile
              </NavLink>
              <button
                onClick={handleLogout}
                className="bg-blue-200 px-2 text-black rounded-lg hover:bg-accent"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <NavLink
                to="/login"
                className={({ isActive, isPending }) => {
                  return (
                    (isPending
                      ? 'text-gray-400'
                      : isActive
                      ? 'underline underline-offset-4 decoration-wavy decoration-2'
                      : '') + ' hover:text-accent'
                  );
                }}
              >
                Login
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive, isPending }) => {
                  return (
                    (isPending
                      ? 'text-gray-400'
                      : isActive
                      ? 'underline underline-offset-4 decoration-wavy decoration-2'
                      : '') + ' hover:text-accent'
                  );
                }}
              >
                Register
              </NavLink>
            </>
          )}
        </div>
      </header>
      <hr className="max-w-5xl mx-auto"></hr>
    </div>
  );
};
