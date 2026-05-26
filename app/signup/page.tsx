"use client";

import { useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useRouter } from "next/navigation";

export default function SignupPage() {

  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignup = async (e: React.FormEvent) => {

    e.preventDefault();

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      alert(error.message);
      return;
    }

    alert("Account created successfully!");

    router.push("/login");
  };

  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <form
        onSubmit={handleSignup}
        className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md space-y-6"
      >

        <h1 className="text-3xl font-bold text-center">
          Create Account
        </h1>

        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        />

        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-3"
        />

        <button
          type="submit"
          className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
        >
          Sign Up
        </button>

      </form>

    </main>
  );
}