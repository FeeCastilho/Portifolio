// ============================================
// INITIALIZATION
// ============================================

// Declare variables before using them
const lucide = window.lucide
const AOS = window.AOS

document.addEventListener("DOMContentLoaded", () => {
  // Initialize Lucide icons
  lucide.createIcons()

  // Initialize AOS (Animate On Scroll)
  AOS.init({
    duration: 800,
    easing: "ease-out",
    once: true,
    offset: 100,
  })

  // Initialize all features
  initNavbar()
  initHero()
  initCounters()
  initSkillBars()
  initProjects()
  initContactForm()
  initBackToTop()
  initMagneticButtons()
  initTiltCards()
  initParticles()
})

// ============================================
// NAVBAR - Scroll effects and active link highlighting
// ============================================

function initNavbar() {
  const navbar = document.querySelector(".navbar")
  const navLinks = document.querySelectorAll(".nav-link")
  const mobileToggle = document.querySelector(".mobile-toggle")
  const navLinksContainer = document.querySelector(".nav-links")
  const sections = document.querySelectorAll("section[id]")

  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled")
    } else {
      navbar.classList.remove("scrolled")
    }

    // Highlight active section in navbar
    highlightActiveSection()
  })

  // Smooth scroll for nav links
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault()
      const targetId = link.getAttribute("href")
      const targetSection = document.querySelector(targetId)

      if (targetSection) {
        const offsetTop = targetSection.offsetTop - 80
        window.scrollTo({
          top: offsetTop,
          behavior: "smooth",
        })
      }

      // Close mobile menu if open
      navLinksContainer.classList.remove("active")
      mobileToggle.classList.remove("active")
    })
  })

  // Mobile menu toggle
  mobileToggle.addEventListener("click", () => {
    mobileToggle.classList.toggle("active")
    navLinksContainer.classList.toggle("active")
  })

  // Highlight active section based on scroll position
  function highlightActiveSection() {
    let current = ""

    sections.forEach((section) => {
      const sectionTop = section.offsetTop - 100
      const sectionHeight = section.clientHeight

      if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
        current = section.getAttribute("id")
      }
    })

    navLinks.forEach((link) => {
      link.classList.remove("active")
      if (link.getAttribute("href") === `#${current}`) {
        link.classList.add("active")
      }
    })
  }
}

// ============================================
// HERO - Typing effect and rotating words
// ============================================

function initHero() {
  const typingText = document.getElementById("typingText")
  const rotatingWords = document.getElementById("rotatingWords")

  // Typing effect
  const textToType = "Fernando"
  let charIndex = 0

  function typeText() {
    if (charIndex < textToType.length) {
      typingText.textContent += textToType.charAt(charIndex)
      charIndex++
      setTimeout(typeText, 100)
    }
  }

  typeText()

  // Rotating words
  const words = [
    "Full-Stack Developer",
    "Java Developer",
    "Web Developer",
    "C Expert",
    "Bootstrap Specialist",
    "Problem Solver",
  ]
  let wordIndex = 0

  function rotateWords() {
    rotatingWords.style.opacity = "0"

    setTimeout(() => {
      rotatingWords.textContent = words[wordIndex]
      rotatingWords.style.opacity = "1"
      wordIndex = (wordIndex + 1) % words.length
    }, 300)
  }

  // Initial word
  rotatingWords.textContent = words[0]

  // Rotate every 3 seconds
  setInterval(rotateWords, 3000)
}

// ============================================
// COUNTERS - Animated number counting
// ============================================

function initCounters() {
  const counters = document.querySelectorAll(".stat-number")
  let hasAnimated = false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true
          counters.forEach((counter) => {
            animateCounter(counter)
          })
        }
      })
    },
    { threshold: 0.5 },
  )

  const statsSection = document.querySelector(".stats")
  if (statsSection) {
    observer.observe(statsSection)
  }

  function animateCounter(counter) {
    const target = Number.parseInt(counter.getAttribute("data-target"))
    const duration = 2000
    const increment = target / (duration / 16)
    let current = 0

    const updateCounter = () => {
      current += increment
      if (current < target) {
        counter.textContent = Math.floor(current)
        requestAnimationFrame(updateCounter)
      } else {
        counter.textContent = target
      }
    }

    updateCounter()
  }
}

// ============================================
// SKILL BARS - Animated progress bars
// ============================================

function initSkillBars() {
  const skillBars = document.querySelectorAll(".skill-progress")
  let hasAnimated = false

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated) {
          hasAnimated = true
          skillBars.forEach((bar) => {
            const progress = bar.getAttribute("data-progress")
            setTimeout(() => {
              bar.style.width = progress + "%"
            }, 100)
          })
        }
      })
    },
    { threshold: 0.3 },
  )

  const skillsSection = document.querySelector(".skills")
  if (skillsSection) {
    observer.observe(skillsSection)
  }
}

// ============================================
// PROJECTS - Filter and modal functionality
// ============================================

function initProjects() {
  const filterBtns = document.querySelectorAll(".filter-btn")
  const projectCards = document.querySelectorAll(".project-card")
  const modal = document.getElementById("projectModal")
  const modalClose = document.querySelector(".modal-close")
  const modalOverlay = document.querySelector(".modal-overlay")

  // Project data for modal
  const projectData = {
    1: {
      title: "Software de Estoque de Supermercado",
      description:
        "Sistema completo de gerenciamento de estoque desenvolvido em Java com interface desktop. Inclui controle de produtos, entrada e saída de mercadorias, relatórios detalhados e integração com banco de dados MySQL para persistência de dados.",
      tags: ["Java", "MySQL", "Desktop App", "Inventory Management"],
      images: ["/inventory-management-system.png"],
    },
    2: {
      title: "Site CNR",
      description:
        "Website institucional responsivo desenvolvido com HTML5, CSS3, JavaScript e Bootstrap. Design moderno e profissional com navegação intuitiva, seções informativas e otimização para todos os dispositivos.",
      tags: ["HTML", "CSS", "JavaScript", "Bootstrap", "Responsive"],
      images: ["/corporate-website.png"],
    },
    3: {
      title: "HerbsGreen",
      description:
        "Website desenvolvido para uma ONG focada em sustentabilidade e impacto ambiental. Interface clean e acessível, com informações sobre projetos, formas de contribuição e galeria de ações realizadas.",
      tags: ["HTML", "CSS", "JavaScript", "ONG", "Sustainability"],
      images: ["/public/logoh.svg"],
    },
    4: {
      title: "Webapp Lads",
      description:
        "Aplicação web moderna desenvolvida com Node.js e TypeScript. Arquitetura escalável com front-end dinâmico, integração de APIs e funcionalidades avançadas para melhor experiência do usuário.",
      tags: ["Node.js", "TypeScript", "JavaScript", "HTML", "Web App"],
      images: ["/modern-web-application.png"],
    },
  }

  // Filter functionality
  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      const filter = btn.getAttribute("data-filter")

      // Update active button
      filterBtns.forEach((b) => b.classList.remove("active"))
      btn.classList.add("active")

      // Filter projects
      projectCards.forEach((card) => {
        const category = card.getAttribute("data-category")

        if (filter === "all" || category.includes(filter)) {
          card.classList.remove("hidden")
          card.style.display = "block"
        } else {
          card.classList.add("hidden")
          card.style.display = "none"
        }
      })
    })
  })

  // Modal functionality
  const projectBtns = document.querySelectorAll(".project-btn[data-project]")

  projectBtns.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault()
      const projectId = btn.getAttribute("data-project")
      openModal(projectId)
    })
  })

  function openModal(projectId) {
    const project = projectData[projectId]
    if (!project) return

    // Populate modal
    document.getElementById("modalTitle").textContent = project.title
    document.querySelector(".modal-description").textContent = project.description
    document.querySelector(".modal-image").src = project.images[0]
    document.querySelector(".modal-image").alt = project.title

    // Populate tags
    const tagsContainer = document.querySelector(".modal-tags")
    tagsContainer.innerHTML = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("")

    // Show modal
    modal.classList.add("active")
    document.body.style.overflow = "hidden"

    // Reinitialize icons
    lucide.createIcons()
  }

  function closeModal() {
    modal.classList.remove("active")
    document.body.style.overflow = ""
  }

  modalClose.addEventListener("click", closeModal)
  modalOverlay.addEventListener("click", closeModal)

  // Close modal on Escape key
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("active")) {
      closeModal()
    }
  })
}

// ============================================
// CONTACT FORM - Validation and toast notifications
// ============================================

function initContactForm() {
  const form = document.querySelector(".contact-form")
  const inputs = form.querySelectorAll("input, textarea")

  // Real-time validation
  inputs.forEach((input) => {
    input.addEventListener("blur", () => {
      validateField(input)
    })

    input.addEventListener("input", () => {
      if (input.classList.contains("error")) {
        validateField(input)
      }
    })
  })

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault()

    let isValid = true
    inputs.forEach((input) => {
      if (!validateField(input)) {
        isValid = false
      }
    })

    if (isValid) {
      // Simulate form submission
      showToast("Mensagem enviada com sucesso! Entrarei em contato em breve.", "success")
      form.reset()

      // Clear error states
      inputs.forEach((input) => {
        input.classList.remove("error")
        const errorSpan = input.parentElement.querySelector(".form-error")
        if (errorSpan) errorSpan.textContent = ""
      })
    } else {
      showToast("Por favor, corrija os erros no formulário.", "error")
    }
  })

  function validateField(field) {
    const value = field.value.trim()
    const errorSpan = field.parentElement.querySelector(".form-error")
    let errorMessage = ""

    // Check if field is empty
    if (value === "") {
      errorMessage = "Este campo é obrigatório"
    }
    // Email validation
    else if (field.type === "email") {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
      if (!emailRegex.test(value)) {
        errorMessage = "Por favor, insira um email válido"
      }
    }
    // Minimum length for textarea
    else if (field.tagName === "TEXTAREA" && value.length < 10) {
      errorMessage = "A mensagem deve ter pelo menos 10 caracteres"
    }

    // Update UI
    if (errorMessage) {
      field.classList.add("error")
      errorSpan.textContent = errorMessage
      return false
    } else {
      field.classList.remove("error")
      errorSpan.textContent = ""
      return true
    }
  }
}

// Toast notification system
function showToast(message, type = "success") {
  const toast = document.getElementById("toast")
  const toastMessage = toast.querySelector(".toast-message")

  toastMessage.textContent = message
  toast.className = `toast ${type}`
  toast.classList.add("show")

  setTimeout(() => {
    toast.classList.remove("show")
  }, 4000)
}

// ============================================
// BACK TO TOP - Button with scroll progress
// ============================================

function initBackToTop() {
  const backToTopBtn = document.querySelector(".back-to-top")
  const progressCircle = document.querySelector(".progress-ring-circle")
  const radius = progressCircle.r.baseVal.value
  const circumference = 2 * Math.PI * radius

  progressCircle.style.strokeDasharray = `${circumference} ${circumference}`
  progressCircle.style.strokeDashoffset = circumference

  window.addEventListener("scroll", () => {
    const scrollTop = window.pageYOffset
    const docHeight = document.documentElement.scrollHeight - window.innerHeight
    const scrollPercent = scrollTop / docHeight

    // Update progress circle
    const offset = circumference - scrollPercent * circumference
    progressCircle.style.strokeDashoffset = offset

    // Show/hide button
    if (scrollTop > 300) {
      backToTopBtn.classList.add("visible")
    } else {
      backToTopBtn.classList.remove("visible")
    }
  })

  backToTopBtn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    })
  })
}

// ============================================
// MAGNETIC BUTTONS - Mouse follow effect
// ============================================

function initMagneticButtons() {
  const magneticBtns = document.querySelectorAll(".magnetic")

  magneticBtns.forEach((btn) => {
    btn.addEventListener("mousemove", (e) => {
      const rect = btn.getBoundingClientRect()
      const x = e.clientX - rect.left - rect.width / 2
      const y = e.clientY - rect.top - rect.height / 2

      btn.style.transform = `translate(${x * 0.3}px, ${y * 0.3}px)`
    })

    btn.addEventListener("mouseleave", () => {
      btn.style.transform = "translate(0, 0)"
    })
  })
}

// ============================================
// TILT CARDS - 3D hover effect
// ============================================

function initTiltCards() {
  const tiltCards = document.querySelectorAll(".tilt-card")

  tiltCards.forEach((card) => {
    card.addEventListener("mousemove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = e.clientX - rect.left
      const y = e.clientY - rect.top

      const centerX = rect.width / 2
      const centerY = rect.height / 2

      const rotateX = (y - centerY) / 10
      const rotateY = (centerX - x) / 10

      card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.05, 1.05, 1.05)`
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)"
    })
  })
}

// ============================================
// PARTICLES - Animated background particles
// ============================================

function initParticles() {
  const particlesContainer = document.getElementById("particles")
  const particleCount = 30

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Random size between 2-6px
    const size = Math.random() * 4 + 2
    particle.style.width = `${size}px`
    particle.style.height = `${size}px`

    // Random position
    particle.style.left = `${Math.random() * 100}%`
    particle.style.top = `${Math.random() * 100}%`

    // Random animation delay
    particle.style.animationDelay = `${Math.random() * 20}s`
    particle.style.animationDuration = `${Math.random() * 10 + 15}s`

    particlesContainer.appendChild(particle)
  }
}

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Debounce function for performance optimization
function debounce(func, wait) {
  let timeout
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle
  return function (...args) {
    if (!inThrottle) {
      func.apply(this, args)
      inThrottle = true
      setTimeout(() => (inThrottle = false), limit)
    }
  }
}
