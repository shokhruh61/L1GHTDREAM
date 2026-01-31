import React from "react";
import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import MiniPlayer from "../components/Player/MiniPlayer";

export default function MainLayout() {
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
