'use strict';

const menuButton = document.querySelector('.menu-toggle');
const navigation = document.querySelector('#navigation');
menuButton.addEventListener('click', () => {
  const expanded = menuButton.getAttribute('aria-expanded') === 'true';
  menuButton.setAttribute('aria-expanded', String(!expanded));
  navigation.classList.toggle('open', !expanded);
});
navigation.addEventListener('click', (event) => {
  if (event.target.closest('a')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
  }
});
document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && navigation.classList.contains('open')) {
    menuButton.setAttribute('aria-expanded', 'false');
    navigation.classList.remove('open');
    menuButton.focus();
  }
});

const filters = document.querySelectorAll('.filter');
const cards = document.querySelectorAll('.project-card');
filters.forEach((button) => {
  button.addEventListener('click', () => {
    const category = button.dataset.filter;
    filters.forEach((filter) => {
      const selected = filter === button;
      filter.classList.toggle('active', selected);
      filter.setAttribute('aria-pressed', String(selected));
    });
    let visibleCount = 0;
    cards.forEach((card) => {
      const visible = category === 'all' || card.dataset.categories.split(' ').includes(category);
      card.hidden = !visible;
      if (visible) visibleCount += 1;
    });
    document.querySelector('#filter-status').textContent = `${visibleCount} projects shown for ${button.textContent.trim().replace(/\s+/g, ' ')}.`;
  });
});

const projects = {
  triage: {
    title: 'AI-assisted incident triage',
    context: 'Microsoft / Software Engineer / Professional work',
    problem: 'Service investigations require engineers to classify failures, gather supporting evidence, and decide which actions are safe. AI-assisted recommendations need clear boundaries before they can be useful in production.',
    contribution: [
      'Built AI-assisted workflows to identify and classify service issues and surface evidence-based investigation and remediation recommendations.',
      'Designed deterministic failure classification, fingerprinting, deduplication, and confidence metadata.',
      'Added human approval gates and feature flags to keep AI-assisted production actions controlled.'
    ],
    outcome: 'Contributed to a reported 30% reduction in time to resolve service issues. This is a professional team outcome reported in my CV, not an independently benchmarked project metric.',
    tools: 'AI-assisted workflows, deterministic checks, observability, approval gates, feature flags.',
    note: 'High-level account of professional work. Implementation details, source code, and production data are not public.'
  },
  pipelines: {
    title: 'Reliable telemetry & data workflows',
    context: 'Microsoft / Software Engineer / Professional work',
    problem: 'Engineering teams need dependable telemetry workflows and a clear picture of freshness, missed runs, runtime trends, and queue latency to investigate issues and plan capacity.',
    contribution: [
      'Engineered pipeline-health and data-freshness monitoring workflows that generate evidence-based investigation recommendations.',
      'Modernized orchestration with validation, dependency management, scheduled triggers, concurrency controls, retry policies, and production monitoring.',
      'Developed React and TypeScript dashboards backed by Python APIs to surface operational health and capacity-planning signals.'
    ],
    outcome: 'Monitoring workflows reduced engineer triage time by 25%. Orchestration improvements contributed to a reported 30% improvement in system performance. Figures are from my CV and describe professional outcomes, not public benchmarks.',
    tools: 'Data pipelines, orchestration, React, TypeScript, Python APIs, monitoring.',
    note: 'Conceptual overview only. Internal dashboards and proprietary code are not reproduced.'
  },
  nutrition: {
    title: 'AI fitness & nutrition companion',
    context: 'Independent / Final-year project',
    problem: 'Nutrition recommendations should reflect local foods and the people using them. I built a system tailored to Kenyan and African populations rather than treating local context as an afterthought.',
    contribution: [
      'Curated a Kenyan food database and combined it with BMI, BMR, and TDEE calculations.',
      'Built a scikit-learn regression model for calorie prediction, with a target mean absolute error below 150 kcal.',
      'Integrated a GPT-powered chatbot with a React frontend, Node.js/Express backend, MySQL storage, and JWT authentication.'
    ],
    outcome: 'An end-to-end final-year recommendation system connecting local food data, machine learning, and a conversational interface. MAE below 150 kcal was a target, not a verified achieved result.',
    tools: 'React, Node.js, Express.js, MySQL, JWT, scikit-learn, GPT.',
    url: 'https://github.com/njericlaire/Final-project',
    note: 'Educational project, not medical advice. No clinical validation is claimed.'
  },
  backfill: {
    title: 'Self-service data backfill portal',
    context: 'Selected project / Described in my CV',
    problem: 'Initiating date-range backfills should not require users to directly modify production schedules.',
    contribution: [
      'Developed a React interface integrated with REST APIs.',
      'Enabled users to initiate, monitor, and manage date-range data backfills through a dedicated interface.'
    ],
    outcome: 'A self-service workflow for backfill management without direct production-schedule edits. No quantified adoption or performance result is claimed.',
    tools: 'React, REST APIs, data operations.',
    note: 'Source code and a public demo are not linked because a public repository has not been verified.'
  },
  agents: {
    title: 'Agentic AI explorations',
    context: 'Independent / Public learning repository',
    problem: 'Building useful AI systems starts with understanding how models, messages, tools, and structured responses fit together.',
    contribution: [
      'Published hands-on LangChain learning notebooks in a public GitHub repository.',
      'Explored model integration, message handling, tool use, middleware, and structured outputs.'
    ],
    outcome: 'An evolving learning lab demonstrating practical exploration of AI application building blocks. This is not presented as a production agent platform.',
    tools: 'Python, LangChain, Jupyter notebooks.',
    url: 'https://github.com/njericlaire/Agentic-AI',
    note: 'Repository contents were reviewed to verify the topics listed here.'
  },
  property: {
    title: 'Real-estate platform backend',
    context: 'Tilil Technology / Software Engineer Intern / May-August 2024',
    problem: 'A property-management platform needs backend support for listings, tenant workflows, and payment-related features.',
    contribution: [
      'Contributed to a real-estate platform supporting property management, tenants, and payments.',
      'Implemented Node.js and MySQL backend functionality for property listings and payment-related features.',
      'Collaborated with engineers to improve usability and apply secure data-management practices.'
    ],
    outcome: 'Hands-on team experience delivering backend features for a real-estate platform. No unverified business or performance metrics are claimed.',
    tools: 'Node.js, MySQL, backend development, team collaboration.',
    note: 'Professional experience summary; proprietary code is not shared.'
  }
};

const dialog = document.querySelector('#project-dialog');
const dialogContent = document.querySelector('#dialog-content');
function appendTextElement(parent, tag, text, className) {
  const element = document.createElement(tag);
  element.textContent = text;
  if (className) element.className = className;
  parent.append(element);
  return element;
}
document.querySelectorAll('[data-project]').forEach((button) => {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project];
    dialogContent.replaceChildren();
    appendTextElement(dialogContent, 'p', project.context, 'project-type');
    const title = appendTextElement(dialogContent, 'h2', project.title);
    title.id = 'dialog-title';
    appendTextElement(dialogContent, 'h3', 'The challenge');
    appendTextElement(dialogContent, 'p', project.problem);
    appendTextElement(dialogContent, 'h3', 'What I built & contributed');
    const contributions = document.createElement('ul');
    project.contribution.forEach((text) => appendTextElement(contributions, 'li', text));
    dialogContent.append(contributions);
    appendTextElement(dialogContent, 'h3', 'Outcome');
    appendTextElement(dialogContent, 'p', project.outcome);
    appendTextElement(dialogContent, 'h3', 'Tools & approaches');
    appendTextElement(dialogContent, 'p', project.tools);
    if (project.url) {
      const footer = appendTextElement(dialogContent, 'div', '', 'dialog-footer');
      const link = appendTextElement(footer, 'a', 'Explore the source on GitHub ↗');
      link.href = project.url;
      link.target = '_blank';
      link.rel = 'noopener';
    }
    appendTextElement(dialogContent, 'p', project.note, 'dialog-disclaimer');
    dialog.showModal();
  });
});
document.querySelector('#close-dialog').addEventListener('click', () => dialog.close());
dialog.addEventListener('click', (event) => {
  const bounds = dialog.getBoundingClientRect();
  if (event.target === dialog && (event.clientX < bounds.left || event.clientX > bounds.right || event.clientY < bounds.top || event.clientY > bounds.bottom)) {
    dialog.close();
  }
});

document.querySelector('#copy-email').addEventListener('click', async () => {
  const status = document.querySelector('#copy-status');
  try {
    if (!navigator.clipboard) {
      status.textContent = 'Copy is unavailable in this browser. Select the email above or click it to send a message.';
      return;
    }
    await navigator.clipboard.writeText('clairemwas20@gmail.com');
    status.textContent = 'Email copied. Looking forward to hearing from you!';
  } catch (error) {
    console.error('Unable to copy email:', error);
    status.textContent = 'Could not copy the email. Select the email above or click it to send a message.';
  }
});
document.querySelector('#year').textContent = String(new Date().getFullYear());
