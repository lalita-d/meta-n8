import { Button } from "@/components/ui/button"
import { ArrowRight, Rocket } from "lucide-react"
import Link from "next/link"

export function CTASection() {
  return (
    <section className="py-24 bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Shape the Future Together?</h2>
          <p className="text-xl text-gray-300 mb-12 max-w-3xl mx-auto leading-relaxed">
            Join our exclusive platform to access detailed product information, express interest in products, and get
            personalized support from our team. Connect with the right opportunities today.
          </p>

          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/auth/signup">
              <Button
                size="lg"
                className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg font-semibold"
              >
                <Rocket className="mr-2 h-5 w-5" />
                Get In Touch
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link href="/about">
              <Button
                size="lg"
                variant="outline"
                className="border-gray-600 text-gray-300 hover:bg-gray-800 hover:text-white px-8 py-4 text-lg font-semibold"
              >
                View Our Work
              </Button>
            </Link>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">📊</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Detailed Product Information</h3>
              <p className="text-gray-400">Access comprehensive details about our innovative eco-friendly solutions.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">👥</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Personalized Dashboard</h3>
              <p className="text-gray-400">Track your interests and manage your profile in a secure environment.</p>
            </div>
            <div className="bg-gray-800 p-6 rounded-lg">
              <div className="w-12 h-12 bg-green-600 rounded-lg flex items-center justify-center mb-4">
                <span className="text-white font-bold">💬</span>
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Direct Communication</h3>
              <p className="text-gray-400">Express interest in products and receive direct follow-up from our team.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
