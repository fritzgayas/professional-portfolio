const navToggle = document.getElementById('nav-toggle');
const navMenu = document.getElementById('nav-menu');
const navLinks = document.querySelectorAll('.nav a');
const heroName = document.getElementById('hero-name');
const heroTitle = document.getElementById('hero-title');
const heroBio = document.getElementById('hero-bio');
const aboutDescription = document.getElementById('about-description');
const aboutList = document.getElementById('about-list');
const methodologyGrid = document.getElementById('methodology-grid');
const skillsGrid = document.getElementById('skills-grid');
const projectsGrid = document.getElementById('projects-grid');
const contactEmail = document.getElementById('contact-email');
const socialLinks = document.getElementById('social-links');

const fallbackData = {
  personal: {
    name: 'QA Engineer',
    title: 'Test Automation Specialist',
    bio: 'Delivering reliable software through automation, regression coverage, and continuous testing best practices.',
    email: 'hello@example.com'
  },
  about: {
    description: 'I help product teams reduce risk and ship quality faster by building test automation pipelines, improving test coverage, and applying measurable QA processes.',
    details: [
      'Experience with functional, regression, and integration testing',
      'Test automation frameworks for web, API, and mobile applications',
      'Strong focus on process, observability, and release confidence'
    ]
  },
  methodology: [
    {
      title: 'Risk-Based Testing',
      description: 'Focus on the highest-value tests that protect the most critical paths in production and reduce release risk.'
    },
    {
      title: 'Automation-First Workflow',
      description: 'Use automated regression, smoke, and API tests to catch issues early and accelerate delivery cycles.'
    },
    {
      title: 'Continuous Quality Feedback',
      description: 'Integrate test results with CI/CD pipelines and monitor quality metrics from sprint to sprint.'
    }
  ],
  skills: {
    'Test Automation': ['Selenium', 'Playwright', 'Cypress', 'TestNG', 'JUnit'],
    'Quality Engineering': ['Test Strategy', 'Regression Testing', 'API Testing', 'Performance Validation'],
    'Tools & Platforms': ['GitHub Actions', 'Jenkins', 'Postman', 'JIRA', 'Docker']
  },
  projects: [
    {
      id: 'automation-framework',
      title: 'Automation Framework',
      description: 'Built a scalable test automation framework for web and API validation to reduce manual regression effort.',
      technologies: ['Playwright', 'REST Assured', 'Node.js'],
      metrics: ['80+ automated regression tests', '30% faster release validation', 'CI pipeline integration'],
      links: {
        github: 'https://github.com/your-qa-repo',
        demo: '#projects'
      }
    },
    {
      id: 'api-test-suite',
      title: 'API Test Suite',
      description: 'Automated contract and integration tests for backend APIs, enabling reliable deployment pipelines.',
      technologies: ['Postman', 'Newman', 'GitHub Actions'],
      metrics: ['API coverage increased by 45%', 'Automated nightly execution'],
      links: {
        github: 'https://github.com/your-qa-repo',
        demo: '#projects'
      }
    }
  ],
  social_links: {
    github: 'https://github.com/',
    linkedin: 'https://linkedin.com/',
    email: 'mailto:hello@example.com'
  }
};

navToggle.addEventListener('click', () => {
  navMenu.classList.toggle('open');
  navToggle.setAttribute('aria-expanded', navMenu.classList.contains('open'));
});

navLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (navMenu.classList.contains('open')) {
      navMenu.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    }
  });
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

function populateMethodology(methodology) {
  methodologyGrid.innerHTML = '';
  methodology.forEach((step) => {
    const card = document.createElement('article');
    card.className = 'methodology-card';
    card.innerHTML = `
      <h3>${step.title}</h3>
      <p>${step.description}</p>
    `;
    methodologyGrid.appendChild(card);
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
  populateMethodology(portfolioData.methodology);
  populateSkills(portfolioData.skills);
  populateProjects(portfolioData.projects);
  populateFooter(portfolioData.social_links);
}

initialize();
