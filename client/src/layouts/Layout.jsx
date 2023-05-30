import { Outlet } from "react-router-dom";
import Hero from "../components/hero/Hero";
import Footer from "../components/footer/Footer";

const Layout = () => {
  return (
    <>
      <Hero />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  );
};

export default Layout;
