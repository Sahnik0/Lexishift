"use client"
import "./styles.css"
import { DotLottieReact } from "@lottiefiles/dotlottie-react"
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
  Sun,
  Moon,
  ArrowRight,
  Volume2,
  VolumeX,
  ChevronRight,
  ChevronLeft,
  Clock,
  Award,
} from "lucide-react"

// Add these type declarations at the top of the file
declare global {
  interface Window {
    scrollTimeout: number
  }
}

// Add type for FeatureTimelineItem props
interface FeatureTimelineItemProps {
  icon: React.ElementType
  title: string
  description: string
  buttonText: string
  link: string
  videoUrl: string
  isReversed: boolean
  theme: string
}

// Add type for FloatingSparkle props
interface FloatingSparkleProps {
  delay?: number
  size?: number
  theme?: string
}

// Add type for AutoPlayVideo props
interface AutoPlayVideoProps {
  videoUrl: string
  theme: string
}

// Auto-playing video component
const AutoPlayVideo: React.FC<AutoPlayVideoProps> = ({ videoUrl, theme }) => {
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && videoRef.current) {
            videoRef.current.play().catch((error) => {
              console.error("Error playing video:", error)
            })
          } else if (videoRef.current) {
            videoRef.current.pause()
          }
        })
      },
      { threshold: 0.5 },
    )

    if (videoRef.current) {
      observer.observe(videoRef.current)
    }

    return () => {
      if (videoRef.current) {
        observer.unobserve(videoRef.current)
      }
    }
  }, [])

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isMuted
      setIsMuted(!isMuted)
    }
  }

  return (
    <div className="relative rounded-xl overflow-hidden shadow-xl group">
      <video
        ref={videoRef}
        className="w-full h-full object-cover rounded-xl"
        loop
        muted={isMuted}
        playsInline
        poster="/placeholder.svg?height=400&width=600"
      >
        <source src={videoUrl} type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      <div className="absolute bottom-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <motion.button
          onClick={toggleMute}
          className={`p-2 rounded-full ${theme === "dark" ? "bg-black/60" : "bg-white/60"} backdrop-blur-sm`}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          {isMuted ? (
            <VolumeX className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
          ) : (
            <Volume2 className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
          )}
        </motion.button>
      </div>
    </div>
  )
}

// Timeline Feature Item
const FeatureTimelineItem: React.FC<FeatureTimelineItemProps> = ({
  icon: Icon,
  title,
  description,
  buttonText,
  link,
  videoUrl,
  isReversed,
  theme,
}) => {
  const itemRef = useRef(null)
  const isInView = useInView(itemRef, { once: false, amount: 0.3 })

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5 }}
      className={`grid grid-cols-1 md:grid-cols-2 gap-8 items-center mb-24 ${isReversed ? "md:flex-row-reverse" : ""}`}
    >
      <div className={`order-2 ${isReversed ? "md:order-1" : "md:order-2"}`}>
        <AutoPlayVideo videoUrl={videoUrl} theme={theme} />
      </div>

      <div className={`order-1 ${isReversed ? "md:order-2" : "md:order-1"}`}>
        <div
          className={`feature-timeline-content p-8 rounded-xl ${
            theme === "dark" ? "bg-white/5 border border-white/10" : "bg-black/5 border border-gray-200"
          }`}
        >
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-4 rounded-full ${theme === "dark" ? "bg-white/10" : "bg-black/5"}`}>
              <Icon className={`w-8 h-8 ${theme === "dark" ? "text-white" : "text-black"}`} strokeWidth={1.5} />
            </div>
            <h3 className={`text-2xl font-bold ${theme === "light" ? "text-stroke-light" : ""}`}>{title}</h3>
          </div>

          <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} mb-8 text-lg leading-relaxed`}>
            {description}
          </p>

          <motion.a
            href={link}
            className={`${
              theme === "dark" ? "bg-white text-black hover:bg-gray-200" : "bg-black text-white hover:bg-gray-800"
            } px-8 py-3 rounded-full text-lg font-semibold transition-all flex items-center space-x-2 w-fit`}
            whileHover={{ scale: 1.05, x: 5 }}
            whileTap={{ scale: 0.95 }}
          >
            <span>{buttonText}</span>
            <motion.span initial={{ x: 0 }} whileHover={{ x: 5 }} transition={{ type: "spring", stiffness: 400 }}>
              <ArrowRight className="w-5 h-5" />
            </motion.span>
          </motion.a>
        </div>
      </div>
    </motion.div>
  )
}

// Improved Navbar with glass morphism effect
const Navbar = ({ theme, toggleTheme }: { theme: string; toggleTheme: () => void }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
      {/* Main Navbar with enhanced glass morphism */}
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
        className={`fixed w-full z-50 ${
          scrolled
            ? `${theme === "dark" ? "bg-black/90" : "bg-white/90"} shadow-lg`
            : `${theme === "dark" ? "bg-black/60" : "bg-white/60"}`
        } backdrop-blur-xl border-b ${theme === "dark" ? "border-gray-800/50" : "border-gray-200/50"} transition-all duration-300`}
      >
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between h-16">
            <motion.a
              href="#"
              className={`text-2xl font-bold hero-text-gradient ${theme === "light" ? "text-stroke-light" : ""}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="flex items-center">
                <motion.span
                  animate={{
                    rotateY: [0, 360],
                    scale: [1, 1.1, 1],
                  }}
                  transition={{
                    rotateY: { duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    scale: { duration: 2, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" },
                  }}
                  className="inline-block mr-2"
                >
                  <Brain className="w-8 h-8 inline-block transform -translate-y-0.5" strokeWidth={1.5} />
                </motion.span>
                LEXISHIFT
              </span>
            </motion.a>

            {/* Desktop Navigation Links - New Addition */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.slice(0, 4).map((link) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-200 ${
                      theme === "dark"
                        ? "text-gray-300 hover:text-white hover:bg-white/10"
                        : "text-gray-600 hover:text-black hover:bg-black/10"
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <span className="flex items-center">
                      <Icon className="w-4 h-4 mr-1" />
                      {link.name}
                    </span>
                  </motion.a>
                )
              })}
            </div>

            <div className="flex items-center space-x-4">
              <motion.button
                whileHover={{ scale: 1.1, rotate: theme === "dark" ? 180 : 0 }}
                whileTap={{ scale: 0.9 }}
                onClick={toggleTheme}
                className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}`}
              >
                {theme === "dark" ? <Sun className="w-5 h-5 text-white" /> : <Moon className="w-5 h-5 text-black" />}
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                onClick={() => setIsOpen(!isOpen)}
                className={`p-2 rounded-full transition-colors ${theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"}`}
              >
                <Menu className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </motion.nav>

      {/* Overlay with improved animation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setIsOpen(false)}
            className="fixed inset-0 bg-black/70 backdrop-blur-md z-50"
          />
        )}
      </AnimatePresence>

      {/* Enhanced Side Navigation */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, duration: 0.4 }}
            className={`fixed right-0 top-0 h-full w-80 shadow-2xl z-50 ${
              theme === "dark"
                ? "bg-gray-900/95 backdrop-blur-xl"
                : "bg-white/95 backdrop-blur-xl border-l border-gray-200"
            }`}
          >
            <div className="p-6">
              <div className="flex justify-between items-center mb-8">
                <h2 className={`text-xl font-bold hero-text-gradient ${theme === "light" ? "text-stroke-light" : ""}`}>
                  Navigation
                </h2>
                <motion.button
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setIsOpen(false)}
                  className={`p-2 rounded-full transition-colors ${
                    theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"
                  }`}
                >
                  <X className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
                </motion.button>
              </div>

              <div className="space-y-1">
                {navLinks.map((link) => {
                  const Icon = link.icon
                  return (
                    <motion.a
                      key={link.name}
                      href={link.href}
                      className={`flex items-center space-x-4 p-3 rounded-lg transition-all duration-200 group ${
                        theme === "dark"
                          ? "text-gray-300 hover:text-white hover:bg-white/10"
                          : "text-gray-600 hover:text-black hover:bg-black/10"
                      }`}
                      onClick={() => setIsOpen(false)}
                      whileHover={{
                        x: 4,
                        backgroundColor: theme === "dark" ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <Icon
                        className={`w-5 h-5 ${
                          theme === "dark" ? "text-gray-300" : "text-gray-600"
                        } group-hover:scale-110 transition-transform duration-200`}
                      />
                      <span>{link.name}</span>
                      <motion.div
                        className="ml-auto opacity-0 group-hover:opacity-100 transition-opacity"
                        initial={{ x: -5 }}
                        animate={{ x: 0 }}
                      >
                        <ArrowRight className="w-4 h-4" />
                      </motion.div>
                    </motion.a>
                  )
                })}
              </div>

              <div className="absolute bottom-8 left-6 right-6">
                <div className={`border-t pt-6 ${theme === "dark" ? "border-gray-800" : "border-gray-200"}`}>
                  <div className="flex justify-center space-x-6">
                    {[
                      { icon: Twitter, href: "https://x.com/sahnik_biswas?t=sp2WgWJVyv6iQL5hzG6hJQ&s=09" },
                      { icon: Github, href: "https://github.com/Sahnik0" },
                      { icon: Linkedin, href: "https://www.linkedin.com/in/sahnik-biswas-8514012a7" },
                      { icon: Mail, href: "#" },
                    ].map(({ icon: Icon, href }) => (
                      <motion.a
                        key={href}
                        href={href}
                        className={`${
                          theme === "dark" ? "text-gray-400 hover:text-white" : "text-gray-400 hover:text-black"
                        } transition-colors`}
                        whileHover={{ scale: 1.2, y: -3 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        <Icon className="w-6 h-6" />
                      </motion.a>
                    ))}
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

// Update the FloatingSparkle component with proper typing
const FloatingSparkle: React.FC<FloatingSparkleProps> = ({ delay = 0, size = 16, theme = "dark" }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0 }}
    animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY, delay }}
    className="absolute"
  >
    <Sparkles className={`${theme === "dark" ? "text-white" : "text-black"} opacity-50`} size={size} />
  </motion.div>
)

// Enhanced testimonial card
const TestimonialCard = ({
  name,
  role,
  quote,
  image,
  theme,
}: { name: string; role: string; quote: string; image: string; theme: string }) => {
  return (
    <motion.div
      className={`testimonial-card p-8 rounded-xl ${
        theme === "dark" ? "bg-white/5 border border-white/10" : "bg-white border border-gray-200"
      } shadow-lg`}
      whileHover={{
        y: -10,
        boxShadow: theme === "dark" ? "0 20px 25px -5px rgba(0, 0, 0, 0.5)" : "0 20px 25px -5px rgba(0, 0, 0, 0.1)",
      }}
    >
      <div className="flex items-center gap-4 mb-6">
        <div className="w-16 h-16 rounded-full overflow-hidden border-2 border-purple-500">
          <img src={image || "/placeholder.svg"} alt={name} className="w-full h-full object-cover" />
        </div>
        <div>
          <h4 className={`text-xl font-bold ${theme === "dark" ? "text-white" : "text-black"}`}>{name}</h4>
          <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{role}</p>
        </div>
      </div>

      <div className={`mb-4 text-4xl ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>"</div>

      <p className={`${theme === "dark" ? "text-gray-300" : "text-gray-700"} text-lg leading-relaxed mb-4`}>{quote}</p>

      <div className={`text-4xl text-right ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`}>"</div>
    </motion.div>
  )
}

// Improved testimonials section
const TestimonialsSection = ({ theme }: { theme: string }) => {
  const [activeIndex, setActiveIndex] = useState(0)
  const testimonials = [
    {
      name: "Albert Einstein",
      role: "Theoretical Physicist",
      quote:
        "Despite struggling with dyslexia, LEXISHIFT's tools helped me organize my thoughts in ways traditional methods couldn't. The specialized features truly understand how dyslexic minds work.",
      image: "\Albert.jpg?height=200&width=200",
    },
    {
      name: "Richard Branson",
      role: "Entrepreneur, Virgin Group",
      quote:
        "As someone with dyslexia, finding LEXISHIFT was a game-changer. Their community support and specialized tools have helped me communicate my ideas more effectively than ever before.",
      image: "\Richard.jpeg?height=200&width=200",
    },
    {
      name: "Steven Spielberg",
      role: "Film Director",
      quote:
        "LEXISHIFT understands that dyslexia isn't a limitation but a different way of thinking. Their text converter transformed how I approach scripts and storytelling.",
      image: "\Steven.jpeg?height=200&width=200",
    },
    {
      name: "Tom Cruise",
      role: "Actor",
      quote:
        "The learning resources at LEXISHIFT helped me develop strategies that turned my dyslexia into a strength. I recommend it to anyone looking to embrace their unique cognitive style.",
      image: "/placeholder.svg?height=200&width=200",
    },
  ]

  const nextTestimonial = () => {
    setActiveIndex((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setActiveIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <div className="py-16">
      <div className="text-center mb-16">
        <h2
          className={`text-4xl md:text-6xl font-bold mb-8 hero-text-gradient ${
            theme === "light" ? "text-stroke-heavy" : ""
          }`}
        >
          What Our Users Say
        </h2>
        <p
          className={`text-xl ${
            theme === "dark" ? "text-gray-300" : "text-gray-700"
          } max-w-3xl mx-auto leading-relaxed`}
        >
          Hear from individuals who have transformed their experience with dyslexia using LEXISHIFT
        </p>
      </div>

      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial, index) => (
            <TestimonialCard
              key={index}
              name={testimonial.name}
              role={testimonial.role}
              quote={testimonial.quote}
              image={testimonial.image}
              theme={theme}
            />
          ))}
        </div>

        {/* Mobile Testimonial Carousel */}
        <div className="md:hidden mt-12">
          <div className="relative">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeIndex}
                initial={{ opacity: 0, x: 100 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -100 }}
                transition={{ duration: 0.3 }}
              >
                <TestimonialCard
                  name={testimonials[activeIndex].name}
                  role={testimonials[activeIndex].role}
                  quote={testimonials[activeIndex].quote}
                  image={testimonials[activeIndex].image}
                  theme={theme}
                />
              </motion.div>
            </AnimatePresence>

            <div className="flex justify-center mt-8 gap-4">
              <motion.button
                onClick={prevTestimonial}
                className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronLeft className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
              </motion.button>

              <motion.button
                onClick={nextTestimonial}
                className={`p-3 rounded-full ${
                  theme === "dark" ? "bg-white/10 hover:bg-white/20" : "bg-black/10 hover:bg-black/20"
                }`}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <ChevronRight className={`w-5 h-5 ${theme === "dark" ? "text-white" : "text-black"}`} />
              </motion.button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

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

  const [theme, setTheme] = useState("dark")
  const [isScrolling, setIsScrolling] = useState(false)

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark"
    setTheme(newTheme)
    localStorage.setItem("theme", newTheme)
  }

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme")
    if (savedTheme) {
      setTheme(savedTheme)
    }

    // Track scrolling for animations
    const handleScroll = () => {
      setIsScrolling(true)
      clearTimeout(window.scrollTimeout)
      window.scrollTimeout = setTimeout(() => {
        setIsScrolling(false)
      }, 100) as unknown as number
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
      clearTimeout(window.scrollTimeout)
    }
  }, [])

  // Features data
  const features = [

    {
      icon: GraduationCap,
      title: "Learning Platform",
      description:
        "Access specialized educational resources tailored to your learning style. Our platform offers interactive lessons, exercises, and tools designed specifically for dyslexic learners to build confidence and skills.",
      buttonText: "Start Learning",
      link: "https://lexilearn-neon.vercel.app/",
      videoUrl: "/learn.mp4",
    },

        {
      icon: MessageSquareMore,
      title: "AI Therapist",
      description:
        "Get instant help and guidance from our AI-powered Therapist, available 24/7 to assist with any questions. Our advanced AI understands dyslexia-related challenges and provides personalized support whenever you need it.",
      buttonText: "Start Chat",
      link: "https://dyslu4-0.onrender.com/",
      videoUrl: "/therapy.mp4",
    },

    {
      icon: Brain,
      title: "Consult a Doctor",
      description:
        "Connect with specialized healthcare professionals for personalized guidance and support. Our network of experts understands the unique challenges of dyslexia and provides tailored advice for your specific needs.",
      buttonText: "Find Specialists",
      link: "https://lexicare.vercel.app/",
      videoUrl: "/care.mp4",
    },
    {
      icon: Users,
      title: "Community Support",
      description:
        "Join our vibrant community of individuals sharing experiences and support. Connect with others who understand your journey, share strategies, and build lasting relationships with people who truly get it.",
      buttonText: "Join Community",
      link: "https://lexilearn-neon.vercel.app/support",
      videoUrl: "/commu.mp4",
    },
    {
      icon: FileText,
      title: "Dyslexia-Friendly Converter",
      description:
        "Transform any text into an easy-to-read format optimized for dyslexic readers. Our innovative technology adjusts spacing, font, and layout to make reading more accessible and enjoyable for everyone.",
      buttonText: "Try Converter",
      link: "https://lexishift-new.onrender.com/",
      videoUrl: "/pdf.mp4",
    },
    {
      icon: BookOpen,
      title: "Digital Library",
      description:
        "Access our extensive collection of dyslexia-friendly books and reading materials. Enjoy literature, textbooks, and articles formatted specifically for easier reading with adjustable settings to match your preferences.",
      buttonText: "Browse Library",
      link: "https://lexishift-new.onrender.com/learn_more",
      videoUrl: "/Library.mp4",
    },

  ]

  return (
    <div
      className={`min-h-screen ${theme === "dark" ? "bg-black text-white" : "bg-white text-black"} transition-colors duration-300`}
    >
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Enhanced custom cursor */}
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
        <motion.div
          className={`w-8 h-8 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"} opacity-20 flex items-center justify-center`}
          animate={{
            scale: isScrolling ? 0.5 : 1,
            opacity: isScrolling ? 0.5 : 0.2,
          }}
          transition={{ duration: 0.2 }}
        >
          {isScrolling && (
            <motion.div
              className={`w-2 h-2 rounded-full ${theme === "dark" ? "bg-white" : "bg-black"}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
            />
          )}
        </motion.div>
      </motion.div>

      {/* Enhanced Hero Section */}
      <motion.div
        ref={heroRef}
        initial={{ opacity: 0 }}
        animate={isHeroInView ? { opacity: 1 } : { opacity: 0 }}
        className={`${theme === "dark" ? "gradient-bg" : "bg-white"} min-h-screen flex items-center relative overflow-hidden px-4 pt-16`}
      >
        {/* Enhanced sparkle effects */}
        <motion.div style={{ y, opacity }} className="absolute inset-0 grid grid-cols-6 grid-rows-6 gap-4 p-4">
          {Array.from({ length: 36 }).map((_, i) => (
            <FloatingSparkle key={i} delay={i * 0.1} size={((i % 3) + 1) * 8} theme={theme} />
          ))}
        </motion.div>

        <div className="container mx-auto relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Side - Enhanced Text Content */}
            <motion.div
              initial={{ x: -100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ duration: 1, ease: "easeOut" }}
              className="text-left space-y-8"
            >
              <div className="relative inline-block">
                <motion.div
                  animate={{
                    rotate: 360,
                    background: [
                      "linear-gradient(to right, #8a2387, #e94057, #f27121)",
                      "linear-gradient(to right, #f27121, #8a2387, #e94057)",
                      "linear-gradient(to right, #e94057, #f27121, #8a2387)",
                    ],
                  }}
                  transition={{
                    rotate: { duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" },
                    background: { duration: 10, repeat: Number.POSITIVE_INFINITY },
                  }}
                  className="absolute inset-0 rounded-full blur-xl opacity-30"
                />
                <motion.h1
                  className={`text-7xl xl:text-8xl font-bold hero-text-gradient tracking-tight relative z-10 ${
                    theme === "light" ? "text-stroke-heavy" : ""
                  }`}
                  initial={{ scale: 0.9 }}
                  animate={{ scale: 1 }}
                  transition={{
                    duration: 2,
                    repeat: Number.POSITIVE_INFINITY,
                    repeatType: "reverse",
                    ease: "easeInOut",
                  }}
                >
                  LEXISHIFT
                </motion.h1>
              </div>

              <motion.p
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.8 }}
                className={`text-xl xl:text-2xl ${theme === "dark" ? "text-gray-300" : "text-gray-700"} leading-relaxed max-w-xl`}
              >
                Empowering dyslexic individuals with innovative tools and support for a brighter future
              </motion.p>

              <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.6, duration: 0.8 }}
                className="flex space-x-4"
              >
                <motion.button
                  onClick={scrollToFeatures}
                  className={`${
                    theme === "dark"
                      ? "bg-gradient-to-r from-purple-600 to-blue-500 hover:from-purple-700 hover:to-blue-600"
                      : "bg-black text-white hover:bg-gray-800"
                  } px-12 py-4 rounded-full text-xl font-semibold transition-all hover:scale-105 active:scale-95 shadow-lg`}
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Get Started
                </motion.button>
              </motion.div>
            </motion.div>

            {/* Right Side - Lottie Animation */}
            <motion.div
              initial={{ x: 100, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.4, duration: 1 }}
              className="flex justify-center items-center"
            >
              <motion.div
                initial={{ scale: 0.8 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.8, duration: 0.5 }}
                className="relative w-[500px] h-[500px]"
              >
                <div className="absolute inset-0 w-full h-full blur-3xl bg-gradient-to-r from-purple-500/30 to-blue-500/30 rounded-full" />

                <DotLottieReact
                  src="https://lottie.host/05c826c4-9798-4c3c-9246-8e4ad3701edc/u28uCnJp6f.lottie"
                  loop
                  autoplay
                  className="relative z-10 w-full h-full"
                />
              </motion.div>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2 scroll-indicator cursor-pointer"
          onClick={scrollToFeatures}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          >
            <ChevronDown className={`w-10 h-10 ${theme === "dark" ? "text-white" : "text-black"} opacity-50`} />
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Features Timeline Section */}
      <div ref={featuresRef} className={`py-24 md:py-32 px-4 ${theme === "dark" ? "bg-black" : "bg-white"} relative`}>
        {/* Timeline line */}
        <div className="absolute left-1/2 top-32 bottom-32 w-0.5 hidden md:block bg-gradient-to-b from-purple-600 via-blue-500 to-pink-500 opacity-30"></div>

        <div className="container mx-auto max-w-6xl relative">
          <motion.h2
            className={`text-4xl md:text-6xl font-bold text-center mb-20 hero-text-gradient ${
              theme === "light" ? "text-stroke-heavy" : ""
            }`}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            Our Features
          </motion.h2>

          <div className="space-y-16">
            {features.map((feature, index) => (
              <FeatureTimelineItem key={index} {...feature} isReversed={index % 2 !== 0} theme={theme} />
            ))}
          </div>
        </div>
      </div>

      {/* Testimonials Section */}
      <motion.div
        id="about"
        ref={aboutRef}
        style={{ y: aboutY, opacity: aboutOpacity }}
        className={`py-24 md:py-32 px-4 ${
          theme === "dark" ? "bg-gradient-to-b from-black to-gray-900" : "bg-gradient-to-b from-white to-gray-100"
        }`}
      >
        <div className="container mx-auto max-w-7xl">
          <TestimonialsSection theme={theme} />
        </div>
      </motion.div>

      {/* Stats Section */}
      <div className={`py-16 ${theme === "dark" ? "bg-black" : "bg-white"}`}>
        <div className="container mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Users, value: "10,000+", label: "Active Users" },
              { icon: Clock, value: "24/7", label: "Support Available" },
              { icon: Award, value: "98%", label: "Satisfaction Rate" },
              { icon: Brain, value: "50+", label: "Specialized Tools" },
            ].map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={index}
                  className={`p-8 rounded-xl text-center ${
                    theme === "dark" ? "bg-white/5 border border-white/10" : "bg-black/5 border border-gray-200"
                  }`}
                  whileHover={{ y: -10 }}
                >
                  <div className="flex justify-center mb-4">
                    <div className={`p-4 rounded-full ${theme === "dark" ? "bg-purple-600/20" : "bg-purple-600/10"}`}>
                      <Icon className={`w-8 h-8 ${theme === "dark" ? "text-purple-400" : "text-purple-600"}`} />
                    </div>
                  </div>
                  <h3 className={`text-4xl font-bold mb-2 ${theme === "light" ? "text-stroke-light" : ""}`}>
                    {stat.value}
                  </h3>
                  <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"}`}>{stat.label}</p>
                </motion.div>
              )
            })}
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        className={`${theme === "dark" ? "bg-black border-gray-800" : "bg-white border-gray-200"} border-t py-16 px-4`}
      >
        <div className="container mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 md:gap-8">
            <div>
              <h3
                className={`text-2xl font-bold mb-6 hero-text-gradient ${theme === "light" ? "text-stroke-light" : ""}`}
              >
                LEXISHIFT
              </h3>
              <p className={`${theme === "dark" ? "text-gray-400" : "text-gray-600"} text-lg`}>
                Empowering dyslexic individuals worldwide
              </p>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Quick Links</h4>
              <ul className="space-y-4">
                <li>
                  <a
                    href="https://lexicare.vercel.app/"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    Find Specialists
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sahnik-biswas-8514012a7"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    Community
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sahnik-biswas-8514012a7"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    Text Converter
                  </a>
                </li>
                <li>
                  <a
                    href="https://lexilearn-neon.vercel.app/"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    Learning Resources
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sahnik-biswas-8514012a7"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    Digital Library
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.linkedin.com/in/sahnik-biswas-8514012a7"
                    className={`text-gray-400 hover:text-white transition-colors text-lg ${theme === "dark" ? "hover:text-white" : "hover:text-black"} light-theme:text-gray-600 light-theme:hover:text-black`}
                  >
                    AI Chat Support
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Contact</h4>
              <ul className="space-y-4">
                <li className="text-gray-400 text-lg light-theme:text-gray-600">Email: forloopdeloop@gmail.com</li>
                <li className="text-gray-400 text-lg light-theme:text-gray-600">Phone: +91 7407902174</li>
                <li className="text-gray-400 text-lg light-theme:text-gray-600">Address: Barasat</li>
              </ul>
            </div>
            <div>
              <h4 className="text-lg font-semibold mb-6">Follow Us</h4>
              <div className="flex space-x-6">
                <motion.a
                  href="https://x.com/sahnik_biswas?t=sp2WgWJVyv6iQL5hzG6hJQ&s=09"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Twitter className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="https://www.linkedin.com/in/sahnik-biswas-8514012a7"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Linkedin className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="https://github.com/sanks011"
                  className="text-gray-400 hover:text-white transition-colors light-theme:hover:text-black"
                  whileHover={{ scale: 1.2 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Github className="w-8 h-8" strokeWidth={1.5} />
                </motion.a>
                <motion.a
                  href="forloopdeloop@gmail.com"
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
            <p className="text-lg mb-2">&copy; {new Date().getFullYear()} LEXISHIFT. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App

