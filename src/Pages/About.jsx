import React from 'react'
import { Link } from 'react-router-dom'

function About() {
  return (
    <div className="min-h-screen bg-white">
      {/* Header Section */}
      <div className="bg-gray-100 text-gray-900 py-16 border-b border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-4">M1NOR FM haqida</h1>
          <p className="text-xl text-gray-700 max-w-2xl mx-auto">
            Musiqa videolari, fotolar va raqamli kontent uchun ishonchli platforma
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column */}
          <div className="text-gray-900">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bizning missiyamiz</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              M1NOR FM butun dunyodagi musiqa va kontent ishqibozlari uchun qulay va yoqimli tajriba yaratishga intiladi.
              Biz yuqori sifatli ko'ngilochar kontent hammaga, har doim va har joyda mavjud bo'lishiga ishonamiz.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">
              Platformamiz eng yangi musiqiy videolar, chiroyli fotosuratlar va qiziqarli kontentni
              dunyo bo'ylab iste'dodli ijodkorlar va kanallardan jamlaydi.
            </p>

            <h3 className="text-2xl font-bold text-gray-900 mb-4">Biz nimalarni taklif qilamiz</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎬</span>
                <span className="text-gray-700"><strong>Eng yangi musiqiy videolar:</strong> Har kuni yangilanadi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🎵</span>
                <span className="text-gray-700"><strong>Ko'p-kanalli qo'llab-quvvatlash:</strong> Turli manbalar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🖼️</span>
                <span className="text-gray-700"><strong>Foto galereya:</strong> Saralangan kolleksiyalar</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">⭐</span>
                <span className="text-gray-700"><strong>Interaktiv funksiyalar:</strong> Yoqtirish, izoh va kashf</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">📱</span>
                <span className="text-gray-700"><strong>Moslashuvchan dizayn:</strong> Har qanday qurilmada ishlaydi</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-2xl">🔐</span>
                <span className="text-gray-700"><strong>Bepul kirish:</strong> Obuna talab qilinmaydi</span>
              </li>
            </ul>
          </div>

          {/* Right Column */}
          <div className="text-gray-900">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">Bizning qadriyatlarimiz</h2>
            
            <div className="space-y-6">
              <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Sifat birinchi o'rinda</h3>
                <p className="text-gray-700">
                  Foydalanuvchilarga faqat eng yuqori sifatli kontent taqdim etiladi.
                  Har bir video va rasm sinchkovlik bilan saralanadi.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Foydalanuvchi tajribasi</h3>
                <p className="text-gray-700">
                  Foydalanuvchi mamnunligi eng muhim ustuvorligimiz. Fikr-mulohazalar asosida
                  platformani doimiy takomillashtiramiz.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Innovatsiya</h3>
                <p className="text-gray-700">
                  Zamonaviy texnologiyalarni joriy etib, hamjamiyat ehtiyojlariga mos rivojlanamiz.
                </p>
              </div>

              <div className="bg-gray-50 p-6 rounded-xl shadow-sm transition-all duration-200 hover:shadow-lg hover:scale-[1.02]">
                <h3 className="text-xl font-bold text-blue-600 mb-3">Hamjamiyat</h3>
                <p className="text-gray-700">
                  Ijodkorlar va tomoshabinlardan iborat kuchli hamjamiyat qurishga ishonamiz.
                  Birgalikda musiqa, san'at va raqamli madaniyatni qadrlaymiz.
                </p>
              </div>
            </div>
          </div>
        </div>        
      </div>

      {/* CTA Section */}
      <div className="bg-gray-100 text-gray-900 py-16 border-t border-gray-200">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ko'proq bilishni xohlaysizmi?</h2>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/music"
              className="bg-blue-600 text-white font-bold py-3 px-8 rounded-lg cursor-pointer transition-all duration-200 hover:bg-blue-700 hover:scale-[1.02] active:scale-[0.98]"
            >
              Musiqani ko'rish
            </Link>
            <Link
              to="/pictures"
              className="bg-gray-300 hover:bg-gray-400 text-gray-900 font-bold py-3 px-8 rounded-lg cursor-pointer transition-all duration-300"
            >
              Rasmlarni ko'rish
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default About

