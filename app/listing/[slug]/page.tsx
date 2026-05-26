"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";

export default function ListingPage() {

  const params = useParams();

  const [listing, setListing] = useState<any>(null);

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {

    const slug = params.slug?.toString();

    const { data, error } = await supabase
      .from("listings")
      .select("*");

    if (error) {
      console.log(error);
      return;
    }

    const foundListing = data.find((item) => {

      const itemSlug = item.title
        .toLowerCase()
        .replace(/\s+/g, "-");

      return itemSlug === slug;
    });

    setListing(foundListing);
  };

  if (!listing) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <p className="text-xl">Loading listing...</p>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12">

        <div>
          <img
            src={listing.image}
            alt={listing.title}
            className="w-full h-[500px] object-cover rounded-3xl shadow-sm"
          />
        </div>

        <div>

          <h1 className="text-5xl font-bold text-gray-900">
            {listing.title}
          </h1>

          <p className="text-3xl text-green-700 font-semibold mt-6">
            ₦{listing.price}
          </p>

          <p className="text-gray-600 text-lg leading-relaxed mt-8">
            {listing.description}
          </p>

          <button className="mt-10 bg-green-700 text-white px-8 py-4 rounded-2xl hover:bg-green-800 transition">
            Contact Seller
          </button>

        </div>

      </div>

    </main>
  );
}