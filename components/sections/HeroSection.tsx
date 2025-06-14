"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Rocket, TrendingUp } from "lucide-react"
import Link from "next/link"

const heroSlides = [
  {
    title: "AgriTech Innovation",
    subtitle: "Revolutionizing Agriculture with Smart Technology",
    description:
      "Connect with cutting-edge agricultural technology solutions that are transforming farming and food production.",
    image: "/placeholder.svg?height=600&width=800",
    gradient: "from-green-600 to-emerald-600",
  },
  {
    title: "FinTech Solutions",
    subtitle: "The Future of Financial Technology",
    description: "Discover innovative financial technology platforms that are reshaping the digital economy.",
    image: "/placeholder.svg?height=600&width=800",
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    title: "HealthTech Advances",
    subtitle: "Healthcare Technology for Better Lives",
    description: "Explore healthcare technology solutions that are improving patient care and medical outcomes.",
    image: "/placeholder.svg?height=600&width=800",
    gradient: "from-red-600 to-pink-600",
  },
  {
    title: "GreenTech Future",
    subtitle: "Sustainable Technology for Tomorrow",
    description: "Join the movement towards environmental sustainability with innovative green technology solutions.",
    image: "/placeholder.svg?height=600&width=800",
    gradient: "from-emerald-600 to-teal-600",
  },
]

export function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Carousel */}
      <div className="absolute inset-0">
        {heroSlides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} opacity-90`} />
            <div className="absolute inset-0 bg-black/20" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">{heroSlides[currentSlide].title}</h1>
          <h2 className="text-2xl md:text-3xl font-light mb-8 opacity-90">{heroSlides[currentSlide].subtitle}</h2>
          <p className="text-xl md:text-2xl mb-12 opacity-80 max-w-3xl mx-auto leading-relaxed">
            {heroSlides[currentSlide].description}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Rocket className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
            </Link>
            <Link href="/products">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Explore Products
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">50K+</div>
              <div className="text-sm opacity-80">Happy Customers</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">100+</div>
              <div className="text-sm opacity-80">Innovations</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">25+</div>
              <div className="text-sm opacity-80">Countries</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold mb-2">15+</div>
              <div className="text-sm opacity-80">Awards Won</div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 transform -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-3 transition-colors"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Slide Indicators */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-20 flex space-x-2">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-colors ${index === currentSlide ? "bg-white" : "bg-white/50"}`}
          />
        ))}
      </div>
    </section>
  )
}
