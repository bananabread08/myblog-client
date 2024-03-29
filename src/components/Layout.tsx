import { Header } from './Header';
import { Outlet } from 'react-router-dom';
export const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen font-inter leading-loose">
      <Header />
      <Outlet />
    </div>
  );
};
