"use client";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

export default function ContactUs() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // You can connect this to an email service like EmailJS, Formspree, etc.
    alert("Message sent successfully!");
    setForm({ name: "", email: "", subject: "", message: "" });
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-100 via-white to-blue-50 text-gray-800 font-sans">
      <Link href="/" className="absolute top-4 left-10 z-20 flex items-center space-x-2">
        <Image src="/logo.svg" alt="MindEase Logo" width={100} height={100} />
      </Link>

      <main className="flex items-center justify-center min-h-screen px-4 py-20">
        <div className="bg-white shadow-2xl rounded-3xl p-10 w-full max-w-3xl">
          <h2 className="text-3xl font-bold text-blue-900 text-center mb-8">Contact Us</h2>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block mb-2 font-medium text-gray-700">Name</label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                required
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Email</label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                required
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Subject</label>
              <input
                type="text"
                name="subject"
                value={form.subject}
                onChange={handleChange}
                required
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              />
            </div>
            <div>
              <label className="block mb-2 font-medium text-gray-700">Message</label>
              <textarea
                name="message"
                value={form.message}
                onChange={handleChange}
                required
                rows={5}
                className="w-full p-3 border border-blue-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400"
              ></textarea>
            </div>
            <div className="text-center">
              <button
                type="submit"
                className="bg-blue-500 hover:bg-blue-600 text-white px-8 py-3 rounded-full font-semibold transition duration-300"
              >
                Send Message
              </button>
            </div>
          </form>
        </div>
      </main>

      <footer className="bg-white py-8 text-gray-500">
        <div className="max-w-5xl mx-auto px-4 text-center space-y-4">
          <p className="text-gray-700 font-medium">&copy; {new Date().getFullYear()} MindEase</p>
          <nav className="flex justify-center space-x-8 text-sm">
            <Link href="/about" className="hover:text-gray-700">About</Link>
            <Link href="/contact-us" className="hover:text-gray-700">Contact</Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}
