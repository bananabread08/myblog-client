import { Routes, Route } from 'react-router-dom';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { RecentBlogs } from './pages/RecentBlogs';
import { Blog } from './pages/Blog';
import { Login } from './pages/Login';
import { Profile } from './pages/Profile';
import { Register } from './pages/Register';
function App() {
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="profile" element={<Profile />} />
          <Route path="/recent" element={<RecentBlogs />} />
          <Route path="/blog:id" element={<Blog />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;