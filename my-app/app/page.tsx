// app/profile/page.tsx
"use client";

import { useState } from "react";

export default function ProfileFormPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    profession: "",
    city: "",
    bio: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setLoading(true);
    setMessage("");

    try {
      const response = await fetch("https://constructioncourse.co.uk/api/profile", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setMessage("Profile saved successfully!");
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          profession: "",
          city: "",
          bio: "",
        });
      } else {
        setMessage(data.message || "Something went wrong");
      }
    } catch (error) {
      setMessage("Server error");
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-2xl bg-white shadow-xl rounded-3xl p-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            Profile Information
          </h1>
          <p className="text-gray-500 mt-2">
            Fill your basic profile details
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Full Name
            </label>

            <input
              type="text"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter full name"
              required
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
            />
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Email
              </label>

              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter email"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Phone
              </label>

              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter phone number"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-5">
            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Profession
              </label>

              <input
                type="text"
                name="profession"
                value={formData.profession}
                onChange={handleChange}
                placeholder="Web Developer"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>

            <div>
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                City
              </label>

              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleChange}
                placeholder="Delhi"
                required
                className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black"
              />
            </div>
          </div>

          <div>
            <label className="block mb-2 text-sm font-semibold text-gray-700">
              Bio
            </label>

            <textarea
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              rows={4}
              placeholder="Write something about yourself..."
              className="w-full border border-gray-300 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-black resize-none"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-black text-white py-3 rounded-xl font-semibold hover:opacity-90 transition"
          >
            {loading ? "Saving..." : "Save Profile"}
          </button>

          {message && (
            <p className="text-center text-sm font-medium text-green-600">
              {message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
}