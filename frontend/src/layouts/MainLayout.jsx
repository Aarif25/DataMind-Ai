import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    return(
        <div className ="flex">

            <Sidebar />

            <div className="flex-1 ml-64">

                <Navbar />
                <main className="p-8 bg-gray-50 min-h-screen">
                    {children}
                </main>
            </div>

            
        </div>
    )
}

export default MainLayout