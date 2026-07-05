import Sidebar from "../components/Sidebar";
import Navbar from "../components/Navbar";

function MainLayout({ children }) {
    return (
        <div className="min-h-screen bg-gradient-to-br from-[#2f171b] via-[#3d2025] to-[#2f171b]">
            <Sidebar />

            <div className="ml-72 flex-1">
                <Navbar />
                <main className="px-6 py-6 lg:px-8 lg:py-8">
                    <div className="mx-auto max-w-7xl space-y-5">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}

export default MainLayout