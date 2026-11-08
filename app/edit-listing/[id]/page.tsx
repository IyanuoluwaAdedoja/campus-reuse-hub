"use client";

import { useEffect, useState } from "react";
import { supabase } from "@/app/lib/supabase";
import { useParams, useRouter } from "next/navigation";

export default function EditListingPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  useEffect(() => {
    fetchListing();
  }, []);

  const fetchListing = async () => {
    const { data, error } = await supabase
      .from("listings")
      .select("*")
      .eq("id", id)
      .single();

    if (error) {
      alert("Listing not found");
      router.push("/my-listings");
      return;
    }

    setTitle(data.title);
    setPrice(data.price);
    setDescription(data.description);
    setCategory(data.category);
    setCondition(data.condition);
    setLocation(data.location);
    setWhatsapp(data.whatsapp);

    setLoading(false);
  };

  const handleUpdate = async (e: React.FormEvent) => {
  e.preventDefault();

  const slug = title
    .toLowerCase()
    .replace(/\s+/g, "-");

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    alert("Please login again.");
    return;
  }

  console.log("Route ID:", id);
console.log("Logged in user:", user.id);

const { data: listingData } = await supabase
  .from("listings")
  .select("id, user_id")
  .eq("id", Number(id))
  .single();

console.log("Listing:", listingData);

  const { data, error } = await supabase
    .from("listings")
    .update({
      title,
      price,
      description,
      category,
      condition,
      location,
      whatsapp,
      slug,
    })
    .eq("id", Number(id))
    .eq("user_id", user.id)
    .select();

  console.log("UPDATED:", data);
  console.log("ERROR:", error);

  if (error) {
    alert(error.message);
    return;
  }

  if (!data || data.length === 0) {
    alert("No row was updated.");
    return;
  }

  alert("Listing updated successfully!");
  router.push("/my-listings");
  router.refresh();
};

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-semibold">Loading...</h1>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">
      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-8">

        <h1 className="text-4xl font-bold mb-8">
          Edit Listing
        </h1>

        <form onSubmit={handleUpdate} className="space-y-6">

          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          >
            <option>Electronics</option>
            <option>Textbooks</option>
            <option>Furniture</option>
            <option>Fashion</option>
            <option>Hostel Essentials</option>
          </select>

          <select
            value={condition}
            onChange={(e) => setCondition(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          >
            <option>Brand New</option>
            <option>Like New</option>
            <option>Fairly Used</option>
            <option>Used</option>
          </select>

          <input
            type="text"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          />

          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          />

          <input
            type="text"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3"
            required
          />

          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border rounded-2xl px-4 py-3 h-40"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-4 rounded-2xl hover:bg-green-800 transition font-semibold"
          >
            Save Changes
          </button>

        </form>

      </div>
    </main>
  );
}