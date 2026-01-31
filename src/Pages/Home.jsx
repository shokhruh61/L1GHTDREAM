import { Link } from "react-router-dom";
import M1norfm from "../assets/images/m1norfm.jpg";

function Home() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16 sm:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Left Content */}
          <div className="text-gray-900">
            <h1 className="text-5xl sm:text-6xl text-center md:text-left font-bold mb-4 leading-tight">
              <span className="text-blue-600">M1NOR FM</span>ga xush kelibsiz
            </h1>
            <p
              className="text-lg sm:text-xl md:text-left text-center mb-6 text-gray-700"
            >
              Musiqa, video va ajoyib kontent uchun yagona manzil. Eng yangi
              hitlar va klassikalarni bir joyda kashf eting.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 text-center md:text-left justify-center md:justify-start">
              <Link
                to="/music"
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-center transition-all duration-300"
              >
                Musiqani ko'rish
              </Link>
              <Link
                to="/pictures"
                className="bg-gray-200 hover:bg-gray-300 text-gray-900 font-bold py-3 px-8 rounded-lg text-center cursor-pointer transition-all duration-200 hover:scale-[1.02] active:scale-[0.98]"
              >
                Galereyani ko'rish
              </Link>
            </div>
          </div>

          {/* Right Image */}
          <div className="flex justify-center">
            <div className="relative">
              <img
                src={M1norfm}
                alt="M1NOR FM"
                className="rounded-full shadow-lg w-80 h-80 object-cover border-4 border-gray-200"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="bg-gray-50 text-gray-900 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Boshlashga tayyormisiz?</h2>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Hammaga salom! M1noR L1GHTDreaM ning Web-site rasmiy hisobiga hush kelibsiz...
          </p>
          <Link
            to="/music"
            className="inline-block bg-blue-600 text-white font-bold py-4 px-12 rounded-lg text-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
          >
            Hoziroq boshlash
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Home;
