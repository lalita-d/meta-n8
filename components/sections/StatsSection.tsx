import { Card, CardContent } from "@/components/ui/card"
import { Users, Briefcase, TrendingUp, Award } from "lucide-react"

const stats = [
  {
    icon: Users,
    value: "50K+",
    label: "Happy Customers",
    description: "Trusted by innovators worldwide",
  },
  {
    icon: Briefcase,
    value: "100+",
    label: "Innovations",
    description: "Cutting-edge solutions delivered",
  },
  {
    icon: TrendingUp,
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

export function StatsSection() {
  return (
    <section className="py-24 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-white mb-4">Our Impact in Numbers</h2>
          <p className="text-xl text-purple-100 max-w-3xl mx-auto">
            See how MetaVertex is making a difference in the tech innovation ecosystem
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <Card
              key={index}
              className="bg-white/10 backdrop-blur-sm border-white/20 text-center hover:bg-white/20 transition-colors duration-300"
            >
              <CardContent className="p-8">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <stat.icon className="h-8 w-8 text-white" />
                </div>
                <div className="text-4xl font-bold text-white mb-2">{stat.value}</div>
                <div className="text-xl font-semibold text-white mb-2">{stat.label}</div>
                <div className="text-purple-100 text-sm">{stat.description}</div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
