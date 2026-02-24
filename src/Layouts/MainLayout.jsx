import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MiniPlayer from "../components/Player/MiniPlayer";

export default function MainLayout() {
  return (
    <div className="relative flex min-h-screen flex-col bg-slate-950 text-white">
      <div className="pointer-events-none fixed inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.16),transparent_40%),radial-gradient(circle_at_90%_80%,rgba(168,85,247,0.18),transparent_35%)]" />
      <Navbar />
      <main className="mx-auto w-full max-w-7xl flex-1 px-4 py-6 sm:px-6 md:py-10">
        <Outlet />
      </main>
      <Footer />
      <MiniPlayer />
    </div>
  );
}