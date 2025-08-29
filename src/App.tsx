import { useState, useEffect, useRef } from 'react'
import { 
  ShoppingBag, 
  Zap, 
  Palette, 
  Smartphone, 
  Settings, 
  Rocket,
  Mail,
  Briefcase,
  Globe,
  ExternalLink,
  Menu,
  X,
  Code,
  TrendingUp,
  ChevronUp
} from 'lucide-react'
import './App.css'

// Page Transition Component
const PageTransition = ({ isActive }: { isActive: boolean }) => {
  return <div className={`page-transition ${isActive ? 'enter' : 'exit'}`}></div>;
};

function App() {
  const [isLoaded, setIsLoaded] = useState(false)
  const [activeSection, setActiveSection] = useState('home')
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const nextSectionRef = useRef<string>('home')

  // Handle navigation clicks with smooth scrolling
  const handleNavClick = (sectionId: string) => {
    setIsMobileMenuOpen(false)
    const element = document.getElementById(sectionId)
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' })
    }
  }

  useEffect(() => {
    setIsLoaded(true)
    
    // Detect active section on scroll
    const handleSectionDetection = () => {
      const sections = document.querySelectorAll('section[id]')
      const scrollPosition = window.scrollY + 200 // Offset for better detection
      
      sections.forEach((section) => {
        const sectionId = section.getAttribute('id') || ''
        const sectionTop = (section as HTMLElement).offsetTop
        const sectionHeight = (section as HTMLElement).offsetHeight
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionTop + sectionHeight) {
          if (activeSection !== sectionId) {
            setActiveSection(sectionId)
          }
        }
      })
    }
    
    window.addEventListener('scroll', handleSectionDetection)
    
    // Mouse following cursor effect
    const handleMouseMove = (e: MouseEvent) => {
      const cursor = document.querySelector('.custom-cursor') as HTMLElement
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
      
      // Magnetic effect for floating cards
      const floatingCards = document.querySelectorAll('.floating-card')
      floatingCards.forEach((card) => {
        const rect = card.getBoundingClientRect()
        const cardCenterX = rect.left + rect.width / 2
        const cardCenterY = rect.top + rect.height / 2
        const distance = Math.sqrt(
          Math.pow(e.clientX - cardCenterX, 2) + Math.pow(e.clientY - cardCenterY, 2)
        )
        
        if (distance < 200) {
          const angle = Math.atan2(e.clientY - cardCenterY, e.clientX - cardCenterX)
          const force = (200 - distance) / 200
          const moveX = Math.cos(angle) * force * 20
          const moveY = Math.sin(angle) * force * 20
          ;(card as HTMLElement).style.transform = `translate(${moveX}px, ${moveY}px)`
        }
      })
    }
    
    // Scroll animation observer
    const observeScrollAnimations = () => {
      const animatedElements = document.querySelectorAll('.scroll-animate')
      
      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const element = entry.target as HTMLElement
            const animation = element.dataset.animation || 'fade-in'
            const delay = element.dataset.delay || '0'
            
            // Special handling for typing animation
            if (element.classList.contains('animate-typing')) {
              element.style.opacity = '1'
              element.style.width = '0'
              setTimeout(() => {
                element.style.width = '100%'
              }, parseInt(delay))
            } else {
              element.style.opacity = '0'
              setTimeout(() => {
                element.classList.add(`animate-${animation}`)
                element.style.opacity = '1'
              }, parseInt(delay))
            }
            
            observer.unobserve(element)
          }
        })
      }, { threshold: 0.1 })
      
      animatedElements.forEach(element => {
        // Initialize typing elements
        if (element.classList.contains('animate-typing')) {
          (element as HTMLElement).style.opacity = '1'
          ;(element as HTMLElement).style.width = '0'
        } else {
          (element as HTMLElement).style.opacity = '0'
        }
        observer.observe(element)
      })
    }
    
    // Initialize scroll animations
    observeScrollAnimations()
    
    // Handle scroll-based navigation highlighting and crazy animations
    const handleScroll = () => {
      const sections = ['home', 'about', 'portfolio', 'services', 'contact']
      const scrollPosition = window.scrollY + 100

      for (const section of sections) {
        const element = document.getElementById(section)
        if (element) {
          const { offsetTop, offsetHeight } = element
          if (scrollPosition >= offsetTop && scrollPosition < offsetTop + offsetHeight) {
            setActiveSection(section)
            break
          }
        }
      }

      // Crazy scroll animations
      const scrollPercent = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      
      // Animate floating cards based on scroll
      const floatingCards = document.querySelectorAll('.floating-card')
      floatingCards.forEach((card, index) => {
        const rotation = scrollPercent * 360 * (index + 1)
        const scale = 1 + Math.sin(scrollPercent * Math.PI * 2) * 0.1
        ;(card as HTMLElement).style.transform = `rotate(${rotation}deg) scale(${scale})`
      })

      // Animate particles based on scroll
      const particles = document.querySelectorAll('.particle')
      particles.forEach((particle, index) => {
        const offset = scrollPercent * 100 * (index % 3 + 1)
        ;(particle as HTMLElement).style.transform = `translateX(${Math.sin(offset) * 50}px) translateY(${Math.cos(offset) * 30}px)`
      })

      // Parallax effect for background shapes
      const shapes = document.querySelectorAll('.shape')
      shapes.forEach((shape, index) => {
        const speed = (index + 1) * 0.5
        const yPos = scrollPercent * 100 * speed
        ;(shape as HTMLElement).style.transform = `translateY(${yPos}px) rotate(${scrollPercent * 180}deg)`
      })
    }

    // Initialize scroll animations
    observeScrollAnimations()
    
    window.addEventListener('scroll', handleScroll)
    window.addEventListener('mousemove', handleMouseMove)
    return () => {
      window.removeEventListener('scroll', handleSectionDetection)
      window.removeEventListener('scroll', handleScroll)
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  const portfolioProjects = [
    {
      title: "Stoney's Kitchen Supplies",
      description: "Modern e-commerce store specializing in kitchen organization and storage solutions with clean product categorization.",
      url: "https://0dr9a0-s6.myshopify.com/",
      category: "Kitchen & Home",
      image: "/Project1.png"
    },
    {
      title: "Sweete General Store",
      description: "Multi-category general store featuring home textiles, electronics, and lifestyle products with intuitive navigation.",
      url: "https://sweetegeneralstore.com/",
      category: "General Merchandise",
      image: "/Project2.png"
    },
    {
      title: "Solquix Fashion Store",
      description: "Contemporary fashion e-commerce platform showcasing men's clothing, accessories, and travel gear with modern aesthetics.",
      url: "https://j0meqd-r2.myshopify.com/",
      category: "Fashion & Lifestyle",
      image: "/Project3.png"
    },
    {
      title: "Ariana Store",
      description: "Beauty and makeup e-commerce store with sophisticated product displays and organized cosmetic collections.",
      url: "https://1490db-fa.myshopify.com/",
      category: "Beauty & Cosmetics",
      image: "/Project4.png"
    }
  ]

  const services = [
    {
      icon: ShoppingBag,
      title: "Custom Shopify Development",
      description: "Tailored e-commerce solutions built from the ground up to match your brand and business requirements."
    },
    {
      icon: Palette,
      title: "Theme Customization",
      description: "Professional theme modifications and custom designs that enhance user experience and conversion rates."
    },
    {
      icon: Zap,
      title: "Store Optimization",
      description: "Performance improvements, SEO optimization, and conversion rate enhancement for existing Shopify stores."
    },
    {
      icon: Smartphone,
      title: "Responsive Design",
      description: "Mobile-first approach ensuring your store looks perfect and functions flawlessly on all devices."
    },
    {
      icon: Settings,
      title: "App Integration",
      description: "Seamless integration of third-party apps and custom functionality to extend your store's capabilities."
    },
    {
      icon: Rocket,
      title: "Migration Services",
      description: "Smooth platform migration to Shopify with data preservation and minimal downtime."
    }
  ]

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  }

  // Show/hide scroll-to-top button based on scroll position
  const [showScrollTop, setShowScrollTop] = useState(false);
  
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={`app ${isLoaded ? 'loaded' : ''}`}>
      {/* Scroll to Top Button */}
      <button 
        className="scroll-to-top-btn animate-float" 
        onClick={scrollToTop}
        style={{
          opacity: showScrollTop ? 1 : 0,
          pointerEvents: showScrollTop ? 'auto' : 'none'
        }}
      >
        <ChevronUp size={24} />
      </button>
      {/* Custom Cursor */}
      <div className="custom-cursor"></div>
      
      {/* Navigation */}
      {/* Page Transition */}
      {isTransitioning && <PageTransition isActive={true} />}
      
      <nav className="navbar">
        <div className="nav-container">
          <div className="nav-logo">
            <span className="logo-text">Ebubechukwu</span>
          </div>
          <div className={`nav-menu ${isMobileMenuOpen ? 'nav-menu-open' : ''}`}>
            <a href="#home" className={activeSection === 'home' ? 'active' : ''} onClick={() => handleNavClick('home')}>Home</a>
            <a href="#about" className={activeSection === 'about' ? 'active' : ''} onClick={() => handleNavClick('about')}>About</a>
            <a href="#portfolio" className={activeSection === 'portfolio' ? 'active' : ''} onClick={() => handleNavClick('portfolio')}>Portfolio</a>
            <a href="#services" className={activeSection === 'services' ? 'active' : ''} onClick={() => handleNavClick('services')}>Services</a>
            <a href="#contact" className={activeSection === 'contact' ? 'active' : ''} onClick={() => handleNavClick('contact')}>Contact</a>
          </div>
          <button 
            className="mobile-menu-toggle"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle mobile menu"
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section id="home" className="hero">
        {/* Animated Background Particles */}
        <div className="particles-container">
          {[...Array(20)].map((_, i) => (
            <div 
              key={i} 
              className="particle" 
              style={{
                left: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 10}s`,
                animationDuration: `${10 + Math.random() * 20}s`
              }}
            />
          ))}
        </div>
        
        {/* Morphing Background Shapes */}
        <div className="bg-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
        </div>
        <div className="parallax-layer-1"></div>
        <div className="parallax-layer-2"></div>
        
        <div className="hero-container">
          <div className="hero-content">
            <div className="hero-text scroll-animate" data-animation="slide-up">
              <h1 className="hero-title">
                <span className="title-line scroll-animate animate-typing" data-animation="slide-left" data-delay="100">Ebubechukwu</span>
                <span className="title-line scroll-animate animate-typing" data-animation="slide-right" data-delay="200">Odikpo</span>
              </h1>
              <p className="hero-subtitle scroll-animate" data-animation="fade-in" data-delay="300">Shopify Developer & E-commerce Specialist</p>
              <p className="hero-description scroll-animate" data-animation="fade-in" data-delay="400">
                Crafting exceptional e-commerce experiences that drive sales and delight customers. 
                Specializing in custom Shopify development, theme customization, and store optimization.
              </p>
              <div className="hero-buttons scroll-animate" data-animation="slide-up" data-delay="500">
                <a href="#portfolio" className="btn btn-primary">View My Work</a>
                <a href="#contact" className="btn btn-secondary">Get In Touch</a>
              </div>
            </div>
            <div className="hero-visual scroll-animate" data-animation="fade-in" data-delay="600">
              <div className="floating-card card-1 scroll-animate" data-animation="slide-left" data-delay="700">
                <div className="card-content">
                  <ShoppingBag className="card-icon" size={24} />
                  <span className="card-text">E-commerce</span>
                </div>
              </div>
              <div className="floating-card card-2 scroll-animate" data-animation="slide-up" data-delay="800">
                <div className="card-content">
                  <TrendingUp className="card-icon" size={24} />
                  <span className="card-text">Performance</span>
                </div>
              </div>
              <div className="floating-card card-3 scroll-animate" data-animation="slide-right" data-delay="900">
                <div className="card-content">
                  <Code className="card-icon" size={24} />
                  <span className="card-text">Development</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="about">
        <div className="container">
          <div className="section-header scroll-animate" data-animation="slide-up">
            <h2 className="section-title hover-shimmer">About Me</h2>
            <p className="section-subtitle">Passionate about creating exceptional e-commerce experiences</p>
          </div>
          <div className="about-content">
            <div className="about-text">
              <p className="scroll-animate animate-pulse" data-animation="fade-in" data-delay="100">
                With extensive experience in Shopify development, I specialize in creating high-converting 
                e-commerce stores that not only look stunning but also deliver exceptional user experiences. 
                My expertise spans across various industries including fashion, beauty, home goods, and general merchandise.
              </p>
              <p className="scroll-animate animate-float" data-animation="fade-in" data-delay="200">
                I believe that every business deserves a unique online presence that reflects their brand identity 
                and drives meaningful results. From custom theme development to complex integrations, I bring 
                technical excellence and creative vision to every project.
              </p>
              <div className="skills scroll-animate" data-animation="slide-up" data-delay="300">
                <div className="skill-item hover-bounce">
                  <span className="skill-name" style={{color: 'var(--accent-purple)'}}>Shopify Development</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '95%', background: 'linear-gradient(90deg, var(--accent-purple), var(--primary-light))'}}></div>
                  </div>
                </div>
                <div className="skill-item hover-bounce">
                  <span className="skill-name" style={{color: 'var(--accent-teal)'}}>Theme Customization</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '90%', background: 'linear-gradient(90deg, var(--accent-teal), var(--accent-green))'}}></div>
                  </div>
                </div>
                {/* <div className="skill-item">
                  <span className="skill-name">JavaScript/React</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '85%'}}></div>
                  </div>
                </div>
                <div className="skill-item">
                  <span className="skill-name">UI/UX Design</span>
                  <div className="skill-bar">
                    <div className="skill-progress" style={{width: '80%'}}></div>
                  </div>
                </div> */}
              </div>
            </div>
            <div className="about-stats">
              <div className="stat-item scroll-animate hover-bounce" data-animation="slide-up" data-delay="400" style={{background: 'linear-gradient(135deg, white, white, rgba(249, 115, 22, 0.1))'}}>
                <span className="stat-number" style={{color: 'var(--accent-orange)'}}>15+</span>
                <span className="stat-label">Projects Completed</span>
              </div>
              <div className="stat-item scroll-animate hover-bounce" data-animation="slide-up" data-delay="500" style={{background: 'linear-gradient(135deg, white, white, rgba(20, 184, 166, 0.1))'}}>
                <span className="stat-number" style={{color: 'var(--accent-teal)'}}>3+</span>
                <span className="stat-label">Years Experience</span>
              </div>
              <div className="stat-item scroll-animate hover-bounce" data-animation="slide-up" data-delay="600" style={{background: 'linear-gradient(135deg, white, white, rgba(139, 92, 246, 0.1))'}}>
                <span className="stat-number" style={{color: 'var(--accent-purple)'}}>100%</span>
                <span className="stat-label">Client Satisfaction</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Portfolio Section */}
      <section id="portfolio" className="portfolio">
        <div className="container">
          <div className="section-header scroll-animate" data-animation="slide-up">
            <h2 className="section-title">Featured Projects</h2>
            <p className="section-subtitle">A showcase of my recent Shopify development work</p>
          </div>
          <div className="portfolio-grid">
            {portfolioProjects.map((project, index) => (
              <div key={index} className="" data-animation="fade-in" >
                <div className="">
                  <div className="">
                    <div className="portfolio-image">
                      <img src={project.image} alt={project.title} className="hover-pulse" />
                      <div className="portfolio-overlay">
                        <a href={project.url} target="_blank" rel="noopener noreferrer" className="portfolio-link hover-bounce">
                          <ExternalLink size={20} />
                          View Live Site
                        </a>
                      </div>
                    </div>
                  </div>
                  <div className="">
                    <span className="portfolio-category">{project.category}</span>
                    <h3 className="portfolio-title">{project.title}</h3>
                    <p className="portfolio-description">{project.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="services" className="services">
        <div className="container">
          <div className="section-header scroll-animate" data-animation="slide-up">
            <h2 className="section-title">Services</h2>
            <p className="section-subtitle">Comprehensive Shopify solutions for your business</p>
          </div>
          <div className="services-grid">
            {services.map((service, index) => {
              const IconComponent = service.icon;
              return (
                <div key={index} className="service-item scroll-animate" data-animation="fade-in" data-delay={`${index * 150}`} style={{animationDelay: `${index * 0.1}s`}}>
                  <div className="service-icon animate-float">
                    <IconComponent size={48} />
                  </div>
                  <h3 className="service-title">{service.title}</h3>
                  <p className="service-description">{service.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="contact">
        <div className="container">
          {/* Background Elements */}
          <div className="contact-bg-elements">
            <div className="contact-shape shape-1 animate-float hover-pulse"></div>
            <div className="contact-shape shape-2 animate-float delay-200 hover-jello"></div>
            <div className="contact-shape shape-3 animate-float delay-400 hover-wobble"></div>
          </div>
          
          <div className="section-header scroll-animate" data-animation="fade-in" data-delay="100">
            <h2 className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">Ready to take your e-commerce business to the next level?</p>
          </div>
          
          <div className="contact-card scroll-animate" data-animation="slide-up" data-delay="200">
            <div className="contact-content">
              <div className="contact-info">
                <h3 className="contact-info-title scroll-animate" data-animation="slide-left" data-delay="300">Get in Touch</h3>
                <p className="contact-info-subtitle scroll-animate" data-animation="slide-left" data-delay="400">I'm always interested in hearing about new projects and opportunities.</p>
                
                <div className="contact-item scroll-animate" data-animation="slide-left" data-delay="500">
                  <div className="contact-icon animate-pulse hover-bounce">
                    <Mail size={20} color="var(--accent-purple)" />
                  </div>
                  <div className="contact-details">
                    <h4>Email</h4>
                    <a href="mailto:ebubechukwu.odikpo@email.com" className="contact-link hover-shimmer">ebubechukwu.odikpo@email.com</a>
                  </div>
                </div>
                
                <div className="contact-item scroll-animate" data-animation="slide-left" data-delay="600">
                  <div className="contact-icon animate-pulse hover-bounce">
                    <Briefcase size={20} color="var(--accent-teal)" />
                  </div>
                  <div className="contact-details">
                    <h4>LinkedIn</h4>
                    <a href="https://linkedin.com/in/ebubechukwu-odikpo" target="_blank" rel="noopener noreferrer" className="contact-link hover-shimmer">linkedin.com/in/ebubechukwu-odikpo</a>
                  </div>
                </div>
                
                <div className="contact-item scroll-animate" data-animation="slide-left" data-delay="700">
                  <div className="contact-icon animate-pulse hover-bounce">
                    <Globe size={20} color="var(--accent-pink)" />
                  </div>
                  <div className="contact-details">
                    <h4>Location</h4>
                    <p>Available Worldwide</p>
                  </div>
                </div>
                
                <div className="social-links scroll-animate" data-animation="slide-left" data-delay="800">
                  <a href="#" className="social-link hover-jello" aria-label="Twitter" style={{ color: 'var(--accent-purple)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"></path></svg>
                  </a>
                  <a href="#" className="social-link hover-bounce" aria-label="GitHub" style={{ color: 'var(--accent-teal)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float delay-100"><path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"></path><path d="M9 18c-4.51 2-5-2-7-2"></path></svg>
                  </a>
                  <a href="#" className="social-link hover-wobble" aria-label="Instagram" style={{ color: 'var(--accent-pink)' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float delay-200"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line></svg>
                  </a>
                </div>
              </div>
              
              <div className="contact-form-container scroll-animate" data-animation="slide-right" data-delay="900">
                <form className="contact-form">
                  <div className="form-header scroll-animate" data-animation="fade-in" data-delay="1000">
                    <h3>Send Me a Message</h3>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-group scroll-animate" data-animation="slide-up" data-delay="1100">
                      <label htmlFor="name">Name</label>
                      <input type="text" id="name" placeholder="Your Name" required className="hover-shimmer" />
                    </div>
                    
                    <div className="form-group scroll-animate" data-animation="slide-up" data-delay="1200">
                      <label htmlFor="email">Email</label>
                      <input type="email" id="email" placeholder="Your Email" required className="hover-shimmer" />
                    </div>
                  </div>
                  
                  <div className="form-group scroll-animate" data-animation="slide-up" data-delay="1300">
                    <label htmlFor="project">Project Type</label>
                    <select id="project" required className="hover-shimmer" defaultValue="">
                      <option value="" disabled>Select Project Type</option>
                      <option value="shopify-development">Shopify Development</option>
                      <option value="theme-customization">Theme Customization</option>
                      <option value="store-optimization">Store Optimization</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  
                  <div className="form-group scroll-animate" data-animation="slide-up" data-delay="1400">
                    <label htmlFor="message">Message</label>
                    <textarea id="message" placeholder="Tell me about your project..." rows={5} required className="hover-shimmer"></textarea>
                  </div>
                  
                  <button type="submit" className="btn btn-primary submit-btn hover-jello scroll-animate" data-animation="fade-in" data-delay="1500">
                    <span>Send Message</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="animate-float"><line x1="22" x2="11" y1="2" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <div className="footer-particles">
          {[...Array(15)].map((_, i) => (
            <div 
              key={i} 
              className="footer-particle animate-float" 
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${15 + Math.random() * 10}s`,
                animationDelay: `${Math.random() * 5}s`
              }}
            />
          ))}
        </div>
        <div className="container">
          <div className="footer-content">
            <div className="footer-text scroll-animate" data-animation="fade-in" data-delay="100">
              <p className="hover-pulse">&copy; 2024 Ebubechukwu Odikpo. All rights reserved.</p>
            </div>
            <div className="back-to-top scroll-animate" data-animation="slide-up" data-delay="200">
              <a href="#home" className="back-to-top-btn hover-bounce">
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>
                <span>Back to top</span>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
