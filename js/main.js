const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const heroName = document.getElementById('hero-name');
const heroTitle = document.getElementById('hero-title');
const heroBio = document.getElementById('hero-bio');
const aboutDescription = document.getElementById('about-description');
const aboutList = document.getElementById('about-list');
const skillsGrid = document.getElementById('skills-grid');
const projectsGrid = document.getElementById('projects-grid');
const contactEmail = document.getElementById('contact-email');
const socialLinks = document.getElementById('social-links');

const fallbackData = {
  personal: {
    name: 'Fritz Gayas',
    title: 'Software Developer • Data-Driven Portfolio',
    bio: 'I build modern web experiences with responsive, scalable architecture and clean content management.',
    email: 'hello@fritzgayas.dev'
  },
  about: {
    description: 'I design and deliver digital products using HTML, CSS, JavaScript, and structured JSON content. My work focuses on responsive interfaces, maintainable code, and scalable portfolio architecture.',
    details: [
      '3+ years building modern websites and web apps',
      'Experience with responsive design and scalable content structures',
      'Strong focus on reuse, accessibility, and performance'
    ]
  },
  skills: {
    'Front-End': ['HTML', 'CSS', 'JavaScript', 'Responsive Design'],
    'Back-End': ['Node.js', 'REST APIs', 'Data Modeling'],
    'Tools': ['Git', 'GitHub Pages', 'VS Code']
  },
  projects: [
    {
      id: 'portfolio-site',
      title: 'Data-Driven Portfolio',
      description: 'A project portfolio that loads content from structured JSON for easy updates and scaling.',
      technologies: ['HTML', 'CSS', 'JavaScript'],
      metrics: ['Responsive design', 'JSON-powered content', 'Optimized layout'],
      links: {
        github: 'https://github.com/fritzgayas/professional-portfolio',
        demo: '#projects'
      }
    },
    {
      id: 'project-dashboard',
      title: 'Project Dashboard',
      description: 'Dashboard-style layout for tracking portfolio projects, skills, and contact details in a clean UI.',
      technologies: ['CSS Grid', 'Reusable components', 'Adaptive design'],
      metrics: ['Mobile-first', 'Easy updates', 'Performance-friendly'],
      links: {
        github: 'https://github.com/fritzgayas',
        demo: '#projects'
      }
    }
  ],
  social_links: {
    github: 'https://github.com/fritzgayas',
    linkedin: 'https://linkedin.com/in/fritzgayas',
    email: 'mailto:hello@fritzgayas.dev'
  }
};

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
});

async function loadData() {
  try {
    const response = await fetch('data/portfolio-data.json');
    if (!response.ok) {
      throw new Error('Failed to load JSON');
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.warn('Using fallback portfolio data:', error);
    return fallbackData;
  }
}

function populateHero(personal) {
  heroName.textContent = personal.name;
  heroTitle.textContent = personal.title;
  heroBio.textContent = personal.bio;
  contactEmail.href = `mailto:${personal.email}`;
}

function populateAbout(about) {
  aboutDescription.textContent = about.description;
  aboutList.innerHTML = '';
  about.details.forEach((detail) => {
    const item = document.createElement('div');
    item.className = 'about-list-item';
    item.textContent = detail;
    aboutList.appendChild(item);
  });
}

function populateSkills(skills) {
  skillsGrid.innerHTML = '';
  Object.entries(skills).forEach(([category, list]) => {
    const card = document.createElement('article');
    card.className = 'skill-card';
    card.innerHTML = `
      <h3>${category}</h3>
      <div class="skill-list"></div>
    `;
    const listContainer = card.querySelector('.skill-list');
    list.forEach((skill) => {
      const badge = document.createElement('span');
      badge.className = 'skill-pill';
      badge.textContent = skill;
      listContainer.appendChild(badge);
    });
    skillsGrid.appendChild(card);
  });
}

function populateProjects(projects) {
  projectsGrid.innerHTML = '';
  projects.forEach((project) => {
    const card = document.createElement('article');
    card.className = 'project-card';
    const techList = project.technologies
      .map((tech) => `<span class="project-tech">${tech}</span>`)
      .join('');
    const metricList = project.metrics
      .map((metric) => `<span class="detail-pill">${metric}</span>`)
      .join('');
    card.innerHTML = `
      <div>
        <h3>${project.title}</h3>
        <p>${project.description}</p>
      </div>
      <div class="project-meta">${techList}</div>
      <div class="project-actions">
        <a class="button button-secondary" href="${project.links.github}" target="_blank" rel="noreferrer">Code</a>
        <a class="button" href="${project.links.demo}">Demo</a>
      </div>
      <div>${metricList}</div>
    `;
    projectsGrid.appendChild(card);
  });
}

function populateFooter(links) {
  socialLinks.innerHTML = '';
  Object.entries(links).forEach(([key, href]) => {
    const anchor = document.createElement('a');
    anchor.href = href;
    anchor.target = '_blank';
    anchor.rel = 'noreferrer';
    anchor.textContent = key.charAt(0).toUpperCase() + key.slice(1);
    socialLinks.appendChild(anchor);
  });
}

async function initialize() {
  const portfolioData = await loadData();
  populateHero(portfolioData.personal);
  populateAbout(portfolioData.about);
  populateSkills(portfolioData.skills);
  populateProjects(portfolioData.projects);
  populateFooter(portfolioData.social_links);
}

initialize();
