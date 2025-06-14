import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
  Lightbulb,
  TrendingUp,
  Users,
  MessageSquare,
  Shield,
  BarChart3,
  Zap,
  Globe,
  CheckCircle,
  ArrowRight,
} from "lucide-react"
import Link from "next/link"

const solutions = [
  {
    icon: Lightbulb,
    title: "For Founders",
    description: "Transform your innovative ideas into successful businesses with our comprehensive support system.",
    features: [
      "Product submission and showcase platform",
      "Direct access to verified investors",
      "Anonymous communication system",
      "Funding opportunity matching",
      "Business development support",
      "Mentorship connections",
    ],
    color: "from-purple-500 to-indigo-600",
    cta: "Submit Your Product",
    href: "/auth/signup",
  },
  {
    icon: TrendingUp,
    title: "For Investors",
    description: "Discover and invest in the most promising startups across multiple technology sectors.",
    features: [
      "Curated startup deal flow",
      "Detailed product information",
      "Risk assessment tools",
      "Portfolio management",
      "Direct founder communication",
      "Investment tracking analytics",
    ],
    color: "from-green-500 to-emerald-600",
    cta: "Explore Investments",
    href: "/auth/signup",
  },
  {
    icon: Users,
    title: "For Organizations",
    description: "Partner with innovative startups to drive digital transformation and competitive advantage.",
    features: [
      "Corporate innovation programs",
      "Strategic partnership opportunities",
      "Technology scouting services",
      "Pilot program facilitation",
      "Innovation consulting",
      "Custom matching services",
    ],
    color: "from-blue-500 to-cyan-600",
    cta: "Partner With Us",
    href: "/auth/signup",
  },
  {
    icon: MessageSquare,
    title: "For Mentors",
    description: "Share your expertise and guide the next generation of entrepreneurs to success.",
    features: [
      "Mentor-founder matching",
      "Structured mentorship programs",
      "Industry expertise sharing",
      "Network expansion opportunities",
      "Impact measurement tools",
      "Recognition and rewards",
    ],
    color: "from-orange-500 to-red-600",
    cta: "Become a Mentor",
    href: "/auth/signup",
  },
]

const platformFeatures = [
  {
    icon: Shield,
    title: "Anonymous Communication",
    description: "Secure, admin-managed communication system protecting privacy while enabling meaningful connections.",
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Comprehensive insights and data-driven decision making tools for all platform participants.",
  },
  {
    icon: Zap,
    title: "Real-time Matching",
    description: "AI-powered matching algorithm connecting the right founders with the right investors.",
  },
  {
    icon: Globe,
    title: "Global Network",
    description: "Access to a worldwide network of innovators, investors, and industry experts.",
  },
]

const successStories = [
  {
    company: "HydroGrow",
    sector: "AgriTech",
    funding: "£2.5M",
    description: "Revolutionary hydroponic farming solution that increased crop yields by 300%",
    outcome: "Series A completed in 6 months",
  },
  {
    company: "FinanceFlow",
    sector: "FinTech",
    funding: "£4.2M",
    description: "AI-powered financial analytics platform for SMEs",
    outcome: "Acquired by major bank",
  },
  {
    company: "EcoTrack",
    sector: "GreenTech",
    funding: "£1.8M",
    description: "Carbon footprint tracking and reduction platform for enterprises",
    outcome: "Expanded to 15 countries",
  },
]

export default function SolutionsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">Complete Innovation Solutions</h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90 max-w-4xl mx-auto">
            From idea to market success - we provide comprehensive solutions for every stage of your innovation journey.
            Connect, collaborate, and scale with confidence.
          </p>
          <Link href="/auth/signup">
            <Button size="lg" className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
              <Zap className="mr-2 h-5 w-5" />
              Start Your Journey
            </Button>
          </Link>
        </div>
      </section>

      {/* Solutions Grid */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Tailored Solutions for Every Role</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Whether you're building, investing, partnering, or mentoring, we have the right tools and network for your
              success.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {solutions.map((solution, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div
                    className={`w-16 h-16 bg-gradient-to-r ${solution.color} rounded-xl flex items-center justify-center mb-4`}
                  >
                    <solution.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{solution.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {solution.description}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-3">
                    {solution.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                  <Link href={solution.href}>
                    <Button className={`w-full bg-gradient-to-r ${solution.color} hover:opacity-90 transition-opacity`}>
                      {solution.cta}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Platform Features */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Platform Features</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Advanced technology and innovative features designed to accelerate your success
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {platformFeatures.map((feature, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                    <feature.icon className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real companies that found success through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {successStories.map((story, index) => (
              <Card key={index} className="border-0 shadow-lg">
                <CardHeader>
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <CardTitle className="text-xl font-bold text-gray-900">{story.company}</CardTitle>
                      <Badge variant="outline" className="mt-2">
                        {story.sector}
                      </Badge>
                    </div>
                    <div className="text-right">
                      <div className="text-2xl font-bold text-green-600">{story.funding}</div>
                      <div className="text-sm text-gray-500">Raised</div>
                    </div>
                  </div>
                  <CardDescription className="text-gray-600 leading-relaxed">{story.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                    <div className="flex items-center space-x-2">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <span className="font-medium text-green-800">{story.outcome}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
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
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
              >
                Learn More
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
