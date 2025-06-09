"use client"

import { useState } from "react"
import { Menu, X, Phone, Mail, MapPin, Factory, Zap, Settings } from "lucide-react"

export default function AmarInductionWebsite() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setIsMenuOpen(false)
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Navigation */}
      <nav className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-sm border-b border-gray-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex-shrink-0">
              <h1 className="text-2xl font-bold text-[#005f99]">Amar Induction</h1>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-[#444] hover:text-[#005f99] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-[#444] hover:text-[#005f99] px-3 py-2 text-sm font-medium transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-[#444] hover:text-[#005f99] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[#444] hover:text-[#005f99] px-3 py-2 text-sm font-medium transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-[#444] hover:text-[#005f99] p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 bg-white border-t border-gray-200">
                <button
                  onClick={() => scrollToSection("home")}
                  className="text-[#444] hover:text-[#005f99] block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className="text-[#444] hover:text-[#005f99] block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("products")}
                  className="text-[#444] hover:text-[#005f99] block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  Products
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className="text-[#444] hover:text-[#005f99] block px-3 py-2 text-base font-medium w-full text-left transition-colors"
                >
                  Contact
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="pt-16 bg-gradient-to-br from-[#005f99] to-[#0077cc] text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 animate-fade-in">Amar Induction</h1>
            <p className="text-xl md:text-2xl mb-8 text-blue-100 animate-fade-in-delay">Precision Through Induction</p>
            <p className="text-lg mb-12 text-blue-100 max-w-2xl mx-auto animate-fade-in-delay-2">
              Leading manufacturer and exporter of advanced induction melting and hardening solutions for industrial
              applications worldwide.
            </p>
            <button
              onClick={() => scrollToSection("products")}
              className="bg-white text-[#005f99] px-8 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 transition-all duration-300 transform hover:scale-105 shadow-lg animate-fade-in-delay-3"
            >
              Explore Our Solutions
            </button>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#444] mb-4">About Amar Induction</h2>
            <div className="w-24 h-1 bg-[#005f99] mx-auto"></div>
          </div>

          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h3 className="text-2xl font-semibold text-[#444] mb-6">Industry Excellence Since Inception</h3>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Amar Induction stands at the forefront of induction technology, specializing in the design,
                manufacturing, and export of cutting-edge induction melting and hardening solutions. With years of
                industry expertise, we have established ourselves as a trusted partner for businesses seeking reliable
                and efficient induction systems.
              </p>
              <p className="text-gray-600 mb-6 leading-relaxed">
                Our state-of-the-art manufacturing facilities are equipped with advanced technology and operated by
                skilled professionals who ensure every product meets the highest quality standards. We serve clients
                across diverse industries including automotive, aerospace, foundries, and metal processing.
              </p>
              <p className="text-gray-600 leading-relaxed">
                As a global exporter, we pride ourselves on delivering innovative solutions that enhance productivity,
                reduce energy consumption, and provide exceptional value to our international clientele.
              </p>
            </div>

            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="bg-[#005f99] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Factory size={32} />
                  </div>
                  <h4 className="font-semibold text-[#444] mb-2">Manufacturing</h4>
                  <p className="text-sm text-gray-600">Advanced production facilities</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#005f99] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Zap size={32} />
                  </div>
                  <h4 className="font-semibold text-[#444] mb-2">Innovation</h4>
                  <p className="text-sm text-gray-600">Cutting-edge technology</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#005f99] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <Settings size={32} />
                  </div>
                  <h4 className="font-semibold text-[#444] mb-2">Precision</h4>
                  <p className="text-sm text-gray-600">Exact specifications</p>
                </div>
                <div className="text-center">
                  <div className="bg-[#005f99] text-white w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                    <MapPin size={32} />
                  </div>
                  <h4 className="font-semibold text-[#444] mb-2">Global Reach</h4>
                  <p className="text-sm text-gray-600">Worldwide export services</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Section */}
      <section id="products" className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#444] mb-4">Our Products</h2>
            <div className="w-24 h-1 bg-[#005f99] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover our comprehensive range of induction solutions designed to meet diverse industrial requirements
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Product 1 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-[#005f99] to-[#0077cc] flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Induction Melting Machines"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute text-white text-center">
                  <Factory size={64} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Melting Systems</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#444] mb-3">Induction Melting Machines</h3>
                <p className="text-gray-600 mb-4">
                  High-efficiency induction melting systems for various metals including steel, iron, copper, and
                  aluminum. Available in different capacities to suit your production needs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Energy efficient operation</li>
                  <li>• Precise temperature control</li>
                  <li>• Multiple capacity options</li>
                  <li>• Easy maintenance</li>
                </ul>
              </div>
            </div>

            {/* Product 2 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-[#005f99] to-[#0077cc] flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Hardening Systems"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute text-white text-center">
                  <Zap size={64} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Hardening Systems</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#444] mb-3">Induction Hardening Systems</h3>
                <p className="text-gray-600 mb-4">
                  Advanced induction hardening equipment for surface treatment of automotive parts, tools, and machinery
                  components with precise heat treatment control.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Uniform hardening patterns</li>
                  <li>• Automated process control</li>
                  <li>• Reduced distortion</li>
                  <li>• Fast processing times</li>
                </ul>
              </div>
            </div>

            {/* Product 3 */}
            <div className="bg-gray-50 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
              <div className="h-48 bg-gradient-to-br from-[#005f99] to-[#0077cc] flex items-center justify-center">
                <img
                  src="/placeholder.svg?height=200&width=300"
                  alt="Custom Solutions"
                  className="w-full h-full object-cover opacity-20"
                />
                <div className="absolute text-white text-center">
                  <Settings size={64} className="mx-auto mb-4" />
                  <h3 className="text-xl font-semibold">Custom Solutions</h3>
                </div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-[#444] mb-3">Custom Induction Solutions</h3>
                <p className="text-gray-600 mb-4">
                  Tailored induction systems designed to meet specific industrial requirements. From concept to
                  commissioning, we deliver solutions that fit your exact needs.
                </p>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• Bespoke design approach</li>
                  <li>• Application-specific engineering</li>
                  <li>• Complete project management</li>
                  <li>• Ongoing technical support</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-[#444] mb-4">Contact Us</h2>
            <div className="w-24 h-1 bg-[#005f99] mx-auto mb-6"></div>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Ready to discuss your induction solution requirements? Get in touch with our expert team today.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-[#444] mb-6">Send us an Inquiry</h3>
              <form className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-[#444] mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f99] focus:border-transparent transition-colors"
                    placeholder="Enter your full name"
                  />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-[#444] mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f99] focus:border-transparent transition-colors"
                    placeholder="Enter your email address"
                  />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-[#444] mb-2">
                    Message *
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    rows={5}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005f99] focus:border-transparent transition-colors resize-vertical"
                    placeholder="Tell us about your requirements..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full bg-[#005f99] text-white py-3 px-6 rounded-lg font-semibold hover:bg-[#004d7a] transition-colors duration-300 transform hover:scale-105"
                >
                  Send Inquiry
                </button>
              </form>
            </div>

            {/* Contact Information */}
            <div className="space-y-8">
              <div className="bg-white rounded-lg shadow-lg p-8">
                <h3 className="text-2xl font-semibold text-[#444] mb-6">Get in Touch</h3>

                <div className="space-y-6">
                  <div className="flex items-start space-x-4">
                    <div className="bg-[#005f99] text-white p-3 rounded-lg">
                      <Phone size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#444] mb-1">Phone</h4>
                      <p className="text-gray-600">+91 76001 34687</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#005f99] text-white p-3 rounded-lg">
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#444] mb-1">Email</h4>
                      <p className="text-gray-600">sales@amarinduction.com</p>
                    </div>
                  </div>

                  <div className="flex items-start space-x-4">
                    <div className="bg-[#005f99] text-white p-3 rounded-lg">
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 className="font-semibold text-[#444] mb-1">Address</h4>
                      <p className="text-gray-600">
                        Plot No.26/2, Oscar industrial Park-2
                        <br />
                        Ribda, Rajkot
                        <br />
                        Gujrat 360311, India
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-[#005f99] text-white rounded-lg p-8">
                <h3 className="text-xl font-semibold mb-4">Why Choose Amar Induction?</h3>
                <ul className="space-y-3 text-blue-100">
                  {/* <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>25+ years of industry experience</span>
                  </li> */}
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>ISO certified manufacturing processes</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Global export to 50+ countries</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>24/7 technical support</span>
                  </li>
                  <li className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                    <span>Custom solutions for unique requirements</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#444] text-white py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h3 className="text-2xl font-bold text-white mb-2">Amar Induction</h3>
            <p className="text-gray-300 mb-4">Precision Through Induction</p>
            <p className="text-gray-400 text-sm">
              © 2024 Amar Induction. All rights reserved. | Designed for excellence in induction technology.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}
