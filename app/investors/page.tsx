import { Navbar } from "@/components/layout/Navbar"
import { Footer } from "@/components/layout/Footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  TrendingUp,
  BarChart3,
  Shield,
  Users,
  Target,
  Zap,
  CheckCircle,
  ArrowRight,
  DollarSign,
  Eye,
  MessageSquare,
} from "lucide-react"
import Link from "next/link"

const investorBenefits = [
  {
    icon: Target,
    title: "Curated Deal Flow",
    description: "Access pre-screened, high-quality startups across multiple technology sectors.",
    features: ["Verified founders", "Detailed due diligence", "Sector-specific filtering", "Quality assurance"],
  },
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Make data-driven investment decisions with comprehensive analytics and insights.",
    features: ["Market analysis", "Risk assessment", "Performance tracking", "ROI projections"],
  },
  {
    icon: Shield,
    title: "Secure Platform",
    description: "Anonymous communication and secure document sharing protect your privacy.",
    features: ["Identity protection", "Encrypted communications", "Secure file sharing", "Audit trails"],
  },
  {
    icon: Users,
    title: "Network Access",
    description: "Connect with other investors, mentors, and industry experts in our ecosystem.",
    features: ["Investor community", "Co-investment opportunities", "Expert networks", "Industry events"],
  },
]

const investmentStats = [
  { value: "£150M+", label: "Total Investments", description: "Facilitated through our platform" },
  { value: "500+", label: "Verified Startups", description: "Across all technology sectors" },
  { value: "92%", label: "Success Rate", description: "Of investments still performing" },
  { value: "3.2x", label: "Average Return", description: "On successful investments" },
]

const sectors = [
  { name: "AgriTech", percentage: 25, color: "bg-green-500" },
  { name: "FinTech", percentage: 20, color: "bg-blue-500" },
  { name: "HealthTech", percentage: 18, color: "bg-red-500" },
  { name: "GreenTech", percentage: 15, color: "bg-emerald-500" },
  { name: "EduTech", percentage: 12, color: "bg-purple-500" },
  { name: "MedTech", percentage: 10, color: "bg-pink-500" },
]

const process = [
  {
    step: "1",
    title: "Join the Platform",
    description: "Create your investor profile and specify your investment criteria and preferences.",
    icon: Users,
  },
  {
    step: "2",
    title: "Browse Opportunities",
    description: "Access curated startup profiles with detailed information and analytics.",
    icon: Eye,
  },
  {
    step: "3",
    title: "Express Interest",
    description: "Submit interest forms for startups that match your investment thesis.",
    icon: MessageSquare,
  },
  {
    step: "4",
    title: "Due Diligence",
    description: "Conduct thorough due diligence with access to documents and founder communications.",
    icon: BarChart3,
  },
  {
    step: "5",
    title: "Make Investment",
    description: "Complete your investment and join the startup's journey to success.",
    icon: DollarSign,
  },
]

export default function InvestorsPage() {
  return (
    <div className="min-h-screen">
      <Navbar />

      {/* Hero Section */}
      <section className="pt-24 pb-16 bg-gradient-to-br from-green-600 via-blue-600 to-purple-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-white">
              <h1 className="text-5xl md:text-6xl font-bold mb-6">For Investors</h1>
              <p className="text-xl md:text-2xl mb-8 opacity-90">
                Discover and invest in the most promising startups across multiple technology sectors. Access curated
                deal flow and make data-driven investment decisions.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="/auth/signup">
                  <Button
                    size="lg"
                    className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold"
                  >
                    <TrendingUp className="mr-2 h-5 w-5" />
                    Start Investing
                  </Button>
                </Link>
                <Link href="/products">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold"
                  >
                    <Target className="mr-2 h-5 w-5" />
                    Browse Startups
                  </Button>
                </Link>
              </div>
            </div>
            <div className="relative">
              <img
                src="/placeholder.svg?height=500&width=600"
                alt="Investment analytics dashboard"
                className="rounded-lg shadow-2xl"
              />
              <div className="absolute -bottom-6 -right-6 bg-white p-6 rounded-lg shadow-lg">
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-600">3.2x</div>
                  <div className="text-sm text-gray-600">Avg. Return</div>
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
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Invest with MetaVertex?</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Access the best investment opportunities with comprehensive support and analytics
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {investorBenefits.map((benefit, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardHeader>
                  <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-xl flex items-center justify-center mb-4">
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

      {/* Investment Stats */}
      <section className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Investment Performance</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Track record of successful investments and returns for our investor community
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
            {investmentStats.map((stat, index) => (
              <Card key={index} className="text-center border-0 shadow-lg">
                <CardContent className="p-8">
                  <div className="text-4xl font-bold text-green-600 mb-2">{stat.value}</div>
                  <div className="text-xl font-semibold text-gray-900 mb-2">{stat.label}</div>
                  <div className="text-gray-600 text-sm">{stat.description}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Sector Distribution */}
          <Card className="border-0 shadow-lg">
            <CardHeader>
              <CardTitle className="text-2xl font-bold text-gray-900 text-center">
                Investment Distribution by Sector
              </CardTitle>
              <CardDescription className="text-center">
                Diversified portfolio across high-growth technology sectors
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {sectors.map((sector, index) => (
                  <div key={index} className="flex items-center space-x-4">
                    <div className="w-24 text-sm font-medium">{sector.name}</div>
                    <div className="flex-1 bg-gray-200 rounded-full h-3">
                      <div
                        className={`h-3 rounded-full ${sector.color}`}
                        style={{ width: `${sector.percentage}%` }}
                      ></div>
                    </div>
                    <div className="w-12 text-sm font-semibold text-right">{sector.percentage}%</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Your Investment Journey</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Follow our streamlined 5-step process to discover and invest in promising startups
            </p>
          </div>

          <div className="relative">
            {/* Process Steps */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-8">
              {process.map((step, index) => (
                <div key={index} className="relative">
                  <Card className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
                    <CardContent className="p-6 text-center">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-600 to-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                        <step.icon className="h-8 w-8 text-white" />
                      </div>
                      <div className="text-2xl font-bold text-green-600 mb-2">Step {step.step}</div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">{step.title}</h3>
                      <p className="text-gray-600 text-sm leading-relaxed">{step.description}</p>
                    </CardContent>
                  </Card>

                  {/* Arrow for desktop */}
                  {index < process.length - 1 && (
                    <div className="hidden md:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-10">
                      <ArrowRight className="h-8 w-8 text-green-600" />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-green-600 to-blue-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center text-white">
          <h2 className="text-4xl font-bold mb-6">Ready to Discover Your Next Investment?</h2>
          <p className="text-xl mb-12 max-w-3xl mx-auto opacity-90">
            Join our exclusive network of investors and get access to the most promising startups across multiple
            technology sectors. Start building your portfolio today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button size="lg" className="bg-white text-green-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold">
                <Zap className="mr-2 h-5 w-5" />
                Join as Investor
              </Button>
            </Link>
            <Link href="/solutions">
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-green-600 px-8 py-4 text-lg font-semibold"
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
