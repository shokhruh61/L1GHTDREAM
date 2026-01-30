import React from "react";
import { Outlet } from "react-router-dom";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import MiniPlayer from "../components/Player/MiniPlayer";

function MainLayout() {
  return (
    <div className="flex min-h-screen flex-col bg-white">
      <Navbar />
      <main className="flex-1 pb-32">
        <Outlet />
      </main>
      <Footer />
      <MiniPlayer />
    </div>
  );
}

export default MainLayout;
