import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Sprout, DollarSign, GraduationCap, Stethoscope, Heart, Leaf } from "lucide-react"
import Link from "next/link"

const techSectors = [
  {
    icon: Sprout,
    name: "AgriTech",
    description: "Agricultural technology solutions transforming food production",
    color: "from-green-500 to-emerald-600",
    href: "/products/agritech",
  },
  {
    icon: DollarSign,
    name: "FinTech",
    description: "Financial technology innovations for the digital economy",
    color: "from-blue-500 to-cyan-600",
    href: "/products/fintech",
  },
  {
    icon: GraduationCap,
    name: "EduTech",
    description: "Educational technology platforms enhancing learning",
    color: "from-purple-500 to-indigo-600",
    href: "/products/edutech",
  },
  {
    icon: Stethoscope,
    name: "MedTech",
    description: "Medical technology solutions for better healthcare",
    color: "from-red-500 to-pink-600",
    href: "/products/medtech",
  },
  {
    icon: Heart,
    name: "HealthTech",
    description: "Healthcare technology systems improving patient care",
    color: "from-rose-500 to-red-600",
    href: "/products/healthtech",
  },
  {
    icon: Leaf,
    name: "GreenTech",
    description: "Environmental technology for sustainable future",
    color: "from-emerald-500 to-teal-600",
    href: "/products/greentech",
  },
]

export function TechSectorsSection() {
  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Technology Sectors We Cover</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover groundbreaking technologies across six key sectors that are revolutionizing industries and creating
            unprecedented opportunities for innovation.
          </p>
        </div>

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
              </CardHeader>
              <CardContent className="space-y-4">
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {sector.description}
                </CardDescription>
                <Link href={sector.href}>
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
  )
}
