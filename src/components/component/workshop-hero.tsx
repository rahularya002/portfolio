"use client"
import { useState, useEffect } from 'react'
import Image from "next/legacy/image"
import AnimatedGridPattern from '@/components/ui/animated-grid-pattern'
import Link from 'next/link'
import { cn } from '@/lib/utils'

function WorkshopHero() {
  const [currentImage, setCurrentImage] = useState(0)
  const images = [
    '/approach.jpg',
    '/wd.jpg',
    '/dm.jpg',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentImage((prevImage) => (prevImage + 1) % images.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [images.length])

  const handleImageClick = (index: number) => {
    setCurrentImage(index)
  }

  return (
    <div className="min-h-[80vh] grid place-items-center relative overflow-hidden">
      <AnimatedGridPattern
              numSquares={30}
              maxOpacity={0.1}
              duration={3}
              repeatDelay={1}
              className={cn(
                "absolute inset-0 w-full h-full",
                "[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]",
                "inset-x-0 inset-y-[-30%] h-[200%] skew-y-12",
              )}
            />
      <div className="w-full max-w-6xl px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 gap-10 items-center relative z-10">
        <div className=" my-6">
          <h1 className="text-black dark:text-white text-4xl font-bold leading-tight">Unleash the Power of AI with MD Infosystems & ENew Bharat</h1>
          <p className="text-gray-700 dark:text-gray-300 text-lg leading-relaxed my-4">
          MD Infosystems Pvt. Ltd. is proud to collaborate with ENew Bharat Pvt. Ltd. to present an exclusive online workshop designed to give you practical insights into the world of AI. 
          </p>
          <Link href='/workshop/Signup' >
            <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-10 rounded-full transition duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1">
              Register Now
            </button>
          </Link>
        </div>
        <div className="relative h-[450px] w-full order-first md:order-last">
          {images.map((src, index) => (
            <Image
              key={src}
              src={src}
              alt={`Workshop image ${index + 1}`}
              layout='fill'
              className={`rounded-lg transition-opacity duration-1000 ${
                index === currentImage ? 'opacity-100' : 'opacity-0'
              }`}
              onClick={() => handleImageClick(index)}
            />
          ))}
          <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-3">
            {images.map((_, index) => (
              <button
                key={index}
                className={`w-4 h-4 rounded-full transition-all duration-300 ${
                  index === currentImage ? 'bg-blue-600 scale-110' : 'bg-gray-400 hover:bg-gray-300'
                }`}
                onClick={() => handleImageClick(index)}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default WorkshopHero