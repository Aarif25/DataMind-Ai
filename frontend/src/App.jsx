import { BrowserRouter, Routes, Route } from "react-router-dom";

import Dashboard from "./pages/Dashboard";
import Upload from "./pages/Upload";
import Summary from "./pages/Summary";
import Cleaning from "./pages/Cleaning";
import Training from "./pages/Training";
import ModelExport from "./pages/ModelExport";
import PCA from "./pages/PCA";
import Report from "./pages/Report";
import Settings from "./pages/Settings";

import MainLayout from "./layouts/MainLayout";

function App() {

    return (

        <BrowserRouter>

            <MainLayout>

                <Routes>

                    <Route path="/" element={<Dashboard />} />

                    <Route path="/upload" element={<Upload />} />

                    <Route path="/summary" element={<Summary />} />

                    <Route path="/clean" element={<Cleaning />} />

                    <Route path="/train" element={<Training />} />

                    <Route path="/export" element={<ModelExport />} />

                    <Route path="/pca" element={<PCA />} />

                    <Route path="/report" element={<Report />} />

                    <Route path="/settings" element={<Settings />} />

                </Routes>

            </MainLayout>

        </BrowserRouter>

    )

}

export default App;