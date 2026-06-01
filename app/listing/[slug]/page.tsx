"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

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
      .select("*")
      .eq("slug", slug)
      .single();

    if (error) {
      console.log(error);
      return;
    }

    setListing(data);
  };

  if (!listing) {
    return (
      <main className="min-h-screen bg-gray-50">
        <Navbar />

        <div className="flex items-center justify-center py-40">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Listing Not Found
            </h1>

            <p className="text-gray-500 text-lg">
              This item may have been sold or removed.
            </p>
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50">
      <Navbar />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <div className="grid lg:grid-cols-2 gap-12">

          <div>
            <div className="bg-white rounded-3xl overflow-hidden shadow-md border border-gray-100">
              <img
                src={listing.image}
                alt={listing.title}
                className="w-full h-[600px] object-cover"
              />
            </div>
          </div>

          <div>

            <div className="flex flex-wrap gap-3 mb-6">
              <span className="bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                {listing.category}
              </span>

              <span className="bg-gray-100 text-gray-700 px-4 py-2 rounded-full text-sm font-semibold">
                {listing.condition}
              </span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
              {listing.title}
            </h1>

            <p className="text-5xl font-extrabold text-green-700 mt-6">
              ₦{listing.price}
            </p>

            <div className="mt-6 flex items-center gap-3 text-gray-500 text-lg">
              <span>📍 {listing.location}</span>
            </div>

            <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Description
              </h3>

              <p className="text-gray-600 leading-relaxed text-lg">
                {listing.description}
              </p>
            </div>

            <div className="mt-8 bg-white rounded-3xl p-8 shadow-sm border border-gray-100">

              <h3 className="text-2xl font-bold text-gray-900 mb-6">
                Seller Information
              </h3>

              <div className="flex items-center gap-4">

                <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl">
                  👤
                </div>

                <div>
                  <h4 className="font-bold text-lg">
                    Campus Seller
                  </h4>

                  <p className="text-gray-500">
                    Student Marketplace Member
                  </p>
                </div>

              </div>

              <a
                href={`https://wa.me/${listing.whatsapp}`}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full mt-8 bg-green-700 text-white py-4 rounded-2xl hover:bg-green-800 transition font-semibold text-lg text-center"
              >
                WhatsApp Seller
              </a>

            </div>

            <div className="mt-8 bg-yellow-50 border border-yellow-200 rounded-3xl p-6">

              <h4 className="font-bold text-yellow-800 mb-3">
                Safety Tips
              </h4>

              <ul className="text-yellow-700 space-y-2">
                <li>• Meet in a public location on campus</li>
                <li>• Inspect the item before payment</li>
                <li>• Avoid paying before seeing the item</li>
                <li>• Trust your instincts and stay safe</li>
              </ul>

            </div>

          </div>

        </div>
      </section>
    </main>
  );
}