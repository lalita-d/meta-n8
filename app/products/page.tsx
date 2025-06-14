import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sprout, DollarSign, GraduationCap, Stethoscope, Heart, Leaf, TrendingUp, Users, Building } from "lucide-react"
import Link from "next/link"

const techSectors = [
  {
    icon: Sprout,
    name: "AgriTech",
    description: "Revolutionary agricultural technology solutions transforming food production and farming practices",
    color: "from-green-500 to-emerald-600",
    stats: { products: 45, funding: "£2.5M", companies: 12 },
    features: ["Smart Farming", "Hydroponics", "Crop Monitoring", "Sustainable Agriculture"],
  },
  {
    icon: DollarSign,
    name: "FinTech",
    description: "Innovative financial technology solutions reshaping the digital economy and payment systems",
    color: "from-blue-500 to-cyan-600",
    stats: { products: 38, funding: "£4.2M", companies: 15 },
    features: ["Digital Payments", "Blockchain", "Investment Platforms", "Financial Analytics"],
  },
  {
    icon: GraduationCap,
    name: "EduTech",
    description: "Educational technology platforms enhancing learning experiences and accessibility",
    color: "from-purple-500 to-indigo-600",
    stats: { products: 32, funding: "£1.8M", companies: 9 },
    features: ["E-Learning", "Virtual Classrooms", "Educational Apps", "Learning Analytics"],
  },
  {
    icon: Stethoscope,
    name: "MedTech",
    description: "Advanced medical technology solutions improving healthcare delivery and patient outcomes",
    color: "from-red-500 to-pink-600",
    stats: { products: 28, funding: "£3.1M", companies: 8 },
    features: ["Medical Devices", "Diagnostics", "Telemedicine", "Health Monitoring"],
  },
  {
    icon: Heart,
    name: "HealthTech",
    description: "Healthcare technology systems revolutionizing patient care and wellness management",
    color: "from-rose-500 to-red-600",
    stats: { products: 35, funding: "£2.9M", companies: 11 },
    features: ["Digital Health", "Wellness Apps", "Health Analytics", "Patient Management"],
  },
  {
    icon: Leaf,
    name: "GreenTech",
    description: "Environmental technology solutions creating a sustainable future for our planet",
    color: "from-emerald-500 to-teal-600",
    stats: { products: 29, funding: "£2.2M", companies: 7 },
    features: ["Renewable Energy", "Waste Management", "Carbon Tracking", "Eco Solutions"],
  },
]

export default function ProductsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Innovation Categories</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
            Discover groundbreaking technologies across six key sectors that are revolutionizing industries and creating
            unprecedented opportunities for innovation.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Building className="mr-2 h-5 w-5" />
                Join as Founder
              </Button>
            </Link>
            <Link href="/auth/signup">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold"
              >
                <TrendingUp className="mr-2 h-5 w-5" />
                Join as Investor
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Categories Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {techSectors.map((sector, index) => (
              <Card
                key={index}
                className="group border-0 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2"
              >
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${sector.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
                  >
                    <sector.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900 group-hover:text-purple-600 transition-colors">
                    {sector.name}
                  </CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {sector.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 text-center">
                    <div>
                      <div className="text-2xl font-bold text-purple-600">{sector.stats.products}</div>
                      <div className="text-xs text-gray-500">Products</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-green-600">{sector.stats.funding}</div>
                      <div className="text-xs text-gray-500">Funding</div>
                    </div>
                    <div>
                      <div className="text-2xl font-bold text-blue-600">{sector.stats.companies}</div>
                      <div className="text-xs text-gray-500">Companies</div>
                    </div>
                  </div>

                  {/* Features */}
                  <div>
                    <h4 className="font-semibold mb-3">Key Areas:</h4>
                    <div className="flex flex-wrap gap-2">
                      {sector.features.map((feature, idx) => (
                        <Badge key={idx} variant="secondary" className="text-xs">
                          {feature}
                        </Badge>
                      ))}
                    </div>
                  </div>

                  <Link href="/auth/signup">
                    <Button className="w-full bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 transition-all duration-300">
                      Explore {sector.name}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-6">Ready to Join the Innovation?</h2>
          <p className="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
            Whether you're a founder with a groundbreaking idea or an investor looking for the next big opportunity,
            MetaVertex connects you with the right partners across all technology sectors.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold"
              >
                <Users className="mr-2 h-5 w-5" />
                Get Started Today
              </Button>
            </Link>
            <Link href="/about">
              <Button size="lg" variant="outline" className="px-8 py-4 text-lg font-semibold">
                Learn More About Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
