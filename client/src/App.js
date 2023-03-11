import Login from "./pages/login/Login"
import Register from "./pages/register/Register";
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom"
import Navbar from "./components/navbar/Navbar"
import LeftBar from "./components/leftbar/LeftBar"
import RightBar from "./components/rightbar/Rightbar"
import Profile from "./pages/profile/Profile";
import Home from "./pages/home/Home";
import "./style.scss"
import { useContext } from "react";
import { AuthContext } from "./context/authContext";
import { QueryClient, QueryClientProvider } from 'react-query'

function App() {

  const { currentUser } = useContext(AuthContext);
  const queryClient = new QueryClient()

  const Layout = () => {
    return (
      <QueryClientProvider client={queryClient}>
        <div className="theme-light">
          <Navbar />
          <div style={{ display: "flex" }}>
            <LeftBar />
            <div style={{ flex: 6 }}>
              <Outlet />
            </div>
            <RightBar />
          </div>
        </div>
      </QueryClientProvider>
    )
  }

  const ProtectRoutes = ({ children }) => {
    if (!currentUser) {
      return <Navigate to="/login" />
    }
    return children
  }

  const router = createBrowserRouter([
    {
      path: "/",
      element: <ProtectRoutes>
        <Layout />
      </ProtectRoutes>,
      children: [
        {
          path: "/",
          element: <Home />
        },
        {
          path: "/profile/:id",
          element: <Profile />
        }
      ]
    },

    {
      path: "/login",
      element: <Login />
    },
    {
      path: "/register",
      element: <Register />,
    },]
  )
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;

