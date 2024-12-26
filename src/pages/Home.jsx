import React from "react";
import { useNavigate } from "react-router-dom";
import ParticleAnimation from "../components/ParticleAnimation";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/form");
  };

  return (
    <div className="relative h-screen bg-gray-900 overflow-hidden">
      <ParticleAnimation />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10">
        <h1 className="text-8xl md:text-9xl font-bold text-shadow-lg">Welcome to My Website</h1>
        <p className="mt-4 text-lg md:text-2xl text-shadow">
          Your awesome particle animation homepage!
        </p>
        <button
          onClick={handleNavigate}
          className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
        >
          Add Student
        </button>
      </div>
      <style jsx>{`
        .text-shadow {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        .text-shadow-lg {
          text-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5);
        }
      `}</style>
    </div>
  );
};

export default Home;