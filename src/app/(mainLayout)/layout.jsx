import Footer from "@/components/Footer";
import Navbar from "@/components/Navbar";


export default function RootLayout({ children }) {
  return (
    <div>
        <Navbar></Navbar>
                <div className="bg-[#0C0C14] text-white ">
                {children}

                </div>
        
                <Footer></Footer>
    </div>
  );
}
