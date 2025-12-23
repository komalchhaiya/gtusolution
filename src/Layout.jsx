import Footer from "./Footer";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import Navbar from "./Navbar";

function Layout() {
  return (
    <div className="layout-container">
     <Header/>
     <Navbar/>
      <main className="main-content">
        <Outlet />
      </main>

<Footer/>    </div>
  );
}

export default Layout;
