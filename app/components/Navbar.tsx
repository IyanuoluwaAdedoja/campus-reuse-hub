"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";

export default function Navbar() {

  const [user, setUser] = useState<any>(null);

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

    <nav className="sticky top-0 z-50 bg-white/80 backdrop-blur-lg border-b border-gray-200">

      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">

        <Link
  href="/"
  className="flex items-center gap-3"
>
  <img
    src="/logo.png"
    alt="CampusReuseHub"
    className="h-20 w-auto"
  />

  <span className="text-2xl font-black text-green-700">
    CampusReuseHub
  </span>
</Link>

        <div className="flex items-center gap-3 flex-wrap">

          <Link
            href="/"
            className="text-gray-700 hover:text-green-700 font-medium"
          >
            Home
          </Link>
          
          <a
            href="/#about"
            className="text-gray-700 hover:text-green-700 font-medium"
>
         About
          </a>

          <Link
  href="/upload"
  className="bg-green-700 text-white px-4 py-2 rounded-xl hover:bg-green-800 transition"
>
  + Sell Item
</Link>

          {user && (

            <Link
              href="/my-listings"
              className="text-gray-700 hover:text-green-700 font-medium"
            >
              My Listings
            </Link>

          )}

          {!user ? (

            <>
              <Link
                href="/login"
                className="text-gray-700 hover:text-green-700 font-medium"
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
            

          ) : (

  <>
    <p className="text-sm text-gray-500 hidden md:block">
      {user.email}
    </p>

    <button
      onClick={handleLogout}
      className="bg-gray-500 text-white px-5 py-2 rounded-xl hover:bg-red-600 transition"
    >
      Logout
    </button>
  </>

)}

        </div>

      </div>

    </nav>

  );
}