"use client"

import { useState } from "react"
import { Menu, X, Phone, Mail, MapPin, Factory, Zap, Settings, ArrowRight } from "lucide-react"
import { InquiryForm } from "@/components/InquiryForm";

// A reusable component for section headers to maintain consistency
const SectionHeader = ({ title, subtitle }: { title: string; subtitle: string }) => (
  <div className="text-center mb-16">
    <h2 className="text-3xl md:text-4xl font-bold text-neutral-charcoal mb-4">{title}</h2>
    <p className="text-lg text-neutral-charcoal/60 max-w-2xl mx-auto">{subtitle}</p>
    {/* --- Color Update: Underline is now the brand orange --- */}
    <div className="w-24 h-1.5 bg-brand-orange mx-auto mt-6 rounded-full"></div>
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
    <div className="min-h-screen bg-neutral-white font-sans antialiased">
      <nav className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-lg border-b border-gray-200/60 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex-shrink-0 flex items-center space-x-3 cursor-pointer" onClick={() => scrollToSection("home")}>
                {/* --- You can use your actual logo file here --- */}
                <img src="/default.png" alt="Amar Induction Logo" className="h-12" />
                {/* <span className="text-2xl font-bold text-neutral-charcoal">Amar Induction</span> */}
            </div>

            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-4">
                {navLinks.map((link) => (
                  <button
                    key={link.id}
                    onClick={() => scrollToSection(link.id)}
                    // --- Color Update: Hover effect uses brand orange ---
                    className="text-neutral-charcoal/70 hover:text-brand-orange px-4 py-2 text-sm font-medium transition-colors relative group"
                  >
                    {link.label}
                    <span className="absolute bottom-0 left-0 w-full h-0.5 bg-brand-orange transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
                  </button>
                ))}
                <button
                  onClick={() => scrollToSection("contact")}
                   // --- Color Update: Button uses brand orange ---
                  className="bg-brand-orange text-white px-5 py-2.5 rounded-lg text-sm font-semibold hover:bg-brand-red transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                >
                  Get a Quote
                </button>
              </div>
            </div>

            <div className="md:hidden">
              <button onClick={toggleMenu} className="text-neutral-charcoal hover:text-brand-orange p-2">
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
                    className="text-neutral-charcoal hover:bg-neutral-white block px-3 py-3 text-base font-medium w-full text-left transition-colors rounded-md"
                  >
                    {link.label}
                  </button>
                ))}
                 <button
                  onClick={() => scrollToSection("contact")}
                  className="w-full bg-brand-orange text-white px-4 py-3 rounded-lg text-base font-semibold hover:bg-brand-red transition-colors mt-2"
                >
                  Get a Quote
                </button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* --- Color Update: New orange to red gradient for hero section --- */}
      <section id="home" className="relative pt-20 bg-brand-orange overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-brand-orange to-brand-red"></div>
        <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-repeat opacity-10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 lg:py-48 z-10">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-extrabold text-white mb-6 animate-fade-in tracking-tight drop-shadow-md">Precision Through Induction</h1>
            <p className="text-lg md:text-xl mb-12 text-white/80 max-w-3xl mx-auto animate-fade-in-delay drop-shadow-sm">
              Global leaders in manufacturing advanced induction melting, hardening, and forging solutions.
            </p>
            <button
              onClick={() => scrollToSection("products")}
              // --- Color Update: Button text now brand orange ---
              className="bg-white text-brand-orange px-8 py-4 rounded-lg font-bold text-lg hover:bg-gray-200 transition-all duration-300 transform hover:scale-105 shadow-2xl animate-fade-in-delay-2 flex items-center justify-center mx-auto gap-2"
            >
              Explore Our Solutions <ArrowRight size={20} />
            </button>
          </div>
        </div>
      </section>

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
              <div className="bg-neutral-white p-6 rounded-xl text-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                 {/* --- Color Update: Icon bubble now brand orange --- */}
                <div className="bg-brand-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Factory size={32} />
                </div>
                <h4 className="font-bold text-neutral-charcoal text-lg">Advanced Manufacturing</h4>
              </div>
              <div className="bg-neutral-white p-6 rounded-xl text-center transition-all duration-300 hover:bg-white hover:shadow-xl hover:-translate-y-2">
                <div className="bg-brand-orange text-white w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-4">
                  <Zap size={32} />
                </div>
                <h4 className="font-bold text-neutral-charcoal text-lg">Cutting-Edge Innovation</h4>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <section id="products" className="py-28 bg-neutral-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Our Core Products"
            subtitle="Engineered for performance, our solutions are trusted by industry leaders for their reliability and efficiency."
          />
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {[{icon: Factory, title: "Induction Melting Systems"}, {icon: Zap, title: "Induction Hardening Systems"}, {icon: Settings, title: "Custom Engineered Solutions"}].map((product, i) => (
              <div key={i} className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 group border border-gray-200/60">
                <div className="p-8">
                  {/* --- Color Update: Icon bubble is orange themed --- */}
                  <div className="w-16 h-16 bg-brand-orange/10 text-brand-orange rounded-lg flex items-center justify-center mb-6">
                    <product.icon size={32} />
                  </div>
                  <h3 className="text-xl font-bold text-neutral-charcoal mb-3">{product.title}</h3>
                  <p className="text-neutral-charcoal/70 mb-6 text-sm leading-relaxed">
                    High-efficiency systems for various metals including steel, iron, and aluminum. Available in different capacities to suit your production needs.
                  </p>
                   {/* --- Color Update: Link is orange --- */}
                  <button onClick={() => scrollToSection('contact')} className="font-bold text-brand-orange text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                    Learn More <ArrowRight size={16} />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="py-28 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionHeader
            title="Let's Build the Future Together"
            subtitle="Ready to discuss your induction requirements? Reach out to our expert team today for a consultation or quote."
          />
          <div className="mt-20 max-w-5xl mx-auto grid lg:grid-cols-2 gap-4 bg-neutral-white p-4 rounded-2xl shadow-xl">
             {/* --- Color Update: Contact info block is now dark charcoal for a premium look --- */}
            <div className="bg-neutral-charcoal text-white rounded-xl p-10 flex flex-col">
              <h3 className="text-3xl font-bold mb-4">Contact Information</h3>
              <p className="text-white/70 mb-8">Find us at our office or contact us via phone or email.</p>
              <div className="space-y-6 mt-auto">
                <div className="flex items-center space-x-4"><Phone size={20} className="text-brand-orange"/>
                  <p>+91 76001 34687</p>
                </div>
                <div className="flex items-center space-x-4"><Mail size={20} className="text-brand-orange"/>
                  <p>sales@amarinduction.com</p>
                </div>
                <div className="flex items-start space-x-4">
                  <MapPin size={20} className="text-brand-orange mt-1 flex-shrink-0" />
                  <p>Plot No.26/2, Oscar industrial Park-2, Ribda, Rajkot, Gujarat 360311, India</p>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-10">
              <h3 className="text-2xl font-bold text-neutral-charcoal mb-6">Send an Inquiry</h3>
              <InquiryForm />
            </div>
          </div>
        </div>
      </section>

      <footer className="bg-neutral-charcoal text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-3 mb-4">
                {/* --- You can use your actual logo file here --- */}
                <img src="/default.png" alt="Amar Induction Logo" className="h-10 opacity-80" />
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