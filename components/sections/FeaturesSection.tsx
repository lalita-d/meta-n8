import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, MessageSquare, BarChart3, Zap, Globe } from "lucide-react"

const features = [
  {
    icon: Shield,
    title: "Anonymous Communication",
    description:
      "Secure, anonymous communication system managed by our admin team to protect your privacy while facilitating meaningful connections.",
  },
  {
    icon: Users,
    title: "Multi-User Platform",
    description:
      "Connect founders, investors, organizations, and mentors in a unified ecosystem designed for collaboration and growth.",
  },
  {
    icon: MessageSquare,
    title: "Admin-Managed Interactions",
    description:
      "All communications are filtered and managed by our admin team to ensure quality, relevance, and professional standards.",
  },
  {
    icon: BarChart3,
    title: "Real-Time Analytics",
    description:
      "Comprehensive analytics and insights to track engagement, measure success, and optimize your platform experience.",
  },
  {
    icon: Zap,
    title: "Instant Notifications",
    description:
      "Stay updated with real-time notifications for new opportunities, messages, and important platform activities.",
  },
  {
    icon: Globe,
    title: "Global Reach",
    description:
      "Connect with innovators, investors, and organizations from around the world across multiple tech sectors.",
  },
]

export function FeaturesSection() {
  return (
    <section className="py-24 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Why Choose MetaVertex?</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Our platform offers unique features designed to facilitate meaningful connections and drive innovation
            across multiple technology sectors.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-shadow duration-300">
              <CardHeader>
                <div className="w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center mb-4">
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-semibold text-gray-900">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-gray-600 text-base leading-relaxed">
                  {feature.description}
                </CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
