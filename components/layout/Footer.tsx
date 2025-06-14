import Link from "next/link"
import { Facebook, Twitter, Linkedin, Instagram, Youtube, Github } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Company Info */}
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">MV</span>
              </div>
              <span className="text-xl font-bold">Metavertex</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Innovative sustainable solutions for a better tomorrow. Join our community and stay connected across all
              platforms.
            </p>
            <div className="flex space-x-4">
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Facebook className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Twitter className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Linkedin className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Instagram className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Youtube className="h-5 w-5" />
              </Link>
              <Link href="#" className="text-gray-400 hover:text-white transition-colors">
                <Github className="h-5 w-5" />
              </Link>
            </div>
          </div>

          {/* Products */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-green-400">🌱 Products</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/products/hydroponics" className="text-gray-400 hover:text-white transition-colors">
                  Hydroponics
                </Link>
              </li>
              <li>
                <Link href="/products/ecg-monitoring" className="text-gray-400 hover:text-white transition-colors">
                  ECG Monitoring
                </Link>
              </li>
              <li>
                <Link href="/products/health-parameters" className="text-gray-400 hover:text-white transition-colors">
                  Health Parameter Systems
                </Link>
              </li>
              <li>
                <Link href="/products/terrace-gardens" className="text-gray-400 hover:text-white transition-colors">
                  Terrace Garden Solutions
                </Link>
              </li>
            </ul>
          </div>

          {/* Partnerships */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-yellow-400">🤝 Our Partnerships</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/partnerships/noblad" className="text-gray-400 hover:text-white transition-colors">
                  Noblad
                </Link>
              </li>
              <li>
                <Link href="/partnerships/v-hub" className="text-gray-400 hover:text-white transition-colors">
                  V Hub
                </Link>
              </li>
              <li>
                <Link href="/partnerships/ozones" className="text-gray-400 hover:text-white transition-colors">
                  Ozones
                </Link>
              </li>
              <li>
                <Link href="/partnerships/d-school" className="text-gray-400 hover:text-white transition-colors">
                  D School
                </Link>
              </li>
            </ul>
          </div>

          {/* Company & Contact */}
          <div>
            <h3 className="text-lg font-semibold mb-4 text-purple-400">🏢 Company</h3>
            <ul className="space-y-2 text-sm mb-6">
              <li>
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/careers" className="text-gray-400 hover:text-white transition-colors">
                  Careers
                </Link>
              </li>
              <li>
                <Link href="/partners" className="text-gray-400 hover:text-white transition-colors">
                  Partners
                </Link>
              </li>
              <li>
                <Link href="/blog" className="text-gray-400 hover:text-white transition-colors">
                  Blog
                </Link>
              </li>
            </ul>

            <h4 className="text-lg font-semibold mb-4 text-red-400">📞 Contact</h4>
            <div className="space-y-2 text-sm text-gray-400">
              <p>📍 123 Green Street, Eco City, EC 12345</p>
              <p>📧 info@metavertex.co.uk</p>
              <p>📱 +91 7527866666</p>
              <p>🌐 metavertex.co.uk</p>
            </div>
          </div>
        </div>

        {/* Newsletter Signup */}
        <div className="bg-gradient-to-r from-green-600 to-purple-600 rounded-lg p-8 mb-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">Stay Updated</h3>
            <p className="text-green-100 mb-6">Get the latest news and updates from Metavertex</p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                placeholder="Enter your email"
                className="flex-1 px-4 py-2 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
              />
              <button className="bg-white text-purple-600 px-6 py-2 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-400 text-sm">© 2025 MetaVertex.co.uk. All rights reserved.</p>
          <div className="flex space-x-6 mt-4 md:mt-0">
            <Link href="/privacy" className="text-gray-400 hover:text-white text-sm transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="text-gray-400 hover:text-white text-sm transition-colors">
              Terms of Service
            </Link>
            <Link href="/cookies" className="text-gray-400 hover:text-white text-sm transition-colors">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
