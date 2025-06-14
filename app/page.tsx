"use client"

import { useAuth } from "@/contexts/AuthContext"
import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useRealTimeData } from "@/hooks/useRealTimeData"
import {
  Sprout,
  DollarSign,
  GraduationCap,
  Stethoscope,
  Heart,
  Leaf,
  Users,
  CheckCircle,
  ArrowRight,
  ChevronLeft,
  ChevronRight,
} from "lucide-react"
import Link from "next/link"
import { useState, useEffect } from "react"

export default function HomePage() {
  const { user } = useAuth()
  const { products } = useRealTimeData()
  const [currentSlide, setCurrentSlide] = useState(0)

  const heroSlides = [
    {
      title: "Transform Your Innovation Journey",
      subtitle: "Connect founders with investors across cutting-edge technology sectors",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Start Your Journey",
    },
    {
      title: "Discover Breakthrough Technologies",
      subtitle: "Explore revolutionary products in AgriTech, FinTech, HealthTech and more",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Explore Products",
    },
    {
      title: "Secure Your Investment Future",
      subtitle: "Join verified investors finding the next unicorn startups",
      image: "/placeholder.svg?height=600&width=800",
      cta: "Invest Now",
    },
  ]

  const techSectors = [
    {
      icon: Sprout,
      name: "AgriTech",
      description: "Revolutionary agricultural technology solutions",
      color: "from-green-500 to-emerald-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "AgriTech" && p.status === "approved").length,
    },
    {
      icon: DollarSign,
      name: "FinTech",
      description: "Innovative financial technology solutions",
      color: "from-blue-500 to-cyan-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "FinTech" && p.status === "approved").length,
    },
    {
      icon: GraduationCap,
      name: "EduTech",
      description: "Educational technology platforms",
      color: "from-purple-500 to-indigo-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "EduTech" && p.status === "approved").length,
    },
    {
      icon: Stethoscope,
      name: "MedTech",
      description: "Advanced medical technology solutions",
      color: "from-red-500 to-pink-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "MedTech" && p.status === "approved").length,
    },
    {
      icon: Heart,
      name: "HealthTech",
      description: "Healthcare technology systems",
      color: "from-rose-500 to-red-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "HealthTech" && p.status === "approved").length,
    },
    {
      icon: Leaf,
      name: "GreenTech",
      description: "Environmental technology solutions",
      color: "from-emerald-500 to-teal-600",
      image: "/placeholder.svg?height=200&width=300",
      products: products.filter((p) => p.category === "GreenTech" && p.status === "approved").length,
    },
  ]

  const solutionProducts = [
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Smart Irrigation System",
      problem: "Traditional irrigation wastes 40% of water and lacks precision timing",
      solution: "AI-powered sensors that optimize water usage based on soil moisture and weather data",
      benefits: ["60% water savings", "Automated scheduling", "Mobile monitoring", "Crop yield increase"],
      category: "AgriTech",
      funding: "$500K",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Digital Payment Platform",
      problem: "Small businesses struggle with complex payment processing and high fees",
      solution: "Simplified payment gateway with transparent pricing and instant settlements",
      benefits: ["50% lower fees", "Instant settlements", "Easy integration", "Multi-currency support"],
      category: "FinTech",
      funding: "$750K",
    },
    {
      image: "/placeholder.svg?height=300&width=400",
      name: "Telemedicine Platform",
      problem: "Remote areas lack access to quality healthcare and specialist consultations",
      solution: "AI-assisted telemedicine platform connecting patients with specialists globally",
      benefits: ["24/7 availability", "AI diagnosis support", "Prescription delivery", "Cost reduction"],
      category: "HealthTech",
      funding: "$1.2M",
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [heroSlides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroSlides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length)
  }

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Carousel Section */}
      <section id="hero" className="relative h-screen overflow-hidden">
        <div className="relative w-full h-full">
          {heroSlides.map((slide, index) => (
            <div
              key={index}
              className={`absolute inset-0 transition-transform duration-500 ease-in-out ${
                index === currentSlide
                  ? "translate-x-0"
                  : index < currentSlide
                    ? "-translate-x-full"
                    : "translate-x-full"
              }`}
            >
              <div className="relative h-full bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
                <div className="absolute inset-0 bg-black bg-opacity-30" />
                <div className="relative z-10 flex items-center justify-center h-full">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
                    <h1 className="text-5xl md:text-7xl font-bold mb-6">{slide.title}</h1>
                    <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">{slide.subtitle}</p>
                    <Link href="/auth/signup">
                      <Button
                        size="lg"
                        className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                      >
                        {slide.cta}
                      </Button>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button
          onClick={prevSlide}
          className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronLeft className="h-6 w-6 text-white" />
        </button>
        <button
          onClick={nextSlide}
          className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white bg-opacity-20 hover:bg-opacity-30 rounded-full p-2 transition-all"
        >
          <ChevronRight className="h-6 w-6 text-white" />
        </button>

        {/* Carousel Indicators */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {heroSlides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-3 h-3 rounded-full transition-all ${
                index === currentSlide ? "bg-white" : "bg-white bg-opacity-50"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Innovation Categories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Discover groundbreaking technologies across six key sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSectors.map((sector, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={sector.image || "/placeholder.svg"}
                    alt={sector.name}
                    className="w-full h-48 object-cover"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-r ${sector.color} opacity-80`} />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <sector.icon className="h-16 w-16 text-white" />
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {sector.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {sector.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex justify-between items-center mb-4">
                    <Badge variant="secondary">{sector.products} Products</Badge>
                    <span className="text-sm text-gray-500">Available Now</span>
                  </div>
                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                      Explore {sector.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Solutions Section */}
      <section id="solutions" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Featured Solutions</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real products solving real problems with innovative solutions
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {solutionProducts.map((product, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <div className="relative overflow-hidden rounded-t-lg">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-64 object-cover"
                  />
                  <div className="absolute top-4 left-4">
                    <Badge className="bg-white text-gray-900">{product.category}</Badge>
                  </div>
                  <div className="absolute top-4 right-4">
                    <Badge variant="outline" className="bg-white text-green-600 border-green-600">
                      {product.funding}
                    </Badge>
                  </div>
                </div>
                <CardContent className="p-6">
                  <h3 className="text-xl font-bold mb-4">{product.name}</h3>

                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-red-600 mb-2">🔴 Problem</h4>
                      <p className="text-sm text-gray-600">{product.problem}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-blue-600 mb-2">💡 Solution</h4>
                      <p className="text-sm text-gray-600">{product.solution}</p>
                    </div>

                    <div>
                      <h4 className="font-semibold text-green-600 mb-2">✅ Benefits</h4>
                      <div className="grid grid-cols-2 gap-2">
                        {product.benefits.map((benefit, idx) => (
                          <div key={idx} className="flex items-center text-sm text-gray-600">
                            <CheckCircle className="h-4 w-4 text-green-500 mr-1 flex-shrink-0" />
                            {benefit}
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <Link href="/auth/signup">
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                        Learn More
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">About MetaVertex</h2>
              <div className="space-y-6 text-gray-600 leading-relaxed">
                <p>
                  Founded in 2018, MetaVertex emerged from a simple yet powerful vision: to create innovative,
                  sustainable technologies that improve lives while reducing environmental impact.
                </p>
                <p>
                  Our diverse team of <strong>engineers, healthcare professionals, and agricultural experts</strong>{" "}
                  work together to create integrated solutions for modern challenges.
                </p>
                <p>
                  From our headquarters in London, we've expanded globally, serving clients across 25+ countries and
                  winning 15+ industry awards for innovation and sustainability.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 mt-8">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">50K+</div>
                  <div className="text-sm text-gray-600">Happy Customers</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-600">100+</div>
                  <div className="text-sm text-gray-600">Innovations</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">25+</div>
                  <div className="text-sm text-gray-600">Countries</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-600">15+</div>
                  <div className="text-sm text-gray-600">Awards Won</div>
                </div>
              </div>
            </div>

            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="MetaVertex team collaboration"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-600">2018</div>
                  <div className="text-sm text-gray-600">Founded</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Transform Your Innovation Journey?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Join thousands of founders, investors, and organizations who are already building the future together.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Users className="mr-2 h-5 w-5" />
                Join the Platform
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              onClick={() => scrollToSection("about")}
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
