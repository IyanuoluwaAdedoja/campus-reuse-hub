"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import Link from "next/link";
import Navbar from "./components/Navbar";
import ListingCard from "./components/ListingCard";

export default function Home() {

  const [listings, setListings] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

 useEffect(() => {
  fetchListings();
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

  const filteredListings = listings.filter((item) => {

  const matchesSearch =
    item.title.toLowerCase().includes(searchTerm.toLowerCase());

  const matchesCategory =
    selectedCategory === "" ||
    item.category === selectedCategory;

  return matchesSearch && matchesCategory;

});

  return (
    <main className="min-h-screen bg-gray-50">

      <Navbar />

     <section className="relative overflow-hidden bg-gradient-to-br from-green-50 to-white px-6 py-28">

  <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

    <div>

      <div className="inline-flex items-center bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium mb-6">
        ♻️ Sustainable Student Marketplace
      </div>

      <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-gray-900 leading-tight">

        Buy & Sell
        <span className="text-green-700"> Campus Essentials</span>

      </h1>

      <p className="mt-8 text-xl text-gray-600 leading-relaxed max-w-2xl">

        The smartest way for students to buy affordable gadgets,
        textbooks, furniture, fashion, and hostel essentials.

      </p>

      <div className="mt-10 flex flex-wrap gap-4">

        <a
          href="#listings"
          className="bg-green-700 text-white px-8 py-4 rounded-2xl hover:bg-green-800 transition font-semibold shadow-lg"
        >
          Explore Listings
        </a>

        <Link
          href="/upload"
          className="bg-white border border-gray-300 px-8 py-4 rounded-2xl hover:bg-gray-100 transition font-semibold"
        >
          Sell an Item
        </Link>

      </div>

      <div className="mt-14 grid grid-cols-3 gap-8">

        <div>
          <h3 className="text-3xl font-bold text-gray-900">500+</h3>
          <p className="text-gray-600 mt-2">Student Listings</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900">24/7</h3>
          <p className="text-gray-600 mt-2">Marketplace Access</p>
        </div>

        <div>
          <h3 className="text-3xl font-bold text-gray-900">100%</h3>
          <p className="text-gray-600 mt-2">Campus Focused</p>
        </div>

      </div>

    </div>

    <div className="relative">

      <img
        src="/students-hero.jpg"
        alt="Students"
        className="rounded-[2rem] shadow-2xl object-cover h-[350px] md:h-[650px] w-full border border-white"
      />

      
    </div>

  </div>

</section>

      <section className="px-8 pb-16">

        <div className="mb-10">

  <input
    type="text"
    placeholder="Search for laptops, textbooks, furniture..."
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
    className="w-full bg-white border border-gray-200 rounded-2xl px-6 py-4 text-lg shadow-sm"
  />

</div>

<button
  onClick={() => setSelectedCategory("")}
  className="mb-8 text-green-700 font-semibold hover:underline"
>
  View All Listings
</button>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">

          <button
  onClick={() => setSelectedCategory("Electronics")}
  className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
>
  <div className="text-5xl mb-4">💻</div>
  <h4 className="font-semibold text-lg">
    Electronics
  </h4>
</button>

<button
  onClick={() => setSelectedCategory("Textbooks")}
  className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
>
  <div className="text-5xl mb-4">📚</div>
  <h4 className="font-semibold text-lg">
    Textbooks
  </h4>
</button>

<button
  onClick={() => setSelectedCategory("Furniture")}
  className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
>
  <div className="text-5xl mb-4">🪑</div>
  <h4 className="font-semibold text-lg">
    Furniture
  </h4>
</button>

<button
  onClick={() => setSelectedCategory("Fashion")}
  className="bg-white rounded-2xl shadow-sm p-6 text-center hover:shadow-lg hover:-translate-y-1 transition cursor-pointer"
>
  <div className="text-5xl mb-4">👕</div>
  <h4 className="font-semibold text-lg">
    Fashion
  </h4>
</button>

        </div>

      </section>

      <section id="listings" className="px-6 md:px-12 pb-24">

        <h3 className="text-3xl font-bold text-gray-900 mb-8">
          Featured Listings
        </h3>
        <p className="text-gray-500 mb-10 text-lg">
  Discover affordable student deals across campus.
</p>

        {filteredListings.length === 0 ? (

  <div className="bg-white rounded-3xl p-12 text-center shadow-sm">

    <h3 className="text-2xl font-bold mb-3">
      No Listings Found
    </h3>

    <p className="text-gray-500">
      Try another search or category.
    </p>

  </div>

) : (

  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">

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

)}

<section
  id="about"
  className="px-8 py-20 bg-gray-50"
>

  <div className="max-w-5xl mx-auto text-center">

    <h2 className="text-4xl font-bold text-gray-900">
      Why CampusReuseHub?
    </h2>

    <p className="mt-6 text-xl text-gray-600 leading-relaxed">

      Students constantly buy new items while perfectly usable
      textbooks, gadgets, furniture and fashion sit unused.

      CampusReuseHub helps students save money, reduce waste,
      and connect with buyers and sellers within campus communities.

    </p>

  </div>

</section>

      </section>

<footer className="bg-gray-900 text-white mt-20">

  <div className="max-w-7xl mx-auto px-6 py-12">

    <div className="grid md:grid-cols-3 gap-10">

      <div>

        <h3 className="text-2xl font-bold text-green-400">
          CampusReuseHub
        </h3>

        <p className="text-gray-400 mt-3">
          Nigeria's student marketplace.
        </p>

      </div>

      <div>

        <h4 className="font-semibold mb-3">
          Quick Links
        </h4>

        <div className="space-y-2 text-gray-400">
          <p>Home</p>
          <p>Sell Item</p>
          <p>My Listings</p>
        </div>

      </div>

      <div>

        <h4 className="font-semibold mb-3">
          Contact
        </h4>

        <p className="text-gray-400">
          support@campusreusehub.store
        </p>

      </div>

    </div>

  </div>

</footer> 
    </main>
  );
}

