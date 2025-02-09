"use client"

import type React from "react"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence, useTransform, useScroll, useMotionValue, useSpring, useInView } from "framer-motion"
import {
  Brain,
  Users,
  FileText,
  GraduationCap,
  Github,
  Twitter,
  Linkedin,
  Mail,
  ChevronDown,
  BookOpen,
  Sparkles,
  MessageSquareMore,
  Menu,
  X,
  Home,
  Compass,
  Book,
  MessageCircle,
  Info,
} from "lucide-react"

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false)

  const navLinks = [
    { name: "Home", href: "#", icon: Home },
    { name: "Find Specialists", href: "#", icon: Compass },
    { name: "Community", href: "#", icon: Users },
    { name: "Text Converter", href: "#", icon: FileText },
    { name: "Learning Resources", href: "#", icon: Book },
    { name: "Digital Library", href: "#", icon: BookOpen },
    { name: "AI Chat Support", href: "#", icon: MessageCircle },
    { name: "About Us", href: "#about", icon: Info },
  ]

  return (
    <>
      {/* Main Navbar */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className="fixed w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800"
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#"
              className="text-2xl font-bold hero-text-gradient"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              LEXISHIFT
            </motion.a>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className="p-2 rounded-lg hover:bg-gray-800 transition-colors group"
              >
                <Menu className="w-6 h-6 text-white group-hover:rotate-180 transition-transform duration-300" />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
          />
        )}
      </AnimatePresence>

      {/* Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className="fixed right-0 top-0 h-full w-80 bg-gray-900 shadow-2xl z-50"
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className="text-xl font-bold hero-text-gradient">Navigation</h2>
                <motion.button
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className="p-2 rounded-full hover:bg-gray-800 transition-colors"
                >
                  <X className="w-6 h-6 text-white" />
                </motion.button>
              </div>

              <div className="space-y-2">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className="flex items-center space-x-4 p-3 rounded-lg text-gray-300 hover:text-white hover:bg-gray-800 transition-all duration-200 group"
                      onClick={() => setIsOpen(false)}
                      whileHover={{ x: 4 }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon className="w-5 h-5 group-hover:scale-110 transition-transform duration-200" />
                      <span>{link.name}</span>
                    </motion.a>
                  )
                })}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <div className="border-t border-gray-800 pt-6">
                  <div className="flex justify-center space-x-6">
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Twitter className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Github className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Linkedin className="w-6 h-6" />
                    </motion.a>
                    <motion.a
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors"
                      whileHover={{ scale: 1.2 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Mail className="w-6 h-6" />
                    </motion.a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

const FeatureCard = ({
  icon: Icon,
  title,
  description,
  buttonText,
}: {
  icon: React.ElementType
  title: string
  description: string
  buttonText: string
  index: number
}) => {
  const ref = useRef(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.6, 1], [0, 1, 1, 0])

  return (
    <motion.div
      ref={ref}
      style={{ y, opacity }}
      className="feature-card p-8 md:p-10 flex flex-col items-center text-center text-white cursor-pointer light-theme:text-black"
    >
      <motion.div whileHover={{ rotate: 360, scale: 1.2 }} transition={{ duration: 0.8 }}>
        <Icon className="w-16 h-16 mb-6 text-white light-theme:text-black" strokeWidth={1} />
      </motion.div>
      <h3 className="text-2xl font-bold mb-4">{title}</h3>
      <p className="text-gray-300 mb-8 text-lg leading-relaxed light-theme:text-gray-700">{description}</p>
      <motion.button
        className="bg-white text-black px-8 py-3 rounded-full text-lg font-semibold hover:bg-gray-100 transition-colors light-theme:bg-black light-theme:text-white light-theme:hover:bg-gray-800"
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {buttonText}
      </motion.button>
    </motion.div>
  )
}

const FloatingSparkle = ({ delay = 0 }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay }}
    className="absolute"
  >
    <Sparkles className="text-white opacity-50 light-theme:text-black" size={16} />
  </motion.div>
)

function App() {
  const featuresRef = useRef<HTMLDivElement>(null)
  const aboutRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll()
  const heroRef = useRef(null)
  const isHeroInView = useInView(heroRef)

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "100%"])
  const opacity = useTransform(scrollYProgress, [0, 0.3], [1, 0])

  const scrollToFeatures = () => {
    featuresRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)
  const springConfig = { damping: 25, stiffness: 700 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX - 16)
      cursorY.set(e.clientY - 16)
    }

    window.addEventListener("mousemove", moveCursor)

    return () => {
      window.removeEventListener("mousemove", moveCursor)
    }
  }, [cursorX, cursorY])

  const featuresScrollProgress = useScroll({
    target: featuresRef,
    offset: ["start end", "end start"],
  })

  const featuresScale = useTransform(featuresScrollProgress.scrollYProgress, [0, 1], [0.8, 1])
  const featuresOpacity = useTransform(featuresScrollProgress.scrollYProgress, [0, 0.2], [0, 1])

  const aboutScrollProgress = useScroll({
    target: aboutRef,
    offset: ["start end", "end start"],
  })

  const aboutY = useTransform(aboutScrollProgress.scrollYProgress, [0, 1], [100, -100])
  const aboutOpacity = useTransform(aboutScrollProgress.scrollYProgress, [0, 0.3], [0, 1])

  return (
    <div className="min-h-screen bg-black text-white transition-colors duration-300 light-theme:bg-white light-theme:text-black">
      <Navbar />

      <motion.div
        className="custom-cursor"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          position: "fixed",
          left: 0,
          top: 0,
          zIndex: 9999,
          pointerEvents: "none",
        }}
      >
        <div className="w-8 h-8 bg-white rounded-full opacity-50 light-theme:bg-black" />
      </motion.div>

      {/* Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        className="gradient-bg min-h-screen flex flex-col items-center justify-center relative overflow-hidden px-4 pt-16"
      >
        <motion.div style={{ y, opacity }} className="absolute inset-0 grid grid-cols-4 gap-4 p-4">
          {Array.from({ length: 16 }).map((_, i) => (
            <FloatingSparkle key={i} delay={i * 0.2} />
          ))}
        </motion.div>

        <div className="container mx-auto text-center max-w-5xl relative z-10">
          <motion.div
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ duration: 1, ease: "easeOut" }}
            className="mb-8"
          >
            <div className="relative inline-block">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute inset-0 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full blur-xl opacity-30"
              />
              <h1 className="text-6xl md:text-8xl font-bold hero-text-gradient tracking-tight relative z-10">
                LEXISHIFT
              </h1>
            </div>
          </motion.div>
          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.4, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
            className="text-xl md:text-3xl mb-12 max-w-3xl mx-auto text-gray-300 leading-relaxed light-theme:text-gray-700"
          >
            Empowering dyslexic individuals with innovative tools and support for a brighter future
          </motion.p>
          <motion.div
            initial={{ y: 50, opacity: 0 }}
            animate={isHeroInView ? { y: 0, opacity: 1 } : { y: 50, opacity: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          >
            <motion.button
              onClick={scrollToFeatures}
              className="bg-white text-black px-12 py-4 rounded-full text-xl font-semibold hover:bg-gray-100 transition-all hover:scale-105 active:scale-95 light-theme:bg-black light-theme:text-white light-theme:hover:bg-gray-800"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              Get Started
            </motion.button>
          </motion.div>
        </div>
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 scroll-indicator cursor-pointer"
          onClick={scrollToFeatures}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className="w-10 h-10 text-white opacity-50 light-theme:text-black" />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Section */}
      <motion.div
        ref={featuresRef}
        style={{ scale: featuresScale, opacity: featuresOpacity }}
        className="py-24 md:py-32 px-4 bg-black light-theme:bg-white"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.h2
            className="text-4xl md:text-6xl font-bold text-center mb-20 hero-text-gradient"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {[
              {
                icon: Brain,
                title: "Consult a Doctor",
                description: "Connect with specialized healthcare professionals for personalized guidance and support.",
                buttonText: "Find Specialists",
              },
              {
                icon: Users,
                title: "Community Support",
                description: "Join our vibrant community of individuals sharing experiences and support.",
                buttonText: "Join Community",
              },
              {
                icon: FileText,
                title: "Dyslexia-Friendly Converter",
                description: "Transform any text into an easy-to-read format optimized for dyslexic readers.",
                buttonText: "Try Converter",
              },
              {
                icon: GraduationCap,
                title: "Learning Platform",
                description: "Access specialized educational resources tailored to your learning style.",
                buttonText: "Start Learning",
              },
              {
                icon: BookOpen,
                title: "Digital Library",
                description: "Access our extensive collection of dyslexia-friendly books and reading materials.",
                buttonText: "Browse Library",
              },
              {
                icon: MessageSquareMore,
                title: "AI Chat Support",
                description:
                  "Get instant help and guidance from our AI-powered chatbot, available 24/7 to assist with any questions.",
                buttonText: "Start Chat",
              },
            ].map((feature, index) => (
              <FeatureCard key={index} {...feature} index={index} />
            ))}
          </div>
        </div>
      </motion.div>

      {/* About Us Section */}
      <motion.div
        id="about"
        ref={aboutRef}
        style={{ y: aboutY, opacity: aboutOpacity }}
        className="py-24 md:py-32 px-4 bg-gradient-to-b from-black to-gray-900 light-theme:from-white light-theme:to-gray-100"
      >
        <div className="container mx-auto max-w-7xl">
          <motion.div className="text-center mb-16">
            <h2 className="text-4xl md:text-6xl font-bold mb-8 hero-text-gradient">About Us</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed light-theme:text-gray-700">
              LEXISHIFT was founded with a vision to revolutionize how dyslexic individuals interact with text and
              learning materials. Our team of dedicated professionals combines expertise in education, technology, and
              cognitive science to create innovative solutions that make reading and learning more accessible and
              enjoyable.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                title: "Our Mission",
                description:
                  "To empower individuals with dyslexia by providing innovative tools and support systems that enhance their learning experience.",
              },
              {
                title: "Our Vision",
                description:
                  "To create a world where dyslexia is not a barrier to learning and where every individual has equal access to education.",
              },
              {
                title: "Our Values",
                description:
                  "Innovation, inclusivity, and empowerment guide everything we do as we strive to make a positive impact.",
              },
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                viewport={{ once: true }}
                className="feature-card p-8"
              >
                <h3 className="text-2xl font-bold mb-4">{item.title}</h3>
                <p className="text-gray-300 light-theme:text-gray-700">{item.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>

      {/* Footer */}
      <footer className="bg-black border-t border-gray-800 py-16 px-4 light-theme:bg-white light-theme:border-gray-200">
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div>
              <h3 className="text-2xl font-bold mb-6 hero-text-gradient">LEXISHIFT</h3>
              <p className="text-gray-400 text-lg light-theme:text-gray-600">
                Empowering dyslexic individuals worldwide
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    Find Specialists
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    Text Converter
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    Learning Resources
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    Digital Library
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    AI Chat Support
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="text-gray-400 hover:text-white transition-colors text-lg light-theme:text-gray-600 light-theme:hover:text-black"
                  >
                    About Us
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-gray-400 text-lg light-theme:text-gray-600">Email: contact@lexishift.com</li>
                <li className="text-gray-400 text-lg light-theme:text-gray-600">Phone: +1 (555) 123-4567</li>
                <li className="text-gray-400 text-lg light-theme:text-gray-600">
                  Address: 123 Innovation St, Tech City
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
              <div className="flex space-x-6">
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="#"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Mail className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-16 pt-8 text-center text-gray-400 light-theme:border-gray-200 light-theme:text-gray-600">
            <p className="text-lg">&copy; {new Date().getFullYear()} LEXISHIFT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

