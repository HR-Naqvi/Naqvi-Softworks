const SITE_CONFIG = {
  whatsapp: "923107577184",
  email: "mailto:naqvisoftworks@gmail.com",
  projects: {
    gym: {
      demoUrl: "",
      videoUrl: ""
    },
    zarai: {
      demoUrl: "",
      videoUrl: ""
    }
  }
};

// =================================================
// ADD NEW PORTFOLIO PROJECTS BELOW
// =================================================
const portfolioProjects = [
  {
    id: "gym-management-system",
    title: "Gym Management System",
    shortDescription: "An easy-to-use system that helps gyms manage members, attendance, fees, expenses, receipts, and daily business activities.",
    description: "The Gym Management System is a simple and easy-to-use solution for managing the daily work of a gym. It helps gym owners and staff manage members, track attendance, collect fees, manage trainers, record expenses, and print payment receipts. The system automatically shows unpaid fees as due and keeps all important gym records in one place. A main dashboard gives the owner a clear view of members, payments, expenses, income, and profit or loss. The system also includes secure login, separate male and female member management, attendance records, and useful business reports.",
    purpose:
      "The main purpose of this system is to make gym management easier, reduce manual work, keep records organized, and help gym owners easily understand their business performance.",
    image: "gym.png",
    videoUrl: "https://drive.google.com/file/d/1koPm2uOPhsA8QFt4K_sbCpiI85J_eCym/view?usp=drive_link",
    demoUrl: "",
    technologies: ["Secure login system","Management Dashboard","Male and female member management","Thermal Printer Integration", "Reports Generation"],
    features: [
"Attendance tracking",
"Attendance history",
"Monthly fee management",
"Automatic due fee status",
"Payment record management",
"Payment receipt printing",
"Thermal printer support",
"Trainer management",
"Trainer assignment",
"Expense management",
"Income tracking",
"Profit and loss reports",
"Business reports",
"Main business dashboard",
"Daily gym activity management"

    ]
  },
  {
    id: "zarai-markaz-management-system",
    title: "Zarai Markaz Management System",
    shortDescription: "An easy-to-use system for managing agricultural products, sales, purchases, stock, accounts, billing, and daily business activities.",
    description:
      "The Agriculture Management System is a complete solution designed to make agricultural business management easier and more organized. It provides a main dashboard where business owners can quickly see important information about their business, including sales, purchases, stock, payments, expenses, and overall business activity. The system allows users to add and manage products, companies, and product categories. It also includes a billing system for sales and purchases, barcode scanner support for faster product handling, and thermal printer support for printing receipts. The account management system helps users keep track of payments, outstanding amounts, and business transactions. The system also provides different reports to help business owners understand their sales, purchases, stock, expenses, and overall business performance.",
    purpose:
      "The main purpose of this system is to make agricultural business management simple, organized, and faster. It helps business owners manage products, stock, sales, purchases, accounts, billing, and reports from one place.",
    image: "assets/images/zarai.png",
    videoUrl: "https://drive.google.com/file/d/1c25EPVPVy8cDez5dAHe_pSgy1imB5SAa/view?usp=sharing",
    demoUrl: "",
    technologies: ["Secure login system","Main business dashboard","Barcode Scanner Integration","Thermal Printer Integration","Business performance reports"],
    features: [
"Product management",
"Product category management",
"Company management",
"Stock management",
"Sales management",
"Purchase management",
"Billing system",
"Barcode scanner support",
"Thermal printer support",
"Receipt printing",
"Customer account management",
"Supplier account management",
"Outstanding payment tracking",
"Expense management",
"Income tracking",
"Daily business transaction records",
"Sales and purchase reports",
"Stock reports",
"Expense reports",
"Account reports",
"Easy-to-use management system"
    ]
  }
];

const buildWhatsAppUrl = (message = "") => {
  const text = encodeURIComponent(message);
  return `https://wa.me/${SITE_CONFIG.whatsapp}?text=${text}`;
};

const getGoogleDriveEmbedUrl = (url) => {
  if (!url || typeof url !== "string") {
    return null;
  }

  const trimmed = url.trim();
  if (!trimmed) {
    return null;
  }

  if (trimmed.includes("/preview") || trimmed.includes("/embed")) {
    return trimmed;
  }

  try {
    const parsed = new URL(trimmed.replace(/&amp;/g, "&"));
    const queryFileId = parsed.searchParams.get("id") || parsed.searchParams.get("fileid");

    if (queryFileId) {
      return `https://drive.google.com/file/d/${queryFileId}/preview`;
    }

    const pathnameMatch = parsed.pathname.match(/(?:\/d\/|\/file\/d\/)([A-Za-z0-9_-]{10,})/i);
    if (pathnameMatch && pathnameMatch[1]) {
      return `https://drive.google.com/file/d/${pathnameMatch[1]}/preview`;
    }
  } catch (error) {
    // Fall back to regex parsing for non-standard sharing URLs.
  }

  const fileIdMatch = trimmed.match(/(?:\/d\/|\/file\/d\/|id=)([A-Za-z0-9_-]{10,})/i);
  const fileId = fileIdMatch ? fileIdMatch[1] : null;

  if (!fileId) {
    return null;
  }

  return `https://drive.google.com/file/d/${fileId}/preview`;
};

const renderPortfolioCards = () => {
  const grid = document.querySelector("[data-portfolio-grid]");
  if (!grid) return;

  grid.innerHTML = portfolioProjects
    .map(
      (project) => `
        <article class="portfolio-card reveal" data-project-card="${project.id}">
          <div class="portfolio-card-media">
            <img src="${project.image}" alt="${project.title} project preview" class="portfolio-card-image" loading="lazy" />
            <div class="portfolio-card-overlay"></div>
            <span class="portfolio-card-badge">${project.title}</span>
          </div>
          <div class="portfolio-card-body">
            <p>${project.shortDescription}</p>
          
            <div class="project-actions">
              <button type="button" class="btn btn-secondary btn-small" data-open-project="${project.id}">View Details</button>
            </div>
          </div>
        </article>
      `
    )
    .join("");
};

const openProjectModal = (projectId) => {
  const project = portfolioProjects.find((item) => item.id === projectId);
  if (!project) return;

  const modal = document.getElementById("projectModal");
  if (!modal) return;

  const title = document.getElementById("projectModalTitle");
  const purpose = document.getElementById("projectModalPurpose");
  const technologies = document.getElementById("projectModalTechnologies");
  const description = document.getElementById("projectModalDescription");
  const features = document.getElementById("projectModalFeatures");
  const videoSection = document.getElementById("projectVideoSection");
  const videoFrame = document.getElementById("projectVideoFrame");
  const demoLink = document.getElementById("projectDemoLink");

  if (!title || !purpose || !technologies || !description || !features || !videoSection || !videoFrame || !demoLink) {
    return;
  }

  title.textContent = project.title;
  purpose.textContent = project.purpose || project.shortDescription || "";
  technologies.innerHTML = (project.technologies || []).map((tech) => `<span>${tech}</span>`).join("");
  description.innerHTML = project.description ? `<p>${project.description}</p>` : "";
  features.innerHTML = (project.features || []).map((feature) => `<li>${feature}</li>`).join("");

  const embedUrl = getGoogleDriveEmbedUrl(project.videoUrl);
  if (embedUrl) {
    videoFrame.src = embedUrl;
    videoSection.classList.remove("hidden");
  } else {
    videoFrame.src = "";
    videoSection.classList.add("hidden");
  }

  if (project.demoUrl) {
    demoLink.href = project.demoUrl;
    demoLink.textContent = "Open Demo";
    demoLink.style.display = "inline-flex";
  } else {
    demoLink.href = "contact.html";
    demoLink.textContent = "Request Demo";
    demoLink.style.display = "inline-flex";
  }

  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
};

const closeProjectModal = () => {
  const modal = document.getElementById("projectModal");
  if (!modal) return;

  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  const videoFrame = document.getElementById("projectVideoFrame");
  if (videoFrame) {
    videoFrame.src = "";
  }
};

document.addEventListener("DOMContentLoaded", () => {
  const header = document.querySelector(".site-header");
  const navToggle = document.querySelector(".nav-toggle");
  const nav = document.querySelector(".main-nav");

  const setHeaderState = () => {
    if (!header) return;
    if (window.scrollY > 24) {
      header.classList.add("scrolled");
    } else {
      header.classList.remove("scrolled");
    }
  };

  setHeaderState();
  window.addEventListener("scroll", setHeaderState, { passive: true });

  if (navToggle && nav) {
    navToggle.addEventListener("click", () => {
      const isOpen = document.body.classList.toggle("nav-open");
      navToggle.setAttribute("aria-expanded", String(isOpen));
    });

    nav.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        document.body.classList.remove("nav-open");
        navToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  document.querySelectorAll('[href^="https://wa.me"]').forEach((link) => {
    link.href = `https://wa.me/${SITE_CONFIG.whatsapp}`;
  });

  document.querySelectorAll('[data-email-link], [href^="mailto:"]').forEach((link) => {
    link.href = SITE_CONFIG.email;
  });

  const projectButtons = document.querySelectorAll("[data-project]");
  projectButtons.forEach((button) => {
    const projectKey = button.dataset.project;
    const type = button.dataset.type;
    const project = SITE_CONFIG.projects[projectKey];
    const url = project ? project[type === "demo" ? "demoUrl" : "videoUrl"] : "";

    if (!url) {
      button.style.display = "none";
      return;
    }

    button.href = url;
    button.setAttribute("target", "_blank");
    button.setAttribute("rel", "noreferrer");
  });

  const contactForm = document.getElementById("contactForm");
  if (contactForm) {
    contactForm.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(contactForm);
      const data = Object.fromEntries(formData.entries());
      const message = [
        "Hello Naqvi Softworks,",
        "I would like to discuss a software project.",
        "",
        `Name: ${data.name || ""}`,
        `Service: ${data.service || ""}`,
        `Project Details: ${data.details || ""}`,
        `Email: ${data.email || ""}`,
        `Phone: ${data.phone || ""}`
      ].join("\n");

      window.open(buildWhatsAppUrl(message), "_blank", "noopener,noreferrer");
      contactForm.reset();
    });
  }

  renderPortfolioCards();

  document.querySelectorAll("[data-open-project]").forEach((button) => {
    button.addEventListener("click", () => {
      openProjectModal(button.dataset.openProject);
    });
  });

  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.addEventListener("click", (event) => {
      if (event.target.hasAttribute("data-modal-close")) {
        closeProjectModal();
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape" && modal.classList.contains("open")) {
        closeProjectModal();
      }
    });
  }

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window) {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );

    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("visible"));
  }
});
