import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Lightbulb,
  TrendingUp,
  Users,
  MessageSquare,
  Shield,
  CheckCircle,
  ArrowRight,
  Rocket,
  Target,
  Zap,
} from "lucide-react"
import Link from "next/link"

const founderBenefits = [
  {
    icon: Lightbulb,
    title: "Showcase Your Innovation",
    description: "Present your product to a curated network of verified investors and industry experts.",
    features: ["Professional product profiles", "Rich media support", "Performance analytics", "Visibility boost"],
  },
  {
    icon: TrendingUp,
    title: "Access Funding Opportunities",
    description: "Connect with investors actively seeking opportunities in your sector.",
    features: ["Investor matching", "Funding stage alignment", "Direct communication", "Deal facilitation"],
  },
  {
    icon: Users,
    title: "Expert Mentorship",
    description: "Get guidance from experienced entrepreneurs and industry veterans.",
    features: ["1-on-1 mentoring", "Group sessions", "Industry insights", "Network expansion"],
  },
  {
    icon: Shield,
    title: "Secure Communication",
    description: "Anonymous, admin-managed communication system protecting your privacy.",
    features: ["Identity protection", "Filtered communications", "Professional moderation", "Secure messaging"],
  },
]

const successMetrics = [
  { value: "£50M+", label: "Total Funding Raised", description: "By founders on our platform" },
  { value: "200+", label: "Successful Connections", description: "Founder-investor matches" },
  { value: "85%", label: "Success Rate", description: "Of funded startups still active" },
  { value: "6 months", label: "Average Time", description: "From signup to funding" },
]

const process = [
  {
    step: "1",
    title: "Create Your Profile",
    description: "Sign up and build a comprehensive founder profile with your background and expertise.",
    icon: Users,
  },
  {
    step: "2",
    title: "Submit Your Product",
    description: "Upload detailed information about your product, including business plan and financials.",
    icon: Lightbulb,
  },
  {
    step: "3",
    title: "Get Verified",
    description: "Our team reviews and verifies your submission to ensure quality and authenticity.",
    icon: Shield,
  },
  {
    step: "4",
    title: "Connect with Investors",
    description: "Receive interest from investors and engage through our secure communication system.",
    icon: MessageSquare,
  },
  {
    step: "5",
    title: "Secure Funding",
    description: "Close deals with the right investors and scale your business to the next level.",
    icon: Rocket,
  },
]

export default function FoundersPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-purple-600 via-blue-600 to-cyan-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">For Founders</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Transform your innovative ideas into successful businesses. Connect with investors, mentors, and
                partners who believe in your vision.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Your Journey
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-purple-600 px-8 py-4 text-lg font-semibold"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Explore Sectors
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Founder success story"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -left-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">£2.5M</div>
                  <div className="text-sm text-gray-600">Average Funding</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MetaVertex?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We provide everything you need to take your startup from idea to successful business
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {founderBenefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
                    <benefit.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-2xl font-bold text-gray-900">{benefit.title}</CardTitle>
                  <CardDescription className="text-gray-600 text-base leading-relaxed">
                    {benefit.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {benefit.features.map((feature, idx) => (
                      <div key={idx} className="flex items-center space-x-3">
                        <CheckCircle className="h-5 w-5 text-green-600 flex-shrink-0" />
                        <span className="text-gray-700">{feature}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Success Metrics */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Founder Success Stories</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Real results from founders who found success through our platform
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {successMetrics.map((metric, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-purple-600 mb-2">{metric.value}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{metric.label}</div>
                  <div className="text-gray-600 text-sm">{metric.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Path to Success</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our proven 5-step process to connect with the right investors and secure funding
            </p>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-purple-600 mb-2">Step {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>

                  {/* Arrow for desktop */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-purple-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Build the Future?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Join thousands of successful founders who have transformed their ideas into thriving businesses. Your
            innovation journey starts here.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-purple-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Zap className="mr-2 h-5 w-5" />
                Get Started Now
              </Button>
            </Link>
            <Link href="/solutions">
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
