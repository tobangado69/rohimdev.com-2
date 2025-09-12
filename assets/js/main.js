// Main JavaScript file for portfolio website

document.addEventListener("DOMContentLoaded", function () {
  // Mobile menu functionality
  initMobileMenu();

  // Smooth scrolling for anchor links
  initSmoothScrolling();

  // Add scroll effects
  initScrollEffects();

  // Initialize animations
  initAnimations();

  // Performance monitoring
  initPerformanceMonitoring();

  // Back to top button
  initBackToTop();
});

/**
 * Initialize mobile menu functionality
 */
function initMobileMenu() {
  const mobileMenuBtn = document.getElementById("mobile-menu-btn");
  const mobileMenu = document.getElementById("mobile-menu");

  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener("click", function () {
      const isHidden = mobileMenu.classList.contains("hidden");

      if (isHidden) {
        mobileMenu.classList.remove("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "true");
        // Change icon to X
        mobileMenuBtn.innerHTML = `
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                    </svg>
                `;
      } else {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        // Change icon back to hamburger
        mobileMenuBtn.innerHTML = `
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                `;
      }
    });

    // Close mobile menu when clicking outside
    document.addEventListener("click", function (event) {
      if (
        !mobileMenuBtn.contains(event.target) &&
        !mobileMenu.contains(event.target)
      ) {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = `
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                `;
      }
    });

    // Close mobile menu on link click
    const mobileLinks = mobileMenu.querySelectorAll("a");
    mobileLinks.forEach((link) => {
      link.addEventListener("click", function () {
        mobileMenu.classList.add("hidden");
        mobileMenuBtn.setAttribute("aria-expanded", "false");
        mobileMenuBtn.innerHTML = `
                    <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                `;
      });
    });
  }
}

/**
 * Initialize smooth scrolling for anchor links
 */
function initSmoothScrolling() {
  const anchorLinks = document.querySelectorAll('a[href^="#"]');

  anchorLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      const href = this.getAttribute("href");
      const target = document.querySelector(href);

      if (target) {
        e.preventDefault();
        const headerHeight = document.querySelector("nav").offsetHeight;
        const targetPosition = target.offsetTop - headerHeight - 20;

        window.scrollTo({
          top: targetPosition,
          behavior: "smooth",
        });
      }
    });
  });
}

/**
 * Initialize scroll effects
 */
function initScrollEffects() {
  const nav = document.querySelector("nav");
  let lastScrollY = window.scrollY;

  function updateNavbar() {
    const currentScrollY = window.scrollY;

    if (currentScrollY > 100) {
      nav.classList.add("shadow-lg");
    } else {
      nav.classList.remove("shadow-lg");
    }

    lastScrollY = currentScrollY;
  }

  // Throttle scroll events for better performance
  let ticking = false;
  window.addEventListener("scroll", function () {
    if (!ticking) {
      requestAnimationFrame(function () {
        updateNavbar();
        ticking = false;
      });
      ticking = true;
    }
  });
}

/**
 * Initialize animations using Intersection Observer
 */
function initAnimations() {
  const animateElements = document.querySelectorAll(
    ".slide-up, .fade-in, .blur-in, .slide-right, .slide-left, .zoom-in"
  );

  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("reveal");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  animateElements.forEach((element) => {
    observer.observe(element);
  });
}

/**
 * Back to top button with smooth scroll
 */
function initBackToTop() {
  let btn = document.getElementById("back-to-top");
  if (!btn) {
    btn = document.createElement("button");
    btn.id = "back-to-top";
    btn.className = "back-to-top";
    btn.setAttribute("aria-label", "Back to top");
    btn.innerHTML = `
      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
        <path d="M12 19V5" />
        <path d="M5 12l7-7 7 7" />
      </svg>
    `;
    document.body.appendChild(btn);
  }

  const showAt = 300;
  let ticking = false;
  window.addEventListener(
    "scroll",
    () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          if (window.scrollY > showAt) {
            btn.classList.add("show");
          } else {
            btn.classList.remove("show");
          }
          ticking = false;
        });
        ticking = true;
      }
    },
    { passive: true }
  );

  btn.addEventListener("click", (e) => {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  });
}

/**
 * Initialize performance monitoring
 */
function initPerformanceMonitoring() {
  // Monitor Core Web Vitals
  if ("web-vital" in window) {
    // This would integrate with web-vitals library if included
    // For now, we'll just log basic performance metrics
    window.addEventListener("load", function () {
      setTimeout(function () {
        const perfData = performance.getEntriesByType("navigation")[0];
        console.log(
          "Page Load Time:",
          perfData.loadEventEnd - perfData.loadEventStart,
          "ms"
        );
        console.log(
          "DOM Content Loaded:",
          perfData.domContentLoadedEventEnd -
            perfData.domContentLoadedEventStart,
          "ms"
        );
      }, 0);
    });
  }
}

/**
 * Utility functions
 */

// Debounce function for performance optimization
function debounce(func, wait, immediate) {
  let timeout;
  return function executedFunction() {
    const context = this;
    const args = arguments;
    const later = function () {
      timeout = null;
      if (!immediate) func.apply(context, args);
    };
    const callNow = immediate && !timeout;
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
    if (callNow) func.apply(context, args);
  };
}

// Throttle function for scroll events
function throttle(func, limit) {
  let inThrottle;
  return function () {
    const args = arguments;
    const context = this;
    if (!inThrottle) {
      func.apply(context, args);
      inThrottle = true;
      setTimeout(() => (inThrottle = false), limit);
    }
  };
}

// Check if element is in viewport
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Add loading state to buttons
function addLoadingState(button, text = "Loading...") {
  const originalText = button.textContent;
  button.textContent = text;
  button.disabled = true;
  button.classList.add("opacity-75", "cursor-not-allowed");

  return function removeLoadingState() {
    button.textContent = originalText;
    button.disabled = false;
    button.classList.remove("opacity-75", "cursor-not-allowed");
  };
}

// Form validation helper
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}

// Modal functionality
function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
    document.body.style.overflow = "hidden";
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
    document.body.style.overflow = "auto";
  }
}

// Export functions for use in other scripts
window.portfolioUtils = {
  debounce,
  throttle,
  isInViewport,
  addLoadingState,
  validateEmail,
};

// Make modal functions globally available
window.openModal = openModal;
window.closeModal = closeModal;

// Initialize modal event listeners
document.addEventListener("click", function (e) {
  // Close modal when clicking outside
  if (e.target.classList.contains("modal")) {
    closeModal(e.target.id);
  }

  // Close modal with close button
  if (e.target.closest('button[onclick*="closeModal"]')) {
    e.preventDefault();
    const onclick = e.target
      .closest('button[onclick*="closeModal"]')
      .getAttribute("onclick");
    const modalId = onclick.match(/closeModal\('([^']+)'\)/)[1];
    closeModal(modalId);
  }

  // Prevent modal content clicks from closing the modal
  if (e.target.closest(".modal-content")) {
    e.stopPropagation();
  }
});

// Close modal with Escape key
document.addEventListener("keydown", function (e) {
  if (e.key === "Escape") {
    const activeModal = document.querySelector(".modal.active");
    if (activeModal) {
      closeModal(activeModal.id);
    }
  }
});

// ===== TAILWIND CONFIG =====
// Configure Tailwind CSS theme
if (typeof tailwind !== "undefined") {
  tailwind.config = {
    theme: {
      extend: {
        fontFamily: {
          sans: ["Inter", "system-ui", "sans-serif"],
        },
        colors: {
          primary: {
            50: "#eef2ff",
            100: "#e0e7ff",
            200: "#c7d2fe",
            300: "#a5b4fc",
            400: "#818cf8",
            500: "#6366f1",
            600: "#4f46e5",
            700: "#4338ca",
            800: "#3730a3",
            900: "#312e81",
          },
          secondary: {
            50: "#faf5ff",
            100: "#f3e8ff",
            200: "#e9d5ff",
            300: "#d8b4fe",
            400: "#c084fc",
            500: "#8b5cf6",
            600: "#7c3aed",
            700: "#6d28d9",
            800: "#5b21b6",
            900: "#4c1d95",
          },
          accent: {
            50: "#ecfeff",
            100: "#cffafe",
            200: "#a5f3fc",
            300: "#67e8f9",
            400: "#22d3ee",
            500: "#06b6d4",
            600: "#0891b2",
            700: "#0e7490",
            800: "#155e75",
            900: "#164e63",
          },
          success: {
            50: "#ecfdf5",
            100: "#d1fae5",
            200: "#a7f3d0",
            300: "#6ee7b7",
            400: "#34d399",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
            800: "#065f46",
            900: "#064e3b",
          },
          surface: {
            50: "#0b0b0c",
            100: "#0f1115",
            200: "#12161c",
            300: "#171a21",
            400: "#1b1f27",
            500: "#1f2430",
            600: "#232937",
            700: "#273041",
            800: "#2b3549",
            900: "#2f3a51",
          },
          success: {
            50: "#ecfdf5",
            100: "#d1fae5",
            500: "#10b981",
            600: "#059669",
            700: "#047857",
          },
          warning: {
            50: "#fffbeb",
            100: "#fef3c7",
            500: "#f59e0b",
            600: "#d97706",
            700: "#b45309",
          },
          danger: {
            50: "#fef2f2",
            100: "#fee2e2",
            500: "#ef4444",
            600: "#dc2626",
            700: "#b91c1c",
          },
        },
        animation: {
          "fade-in-up": "fadeInUp 0.6s ease-out",
          "fade-in": "fadeIn 0.6s ease-out",
        },
      },
    },
  };
}

// ===== GLOW BUTTON EFFECTS =====
// Add glow effect to buttons on mouse move
function initGlowButtons() {
  const glowButtons = document.querySelectorAll(".glow-btn");

  glowButtons.forEach((button) => {
    button.addEventListener("mousemove", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      button.style.setProperty("--x", x + "px");
      button.style.setProperty("--y", y + "px");
    });
  });
}

// Initialize glow buttons when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initGlowButtons();
});

// ===== PROJECT FILTERING =====
// Project filtering functionality
function initProjectFiltering() {
  const filterButtons = document.querySelectorAll(".filter-btn");
  const projectItems = document.querySelectorAll(".project-item");

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const filter = this.getAttribute("data-filter");

      // Update active button
      filterButtons.forEach((btn) => btn.classList.remove("active"));
      this.classList.add("active");

      // Filter projects
      projectItems.forEach((item) => {
        if (
          filter === "all" ||
          item.getAttribute("data-category").includes(filter)
        ) {
          item.style.display = "block";
          setTimeout(() => {
            item.style.opacity = "1";
            item.style.transform = "translateY(0)";
          }, 100);
        } else {
          item.style.opacity = "0";
          item.style.transform = "translateY(20px)";
          setTimeout(() => {
            item.style.display = "none";
          }, 300);
        }
      });
    });
  });
}

// Initialize project filtering when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initProjectFiltering();
});

// ===== CONTACT FORM HANDLING =====
// Contact form handling with Web3Forms
function initContactForm() {
  const form = document.getElementById("contact-form");
  const submitBtn = document.getElementById("submit-btn");
  const submitText = document.getElementById("submit-text");
  const submitSpinner = document.getElementById("submit-spinner");
  const messagesContainer = document.getElementById("form-messages");

  if (!form) return; // Exit if form doesn't exist

  // Form validation
  function validateForm() {
    const name = document.getElementById("name").value.trim();
    const email = document.getElementById("email").value.trim();
    const message = document.getElementById("message").value.trim();

    let isValid = true;
    let errors = [];

    // Clear previous error states
    clearFieldErrors();

    // Validate name
    if (!name) {
      showFieldError("name", "Name is required");
      isValid = false;
    } else if (name.length < 2) {
      showFieldError("name", "Name must be at least 2 characters");
      isValid = false;
    }

    // Validate email
    if (!email) {
      showFieldError("email", "Email is required");
      isValid = false;
    } else if (!validateEmail(email)) {
      showFieldError("email", "Please enter a valid email address");
      isValid = false;
    }

    // Validate message
    if (!message) {
      showFieldError("message", "Project description is required");
      isValid = false;
    } else if (message.length < 10) {
      showFieldError(
        "message",
        "Please provide more details about your project (at least 10 characters)"
      );
      isValid = false;
    }

    return isValid;
  }

  // Show field error
  function showFieldError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const fieldGroup = field.closest(".form-group");

    if (fieldGroup) {
      fieldGroup.classList.add("error");
      field.classList.add(
        "border-red-500",
        "focus:border-red-500",
        "focus:ring-red-500"
      );

      // Remove existing error message
      const existingError = fieldGroup.querySelector(".error-message");
      if (existingError) {
        existingError.remove();
      }

      // Add new error message
      const errorDiv = document.createElement("div");
      errorDiv.className = "error-message text-red-400 text-sm mt-1";
      errorDiv.textContent = message;
      fieldGroup.appendChild(errorDiv);
    }
  }

  // Clear field errors
  function clearFieldErrors() {
    const errorGroups = document.querySelectorAll(".form-group.error");
    errorGroups.forEach((group) => {
      group.classList.remove("error");
      const field = group.querySelector("input, textarea");
      if (field) {
        field.classList.remove(
          "border-red-500",
          "focus:border-red-500",
          "focus:ring-red-500"
        );
      }
      const errorMessage = group.querySelector(".error-message");
      if (errorMessage) {
        errorMessage.remove();
      }
    });
  }

  // Show success message
  function showSuccessMessage(message) {
    messagesContainer.innerHTML = `
      <div class="alert alert-success p-4 rounded-lg text-white text-center">
        <div class="flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path>
          </svg>
          <span>${message}</span>
        </div>
      </div>
    `;
    messagesContainer.classList.add("show");
    setTimeout(() => {
      messagesContainer.classList.remove("show");
    }, 5000);
  }

  // Show error message
  function showErrorMessage(message) {
    messagesContainer.innerHTML = `
      <div class="alert alert-error p-4 rounded-lg text-white text-center">
        <div class="flex items-center justify-center space-x-2">
          <svg class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
          </svg>
          <span>${message}</span>
        </div>
      </div>
    `;
    messagesContainer.classList.add("show");
    setTimeout(() => {
      messagesContainer.classList.remove("show");
    }, 5000);
  }

  // Set loading state
  function setLoadingState(loading) {
    if (loading) {
      submitBtn.disabled = true;
      submitText.textContent = "Sending...";
      submitSpinner.classList.remove("hidden");
      submitBtn.classList.add("opacity-75", "cursor-not-allowed");
    } else {
      submitBtn.disabled = false;
      submitText.textContent = "Send Message";
      submitSpinner.classList.add("hidden");
      submitBtn.classList.remove("opacity-75", "cursor-not-allowed");
    }
  }

  // Form submission
  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoadingState(true);
    clearFieldErrors();

    try {
      const formData = new FormData(form);

      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        showSuccessMessage(
          "Thank you! Your message has been sent successfully. I'll get back to you within 24 hours."
        );
        form.reset();
      } else {
        showErrorMessage(
          "Sorry, there was an error sending your message. Please try again or contact me directly at rohimjoy70@gmail.com"
        );
      }
    } catch (error) {
      console.error("Form submission error:", error);
      showErrorMessage(
        "Sorry, there was an error sending your message. Please try again or contact me directly at rohimjoy70@gmail.com"
      );
    } finally {
      setLoadingState(false);
    }
  });

  // Real-time validation
  const inputs = form.querySelectorAll("input, textarea");
  inputs.forEach((input) => {
    input.addEventListener("blur", function () {
      if (this.value.trim()) {
        clearFieldErrors();
      }
    });
  });
}

// Initialize contact form when DOM is loaded
document.addEventListener("DOMContentLoaded", function () {
  initContactForm();
});
