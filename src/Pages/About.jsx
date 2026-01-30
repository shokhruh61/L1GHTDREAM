import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-100 text-gray-900 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">About M1NOR FM</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Your premier entertainment platform for music videos, photos, and digital content
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="text-gray-900">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              M1NOR FM is dedicated to providing a seamless and enjoyable experience for music and content lovers worldwide. 
              We believe in making high-quality entertainment accessible to everyone, anytime, anywhere.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Our platform brings together the latest music videos, stunning photography, and engaging content 
              from talented creators and channels around the globe.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">What We Offer</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎬</span>
                <span className="text-gray-700"><strong>Latest Music Videos:</strong> Stream fresh content daily</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎵</span>
                <span className="text-gray-700"><strong>Multi-Channel Support:</strong> Access multiple music sources</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🖼️</span>
                <span className="text-gray-700"><strong>Photo Gallery:</strong> Curated image collections</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-700"><strong>Interactive Features:</strong> Like, comment, and explore</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <span className="text-gray-700"><strong>Responsive Design:</strong> Works on all devices</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔐</span>
                <span className="text-gray-700"><strong>Free Access:</strong> No subscriptions required</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="text-gray-900">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Our Values</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Quality First</h3>
                <p className="text-gray-700">
                  We ensure only the highest quality content reaches our users. Every video and image 
                  is carefully curated and presented in its best form.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-3">User Experience</h3>
                <p className="text-gray-700">
                  User satisfaction is our top priority. We continuously improve our platform based on 
                  feedback to provide the best browsing experience.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Innovation</h3>
                <p className="text-gray-700">
                  We embrace new technologies and features to stay ahead. Our platform evolves to meet 
                  the changing needs of our community.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Community</h3>
                <p className="text-gray-700">
                  We believe in building a vibrant community of creators and consumers. Together, 
                  we celebrate music, art, and digital culture.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="mt-16 py-12 border-t border-gray-300">
          <h2 className="text-3xl font-bold text-gray-900 text-center mb-12">Our Team</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { name: 'Alex', role: 'Founder & CEO', emoji: '👨‍💼' },
              { name: 'Sarah', role: 'Product Manager', emoji: '👩‍💼' },
              { name: 'John', role: 'Lead Developer', emoji: '👨‍💻' },
              { name: 'Lisa', role: 'Content Manager', emoji: '👩‍🎨' }
            ].map((member, idx) => (
              <div key={idx} className="bg-gray-50 p-6 rounded-lg hover:shadow-md transition-shadow text-center">
                <div className="text-5xl mb-3">{member.emoji}</div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{member.name}</h3>
                <p className="text-gray-600">{member.role}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 text-gray-900 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Want to Learn More?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/music"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              Explore Music
            </Link>
            <Link 
              to="/picturess"
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-8 rounded-lg transition-all transform hover:scale-105"
            >
              View Photos
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About