import React from "react";
import { useNavigate } from "react-router-dom";
import ParticleAnimation from "../components/ParticleAnimation";

const Home = () => {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate("/form");
  };

  return (
    <div className="relative min-h-screen bg-gray-900 overflow-hidden">
      <ParticleAnimation />
      <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center z-10 p-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-bold text-shadow-lg leading-tight">
            Welcome to My Website
          </h1>
          <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-shadow max-w-2xl mx-auto">
            Your awesome particle animation homepage!
          </p>
          <button
            onClick={handleNavigate}
            className="mt-8 bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded shadow-lg transition duration-300 ease-in-out transform hover:scale-105 text-sm sm:text-base md:text-lg lg:text-xl"
          >
            Add Student
          </button>
        </div>
      </div>
      <style jsx>{`
        .text-shadow {
          text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
        }
        .text-shadow-lg {
          text-shadow: 2px 2px 4px rgba(0, 0, 0, 0.5);
        }
        @media (max-width: 640px) {
          .text-shadow-lg {
            text-shadow: 1px 1px 2px rgba(0, 0, 0, 0.5);
          }
        }
      `}</style>
    </div>
  );
};

export default Home;

