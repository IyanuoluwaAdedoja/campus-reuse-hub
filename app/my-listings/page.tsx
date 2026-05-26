"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import ListingCard from "../components/ListingCard";

export default function MyListingsPage() {

  const [listings, setListings] = useState<any[]>([]);

  useEffect(() => {
    fetchMyListings();
  }, []);

  const fetchMyListings = async () => {

    const { data: userData } = await supabase.auth.getUser();

    const user = userData.user;

    if (!user) return;

    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("user_id", user.id);

    if (error) {
      console.log(error);
      return;
    }

    setListings(data || []);
  };

  const deleteListing = async (id: number) => {

    const confirmed = confirm(
      "Are you sure you want to delete this listing?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("listings")
      .delete()
      .eq("id", id);

    if (error) {
      console.log(error);
      alert("Delete failed");
      return;
    }

    alert("Listing deleted");

    fetchMyListings();
  };

  return (
    <main className="min-h-screen bg-gray-50 px-8 py-16">

      <h1 className="text-4xl font-bold mb-10">
        My Listings
      </h1>

      {listings.length === 0 ? (

        <p className="text-xl text-gray-500">
          You have not uploaded any listings yet.
        </p>

      ) : (

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {listings.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-2xl overflow-hidden shadow-sm"
            >

              <ListingCard
                title={item.title}
                description={item.description}
                price={item.price}
                image={item.image}
              />

              <div className="p-4">

                <button
                  onClick={() => deleteListing(item.id)}
                  className="w-full bg-red-600 text-white py-3 rounded-xl hover:bg-red-700 transition"
                >
                  Delete Listing
                </button>

              </div>

            </div>

          ))}

        </div>

      )}

    </main>
  );
}