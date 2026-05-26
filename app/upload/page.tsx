"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = async () => {

    const { data } = await supabase.auth.getUser();

    if (!data.user) {
      router.push("/login");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    if (!image) {
      alert("Please select an image");
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;

    const { error: uploadError } = await supabase.storage
      .from("listing-images")
      .upload(fileName, image);

    if (uploadError) {
      console.log(uploadError);
      alert("Image upload failed");
      return;
    }

    const { data } = supabase.storage
      .from("listing-images")
      .getPublicUrl(fileName);

    const imageUrl = data.publicUrl;

    const { data: userData } = await supabase.auth.getUser();

const user = userData.user;

const { error } = await supabase
  .from("listings")
  .insert([
    {
      title,
      price,
      description,
      image: imageUrl,
      user_id: user?.id,
      user_email: user?.email,
    },
  ]);

    if (error) {
      console.log(error);
      alert("Something went wrong");
      return;
    }

    alert("Listing uploaded successfully!");

    setTitle("");
    setPrice("");
    setDescription("");
    setImage(null);
  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="max-w-2xl mx-auto bg-white rounded-2xl shadow-sm p-8">

        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Upload Listing
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none h-40"
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none"
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-3 rounded-xl hover:bg-green-800 transition"
          >
            Submit Listing
          </button>

        </form>

      </div>

    </main>
  );
}