import { useAuth } from "../Context/AuthContext";

const Layout = () => {
  const { token } = useAuth();

  if (!token) return null; // 🔥 hides entire portal

  return (
    <div className="app-layout">
      <Sidebar />
      <Outlet />
    </div>
  );
};