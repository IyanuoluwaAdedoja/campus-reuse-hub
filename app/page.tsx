"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import Navbar from "./components/Navbar";
import ListingCard from "./components/ListingCard";

export default function Home() {

  const [listings, setListings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");

 useEffect(() => {

  fetchListings();

  const interval = setInterval(() => {
    fetchListings();
  }, 2000);

  return () => clearInterval(interval);

}, []);

  const fetchListings = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
      return;
    }

    setListings(data || []);
  };

  const filteredListings = listings.filter((item) =>
    item.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

      <section className="flex flex-col items-center justify-center text-center px-6 py-24">

        <h2 className="text-6xl font-bold text-gray-900 max-w-4xl leading-tight">
          Buy, Sell & Reuse Student Essentials
        </h2>

        <p className="mt-6 text-lg text-gray-600 max-w-2xl">
          A campus marketplace where students can exchange textbooks,
          gadgets, furniture, fashion, and more.
        </p>

        <div className="mt-10 flex gap-4">

          <a
  href="#listings"
  className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition"
>
  Explore Listings
</a>

          <Link
  href="/upload"
  className="border border-gray-300 px-6 py-3 rounded-xl hover:bg-gray-100 transition"
>
  Sell an Item
</Link>

        </div>

      </section>

      <section id="listings" className="px-8 pb-20">

        <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-sm p-4 flex flex-col md:flex-row gap-4">

          <input
            type="text"
            placeholder="Search for laptops, textbooks, furniture..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <button className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition">
            Search
          </button>

        </div>

      </section>

      <section className="px-8 pb-16">

        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          Browse Categories
        </h3>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
            <div className="text-5xl mb-4">💻</div>
            <h4 className="font-semibold text-lg">
              Electronics
            </h4>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
            <div className="text-5xl mb-4">📚</div>
            <h4 className="font-semibold text-lg">
              Textbooks
            </h4>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
            <div className="text-5xl mb-4">🪑</div>
            <h4 className="font-semibold text-lg">
              Furniture
            </h4>
          </div>

          <div className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-md transition cursor-pointer">
            <div className="text-5xl mb-4">👕</div>
            <h4 className="font-semibold text-lg">
              Fashion
            </h4>
          </div>

        </div>

      </section>

      <section className="px-8 pb-20">

        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Listings
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {filteredListings.map((item, index) => (

            <Link
              key={index}
              href={`/listing/${encodeURIComponent(
  item.title.toLowerCase().replace(/\s+/g, "-")
)}`}
            >

              <ListingCard
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
              />

            </Link>

          ))}

        </div>

      </section>

    </main>
  );
}

