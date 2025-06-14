import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Users,
  Award,
  TrendingUp,
  Globe,
  Heart,
  Lightbulb,
  Shield,
  Zap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
  Youtube,
  Github,
} from "lucide-react"
import Link from "next/link"

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy Customers",
    description: "Trusted by innovators worldwide",
  },
  {
    icon: Lightbulb,
    value: "100+",
    label: "Innovations",
    description: "Cutting-edge solutions delivered",
  },
  {
    icon: Globe,
    value: "25+",
    label: "Countries",
    description: "Global reach and impact",
  },
  {
    icon: Award,
    value: "15+",
    label: "Awards Won",
    description: "Recognition for excellence",
  },
]

const values = [
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "We foster creativity and breakthrough thinking to solve complex challenges.",
    color: "text-yellow-600",
  },
  {
    icon: Heart,
    title: "Sustainability",
    description: "Building a responsible future through eco-friendly and sustainable practices.",
    color: "text-green-600",
  },
  {
    icon: Shield,
    title: "Integrity",
    description: "Maintaining the highest standards of ethics and transparency in all our operations.",
    color: "text-blue-600",
  },
  {
    icon: Zap,
    title: "Excellence",
    description: "Delivering exceptional quality and exceeding expectations in everything we do.",
    color: "text-purple-600",
  },
]

const team = [
  {
    name: "Dr. Sarah Johnson",
    role: "CEO & Founder",
    bio: "Former VP of Innovation at TechCorp with 15+ years in startup ecosystem",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Michael Chen",
    role: "CTO",
    bio: "Ex-Google engineer specializing in AI and machine learning platforms",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "Emma Williams",
    role: "Head of Partnerships",
    bio: "Former investment banker with extensive network in venture capital",
    image: "/placeholder.svg?height=300&width=300",
  },
  {
    name: "David Rodriguez",
    role: "Head of Product",
    bio: "Product strategist with successful exits in FinTech and HealthTech",
    image: "/placeholder.svg?height=300&width=300",
  },
]

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <Globe className="h-8 w-8 text-white" />
          </div>
          <h1 className="text-5xl md:text-6xl font-bold mb-6">About MetaVertex</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            Pioneering the future of sustainable technology since 2018, where innovation meets environmental
            responsibility.
          </p>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Our Story</h2>
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
                <p>Today, we're dedicated to making that future a reality through every innovation we create.</p>
              </div>
              <div className="mt-8 flex space-x-4">
                <Link href="/solutions">
                  <Button className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700">
                    Our Solutions
                  </Button>
                </Link>
                <Link href="/products">
                  <Button variant="outline">View Our Work</Button>
                </Link>
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

      {/* Stats Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Impact in Numbers</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              See how MetaVertex is making a difference in the tech innovation ecosystem
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <stat.icon className="h-8 w-8 text-white" />
                  </div>
                  <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Our Values */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Core Values</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              The principles that guide everything we do and drive our commitment to excellence
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => (
              <Card key={index} className="text-center border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-8">
                  <div className={`w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4`}>
                    <value.icon className={`h-8 w-8 ${value.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{value.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{value.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Meet Our Leadership Team</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Experienced leaders driving innovation and growth across all sectors
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {team.map((member, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow">
                <CardContent className="p-6 text-center">
                  <img
                    src={member.image || "/placeholder.svg"}
                    alt={member.name}
                    className="w-24 h-24 rounded-full mx-auto mb-4 object-cover"
                  />
                  <h3 className="text-xl font-semibold text-gray-900 mb-1">{member.name}</h3>
                  <Badge variant="outline" className="mb-3">
                    {member.role}
                  </Badge>
                  <p className="text-gray-600 text-sm leading-relaxed">{member.bio}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Connect Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Connect With Us</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Join our community and stay connected across all platforms for the latest updates and innovations.
          </p>

          <div className="flex justify-center space-x-6 mb-12">
            {[Facebook, Twitter, Linkedin, Instagram, Youtube, Github].map((Icon, index) => (
              <Link
                key={index}
                href="#"
                className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center hover:bg-white/30 transition-colors"
              >
                <Icon className="h-6 w-6 text-white" />
              </Link>
            ))}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">📍 Visit Us</h3>
              <p className="opacity-90">123 Green Street, Eco City, EC 12345</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">📧 Email Us</h3>
              <p className="opacity-90">info@metavertex.co.uk</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-lg p-6">
              <h3 className="text-xl font-semibold mb-3">📱 Call Us</h3>
              <p className="opacity-90">+91 7527866666</p>
            </div>
          </div>

          <div className="mt-12">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <TrendingUp className="mr-2 h-5 w-5" />
                Join Our Platform
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
