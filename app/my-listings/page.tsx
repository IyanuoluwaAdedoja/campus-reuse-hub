"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ListingCard from "../components/ListingCard";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function MyListingsPage() {
  const router = useRouter();

  const [listings, setListings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      router.push("/login");
      return;
    }

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id)
      .order("id", { ascending: false });

    if (error) {
      console.log(error);
    } else {
      setListings(data || []);
    }

    setLoading(false);
  };

  const deleteListing = async (id: number) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", id);

    if (error) {
      alert(error.message);
      return;
    }

    setListings((prev) => prev.filter((item) => item.id !== id));
  };

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading listings...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 md:px-12 py-16">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6 mb-10">
        <div>
          <h1 className="text-4xl font-bold">My Listings</h1>
          <p className="text-gray-500 mt-2">
            Manage all your uploaded items.
          </p>
        </div>

        <Link
          href="/upload"
          className="bg-green-700 text-white px-6 py-3 rounded-xl hover:bg-green-800 transition text-center"
        >
          + New Listing
        </Link>
      </div>

      {listings.length === 0 ? (
        <div className="bg-white rounded-3xl p-12 text-center shadow-sm">
          <h2 className="text-2xl font-bold mb-3">No Listings Yet</h2>

          <p className="text-gray-500 mb-6">
            Upload your first item and start selling.
          </p>

          <Link
            href="/upload"
            className="bg-green-700 text-white px-6 py-3 rounded-xl"
          >
            Upload Item
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {listings.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-3xl overflow-hidden shadow-sm"
            >
              <Link href={`/listing/${item.slug}`}>
                <ListingCard
                  title={item.title}
                  description={item.description}
                  price={item.price}
                  image={item.image}
                />
              </Link>

              <div className="p-5 border-t flex gap-3">
                <Link
                  href={`/listing/${item.slug}`}
                  className="flex-1 bg-gray-100 py-3 rounded-xl text-center font-medium hover:bg-gray-200 transition"
                >
                  View
                </Link>

                <Link
                  href={`/edit-listing/${item.id}`}
                  className="flex-1 bg-blue-600 text-white py-3 rounded-xl text-center hover:bg-blue-700 transition"
                >
                  Edit
                </Link>

                <button
                  onClick={() => deleteListing(item.id)}
                  className="flex-1 bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}