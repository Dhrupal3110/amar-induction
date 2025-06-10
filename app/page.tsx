"use client"

import { useState } from "react"
import { Menu, X, Phone, Mail, MapPin, Factory, Zap, Settings, Flame, ArrowRight, CheckCircle2 } from "lucide-react"
import { InquiryForm } from "@/components/InquiryForm";

// A reusable component for section headers to maintain consistency
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-neutral-charcoal mb-4">{title}</h2>
    <p className="text-lg text-neutral-charcoal/60 max-w-2xl mx-auto">{subtitle}</p>
    <div className="w-24 h-1.5 bg-brand-purple mx-auto mt-6 rounded-full"></div>
  </div>
)

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

  const navLinks = [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "products", label: "Products" },
    { id: "contact", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-white font-sans antialiased">
      {/* --- Improvement: Enhanced Navigation with clearer hover states --- */}
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
              <img src="/default.png" alt="Amar Induction Logo" className="h-16" />
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-neutral-charcoal/70 hover:text-brand-purple px-4 py-2 text-sm font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-purple transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                  className="bg-brand-purple text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-blue transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get a Quote
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-neutral-charcoal hover:text-brand-purple p-2">
                {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>

          {isMenuOpen && (
            <div className="md:hidden">
              <div className="px-2 pt-2 pb-4 space-y-2 sm:px-3 bg-white border-t border-gray-200/60">
                {navLinks.map((link) => (
                   <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    className="text-neutral-charcoal hover:bg-neutral-gray block px-3 py-3 text-base font-medium w-full text-left transition-colors rounded-md"
                  >
                    {link.label}
                  </button>
                ))}
                 <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-brand-purple text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-brand-blue transition-colors mt-2"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Improvement: More subtle gradient with enhanced text readability --- */}
      <section id="home" className="relative pt-20 bg-brand-blue overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-blue to-brand-pink opacity-90"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-5"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in tracking-tight drop-shadow-md">Precision Through Induction</h1>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto animate-fade-in-delay drop-shadow-sm">
              Global leaders in manufacturing advanced induction melting, hardening, and forging solutions.
            </p>
            <button
              onClick={() => scrollToSection("products")}
              className="bg-white text-brand-purple px-8 py-4 rounded-lg font-bold text-lg hover:bg-neutral-gray transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in-delay-2 flex items-center justify-center mx-auto gap-2"
            >
              Explore Our Solutions <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

      {/* --- Improvement: Increased spacing and refined card design --- */}
      <section id="about" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Excellence in Induction Technology"
            subtitle="For decades, we have been the trusted partner for industries worldwide, delivering unparalleled quality and innovation."
          />
          <div className="grid md:grid-cols-2 gap-16 items-center mt-20">
            <div className="prose prose-lg max-w-none text-neutral-charcoal/80">
              <h3 className="text-2xl font-bold text-neutral-charcoal mb-4">Our Commitment to Quality</h3>
              <p>
                Amar Induction stands at the forefront of induction technology, specializing in cutting-edge melting and hardening solutions. Our commitment is to provide our clients with reliable, efficient, and state-of-the-art induction systems.
              </p>
              <p>
                Our advanced manufacturing facilities and skilled professionals ensure every product meets the highest international standards of quality and performance, serving diverse industries from automotive to aerospace.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-8">
              <div className="bg-neutral-gray p-6 rounded-xl text-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="bg-brand-blue text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Factory size={32} />
                </div>
                <h4 className="font-bold text-neutral-charcoal text-lg">Advanced Manufacturing</h4>
              </div>
              <div className="bg-neutral-gray p-6 rounded-xl text-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="bg-brand-blue text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap size={32} />
                </div>
                <h4 className="font-bold text-neutral-charcoal text-lg">Cutting-Edge Innovation</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* --- Improvement: Cleaner, professional product cards without gradients --- */}
      <section id="products" className="py-28 bg-neutral-gray">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Core Products"
            subtitle="Engineered for performance, our solutions are trusted by industry leaders for their reliability and efficiency."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[{icon: Factory, title: "Induction Melting Systems"}, {icon: Zap, title: "Induction Hardening Systems"}, {icon: Settings, title: "Custom Engineered Solutions"}].map((product, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group">
                <div className="p-8">
                  <div className="w-16 h-16 bg-brand-purple/10 text-brand-purple rounded-lg flex items-center justify-center mb-6">
                    <product.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-charcoal mb-3">{product.title}</h3>
                  <p className="text-neutral-charcoal/70 mb-6 text-sm leading-relaxed">
                    High-efficiency systems for various metals including steel, iron, and aluminum. Available in different capacities to suit your production needs.
                  </p>
                  <button onClick={() => scrollToSection('contact')} className="font-bold text-brand-purple text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- Improvement: Modernized contact layout and form styling --- */}
      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Let's Build the Future Together"
            subtitle="Ready to discuss your induction requirements? Reach out to our expert team today for a consultation or quote."
          />
          <div className="mt-20 max-w-5xl mx-auto grid lg:grid-cols-2 gap-4 bg-neutral-gray p-4 rounded-2xl shadow-xl">
            <div className="bg-brand-blue text-white rounded-xl p-10 flex flex-col">
              <h3 className="text-3xl font-bold mb-4">Contact Information</h3>
              <p className="text-white/70 mb-8">Find us at our office or contact us via phone or email.</p>
              <div className="space-y-6 mt-auto">
                <div className="flex items-center space-x-4"><Phone size={20} /><p>+91 76001 34687</p></div>
                <div className="flex items-center space-x-4"><Mail size={20} /><p>sales@amarinduction.com</p></div>
                <div className="flex items-start space-x-4">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <p>Plot No.26/2, Oscar industrial Park-2, Ribda, Rajkot, Gujarat 360311, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-10">
              <h3 className="text-2xl font-bold text-neutral-charcoal mb-6">Send an Inquiry</h3>
              {/* <form action={'https://formspree.io/f/xyzjeoer'} method="POST" className="space-y-5">
                <input type="text" name="name" required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple" placeholder="Full Name *" />
                <input type="email" name="email" required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple" placeholder="Email Address *" />
                <textarea name="message" rows={4} required className="w-full px-4 py-3 bg-neutral-gray border-transparent rounded-lg focus:ring-2 focus:ring-brand-purple resize-vertical" placeholder="Your Message... *"></textarea>
                <button type="submit" className="w-full bg-brand-purple text-white py-4 px-6 rounded-lg font-bold text-lg hover:bg-brand-blue transition-colors duration-300 transform hover:scale-105">
                  Submit Inquiry
                </button>
              </form> */}
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
              <Flame className="w-8 h-8 text-brand-purple" />
              <h3 className="text-2xl font-bold text-white">Amar Induction</h3>
            </div>
            <p className="text-white/70 mb-8 max-w-md mx-auto">Precision Through Induction: Delivering state-of-the-art heating and melting solutions across the globe.</p>
            <div className="flex justify-center space-x-6">
                {navLinks.map((link) => (
                  <button key={link.id} onClick={() => scrollToSection(link.id)} className="text-white/60 hover:text-white transition-colors">
                    {link.label}
                  </button>
                ))}
            </div>
            <p className="text-white/40 text-sm mt-10">
              © {new Date().getFullYear()} Amar Induction. All Rights Reserved.
            </p>
          </div>
        </div>
      </footer>
    </div>
  )
}