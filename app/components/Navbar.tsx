"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    const { data } = await supabase.auth.getUser();

    setUser(data.user);
  };

  const handleLogout = async () => {

    await supabase.auth.signOut();

    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-8 py-6 bg-white shadow-sm">

      <Link
        href="/"
        className="text-2xl font-bold text-green-700"
      >
        Campus Reuse Hub
      </Link>

      <div className="flex items-center gap-4">

        <Link
          href="/my-listings"
          className="text-gray-700 hover:text-green-700 transition"
        >
          My Listings
        </Link>

        {user ? (

          <button
            onClick={handleLogout}
            className="bg-red-600 text-white px-5 py-2 rounded-xl hover:bg-red-700 transition"
          >
            Logout
          </button>

        ) : (

          <>
            <Link
              href="/login"
              className="text-gray-700 hover:text-green-700 transition"
            >
              Login
            </Link>

            <Link
              href="/signup"
              className="bg-green-700 text-white px-5 py-2 rounded-xl hover:bg-green-800 transition"
            >
              Sign Up
            </Link>
          </>

        )}

      </div>

    </nav>
  );
}