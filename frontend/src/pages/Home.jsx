import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import Products from "./Products";

export default function Home() {
  return (
    <>
      <div className="bg-blend-lighten">
        <Navbar />
        <Products />
        <Footer />
      </div>
    </>
  );
}
