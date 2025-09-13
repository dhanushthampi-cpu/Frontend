// src/layouts/Layout.js
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";

export default function Layout() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar stays on all pages */}
      <Navbar />

      {/* Page content will render here */}
      <main className="flex-grow p-4">
        <Outlet />
      </main>
    </div>
  );
}
