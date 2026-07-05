"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { FiMenu, FiX } from "react-icons/fi";

export default function Navbar() {
  const [user, setUser] =useState<any>(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
    window.location.href = "/";
  };

  return (
    <nav className="sticky top-0 z-50 bg-white shadow-sm border-b">
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
          href="/"
          className="flex items-center gap-3"
        >
          <img
            src="/logo.png"
            alt="CampusReuseHub"
            className="h-12 md:h-16 w-auto"
          />

          <span className="font-black text-xl md:text-3xl text-green-700">
            CampusReuseHub
          </span>
        </Link>

        {/* Desktop Menu */}

        <div className="hidden md:flex items-center gap-6">

          <a href="/" className="hover:text-green-700">
            Home
          </a>

          <a href="/#about" className="hover:text-green-700">
            About
          </a>

          <Link
            href="/upload"
            className="bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800"
          >
            + Sell Item
          </Link>

          {user && (
            <Link href="/my-listings">
              My Listings
            </Link>
          )}

          {!user ? (
            <>
              <Link href="/login">Login</Link>

              <Link
                href="/signup"
                className="bg-green-700 text-white px-5 py-2 rounded-xl"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <>
              <button
                onClick={handleLogout}
                className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-red-600"
              >
                Logout
              </button>
            </>
          )}
        </div>

        {/* Mobile Button */}

        <button
          className="md:hidden text-3xl"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <FiX /> : <FiMenu />}
        </button>

      </div>

      {/* Mobile Menu */}

      {menuOpen && (
        <div className="md:hidden border-t bg-white px-6 py-5 space-y-4">

          <a
            href="/"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            Home
          </a>

          <a
            href="/#about"
            onClick={() => setMenuOpen(false)}
            className="block"
          >
            About
          </a>

          <Link
            href="/upload"
            onClick={() => setMenuOpen(false)}
            className="block bg-green-700 text-white px-4 py-3 rounded-xl text-center"
          >
            + Sell Item
          </Link>

          {user && (
            <Link
              href="/my-listings"
              onClick={() => setMenuOpen(false)}
              className="block"
            >
              My Listings
            </Link>
          )}

          {!user ? (
            <>
              <Link
                href="/login"
                onClick={() => setMenuOpen(false)}
                className="block"
              >
                Login
              </Link>

              <Link
                href="/signup"
                onClick={() => setMenuOpen(false)}
                className="block bg-green-700 text-white px-4 py-3 rounded-xl text-center"
              >
                Sign Up
              </Link>
            </>
          ) : (
            <button
              onClick={handleLogout}
              className="w-full bg-gray-500 text-white py-3 rounded-xl"
            >
              Logout
            </button>
          )}

        </div>
      )}
    </nav>
  );
}