import React, { useState } from "react";

function AddForm() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Use the API URL from the .env file and append '/add' endpoint
      const apiUrl = `${import.meta.env.VITE_API_URL}/users/add`;

      const response = await fetch(apiUrl, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email }),
      });

      const data = await response.json();
      if (response.ok) {
        setMessage(`User added successfully! User ID: ${data.userId}`);
        setName("");
        setEmail("");
      } else {
        setMessage(`Error: ${data.error}`);
      }
    } catch (error) {
      console.error("Error adding user:", error);
      setMessage("An unexpected error occurred.");
    }
  };

  return (
    <div className="relative min-h-screen flex flex-col items-center justify-center bg-black">
      <div className="z-10 text-center mb-8">
        <h1 className="text-4xl font-bold text-white">Welcome to Our Platform!</h1>
        <p className="text-lg text-gray-300 mt-2">
          Please fill out the form below to add a new user to our database.
        </p>
      </div>
      <div className="z-10 w-full max-w-md p-8 bg-gray-800 bg-opacity-50 rounded-lg shadow-lg backdrop-blur-sm">
        <h2 className="text-2xl font-bold mb-4 text-center text-white">Add User</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-300">
              Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your name"
              required
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-300">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 block w-full px-4 py-2 bg-gray-700 border border-gray-600 rounded-md shadow-sm text-white placeholder-gray-400 focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
              placeholder="Enter your email"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full px-4 py-2 text-white bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
          >
            Add User
          </button>
        </form>
        {message && (
          <div className="mt-4 p-3 text-center text-green-500 bg-opacity-75 rounded-md">
            {message}
          </div>
        )}
      </div>
    </div>
  );
}

export default AddForm;
