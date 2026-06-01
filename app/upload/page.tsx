"use client";

import { useState } from "react";
import { supabase } from "../lib/supabase";
import { useRouter } from "next/navigation";

export default function UploadPage() {

  const router = useRouter();

  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [description, setDescription] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const [category, setCategory] = useState("");
  const [condition, setCondition] = useState("");
  const [location, setLocation] = useState("");
  const [whatsapp, setWhatsapp] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {

    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) {
      alert("Please login first");
      router.push("/login");
      return;
    }

    if (!image) {
      alert("Please select an image");
      return;
    }

    const fileName = `${Date.now()}-${image.name}`;

    const slug = title
      .toLowerCase()
      .replace(/\s+/g, "-");

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

    const { error } = await supabase
      .from("listings")
      .insert([
        {
          title,
          price,
          description,
          category,
          condition,
          location,
          whatsapp,
          image: imageUrl,
          slug,
          user_id: user.id,
        },
      ]);

    if (error) {
      console.log(error);
      alert("Something went wrong");
      return;
    }

    alert("Listing uploaded successfully!");

    router.push("/");

  };

  return (
    <main className="min-h-screen bg-gray-50 px-6 py-16">

      <div className="max-w-2xl mx-auto bg-white rounded-3xl shadow-sm p-8">

        <div className="mb-8">
  <h1 className="text-4xl font-bold text-gray-900">
    Sell an Item
  </h1>

  <p className="text-gray-500 mt-2">
    Upload your item and connect with buyers across campus.
  </p>
</div>

        <form onSubmit={handleSubmit} className="space-y-6">

          <input
            type="text"
            placeholder="Product Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            required
          />

          <select
  value={category}
  onChange={(e) => setCategory(e.target.value)}
  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
  required
>
  <option value="">Select Category</option>
  <option value="Electronics">Electronics</option>
  <option value="Textbooks">Textbooks</option>
  <option value="Furniture">Furniture</option>
  <option value="Fashion">Fashion</option>
  <option value="Hostel Essentials">Hostel Essentials</option>
</select>

<select
  value={condition}
  onChange={(e) => setCondition(e.target.value)}
  className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
  required
>
  <option value="">Item Condition</option>
  <option value="Brand New">Brand New</option>
  <option value="Like New">Like New</option>
  <option value="Fairly Used">Fairly Used</option>
  <option value="Used">Used</option>
</select>

          <input
            type="text"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="Location / Hostel"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            required
          />

          <input
            type="text"
            placeholder="WhatsApp Number"
            value={whatsapp}
            onChange={(e) => setWhatsapp(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            required
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none h-40"
            required
          />

          <input
            type="file"
            accept="image/*"
            onChange={(e) => {
              if (e.target.files && e.target.files[0]) {
                setImage(e.target.files[0]);
              }
            }}
            className="w-full border border-gray-300 rounded-2xl px-4 py-3 outline-none"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-700 text-white py-4 rounded-2xl hover:bg-green-800 transition font-semibold"
          >
            Upload Listing
          </button>

        </form>

      </div>

    </main>
  );
}