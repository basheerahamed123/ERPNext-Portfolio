// Interactive Canvas Particle & Graph Network
const canvas = document.getElementById('bg-canvas');
if (canvas) {
  const ctx = canvas.getContext('2d');
  let width, height;
  let particles = [];

  function initCanvas() {
    width = canvas.width = window.innerWidth;
    height = canvas.height = window.innerHeight;
    particles = [];
    const particleCount = Math.floor(width / 22);

    for (let i = 0; i < particleCount; i++) {
      particles.push({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.4,
        vy: (Math.random() - 0.5) * 0.4,
        radius: Math.random() * 1.8 + 0.8,
        color: Math.random() > 0.6 ? '#00F0FF' : '#0089FF'
      });
    }
  }

  function renderCanvas() {
    ctx.clearRect(0, 0, width, height);

    // Draw connections
    for (let i = 0; i < particles.length; i++) {
      for (let j = i + 1; j < particles.length; j++) {
        const dx = particles[i].x - particles[j].x;
        const dy = particles[i].y - particles[j].y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        if (dist < 110) {
          ctx.beginPath();
          ctx.strokeStyle = `rgba(0, 240, 255, ${0.12 * (1 - dist / 110)})`;
          ctx.lineWidth = 0.6;
          ctx.moveTo(particles[i].x, particles[i].y);
          ctx.lineTo(particles[j].x, particles[j].y);
          ctx.stroke();
        }
      }
    }

    // Update & Draw particles
    particles.forEach(p => {
      p.x += p.vx;
      p.y += p.vy;

      if (p.x < 0 || p.x > width) p.vx *= -1;
      if (p.y < 0 || p.y > height) p.vy *= -1;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.shadowBlur = 8;
      ctx.shadowColor = p.color;
      ctx.fill();
    });

    requestAnimationFrame(renderCanvas);
  }

  window.addEventListener('resize', initCanvas);
  initCanvas();
  renderCanvas();
}

// Navbar Scroll Effect
const navbar = document.querySelector('.navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 40) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// Mobile Navigation Toggle
const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
const navLinks = document.querySelector('.nav-links');
const menuIcon = mobileMenuBtn ? mobileMenuBtn.querySelector('i') : null;

if (mobileMenuBtn && navLinks) {
  mobileMenuBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    const isOpen = navLinks.classList.toggle('mobile-open');
    if (menuIcon) {
      menuIcon.className = isOpen ? 'fas fa-times' : 'fas fa-bars';
    }
  });

  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navLinks.classList.remove('mobile-open');
      if (menuIcon) menuIcon.className = 'fas fa-bars';
    });
  });

  document.addEventListener('click', (e) => {
    if (!navLinks.contains(e.target) && !mobileMenuBtn.contains(e.target)) {
      if (navLinks.classList.contains('mobile-open')) {
        navLinks.classList.remove('mobile-open');
        if (menuIcon) menuIcon.className = 'fas fa-bars';
      }
    }
  });
}

// Active Nav Link Scrollspy
const sections = document.querySelectorAll('section[id]');
window.addEventListener('scroll', () => {
  const scrollY = window.pageYOffset + 200;
  sections.forEach(current => {
    const sectionHeight = current.offsetHeight;
    const sectionTop = current.offsetTop;
    const sectionId = current.getAttribute('id');
    const navItem = document.querySelector(`.nav-links a[href*="${sectionId}"]`);

    if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
      if (navItem) {
        document.querySelectorAll('.nav-links a').forEach(a => a.classList.remove('active'));
        navItem.classList.add('active');
      }
    }
  });
});

// Interactive Frappe Bench Terminal Simulation
const terminalOutput = document.getElementById('terminal-output');
const terminalInput = document.getElementById('terminal-input');
const quickCmdBtns = document.querySelectorAll('.quick-cmd-btn');

const terminalCommands = {
  'help': `Available Frappe & Bench commands:
  • <span class="terminal-accent">bench status</span>     - Check Frappe services (Redis, MariaDB, Worker)
  • <span class="terminal-accent">bench whoami</span>     - Display Basheer's ERP developer summary
  • <span class="terminal-accent">bench list-apps</span>  - Show installed apps & custom modules
  • <span class="terminal-accent">bench skills</span>     - List core technical stack & ERP domains
  • <span class="terminal-accent">bench projects</span>   - Display flagship projects summary
  • <span class="terminal-accent">bench contact</span>    - Show contact details & links
  • <span class="terminal-accent">bench run-tests</span>  - Run simulated DocType test suite
  • <span class="terminal-accent">clear</span>            - Clear terminal window`,

  'bench status': `<span class="terminal-success">● Frappe Bench v15.x [Production Ready]</span>
  ├─ MariaDB 10.6    : <span class="terminal-success">RUNNING (Port 3306)</span>
  ├─ Redis Queue     : <span class="terminal-success">HEALTHY (Port 11000)</span>
  ├─ Redis Cache     : <span class="terminal-success">HEALTHY (Port 13000)</span>
  ├─ Celery Workers  : <span class="terminal-success">4/4 ACTIVE</span>
  └─ Site: <span class="terminal-accent">basheer.erpnext.local</span> [Status: OK, Latency: 12ms]`,

  'bench whoami': `--------------------------------------------------
<span class="terminal-success">BASHEER AHAMED JR</span> — ERPNext / Frappe Developer
Location : Chennai, India
Experience : 1+ Year hands-on ERP & Frappe Engineering
Specialty : Custom DocTypes, Workflow Automation, SQL, MariaDB, Python & REST APIs
--------------------------------------------------`,

  'bench list-apps': `Installed Apps in current Bench:
  1. <span class="terminal-accent">frappe</span> (v15.x) [core framework]
  2. <span class="terminal-accent">erpnext</span> (v15.x) [enterprise resource planning]
  3. <span class="terminal-success">bike_service_management</span> (v1.2) [custom Frappe app by Basheer]
  4. <span class="terminal-success">procurement_workflow_pro</span> (v1.0) [custom approval engine]
  5. <span class="terminal-success">sign_language_ml</span> (v1.0) [TensorFlow integration]`,

  'bench skills': `<span class="terminal-success">⚡ Core Skill Matrix:</span>
  • Backend  : Python, Frappe ORM, REST APIs, Server Scripts, Jinja2
  • Frontend : JavaScript (ES6+), HTML5, CSS3, Client Scripts, Custom UI
  • Database : MariaDB, SQL Query Optimization, Indexing
  • Modules  : Accounting, Procurement, Sales, Inventory, Manufacturing, Service
  • Cloud/OS : Linux (Ubuntu), AWS EC2, AWS S3 Basics, Git, VS Code, Jira`,

  'bench projects': `<span class="terminal-success">🚀 Featured Implementations:</span>
  1. <strong>Bike Service Management ERP</strong> (Custom DocTypes, Job Cards, Parts Usage, Billing)
  2. <strong>Procurement & Accounting Automation</strong> (Multi-tier Approval Workflows, Custom Reports)
  3. <strong>Manufacturing & Inventory Optimizations</strong> (BOM, Stock Audits & Validations)
  4. <strong>Sign Language AI Recognition</strong> (OpenCV, TensorFlow gesture model)`,

  'bench contact': `📬 Connect with Basheer Ahamed JR:
  • Primary Email : <a href="mailto:basheerahamedjr@gmail.com" class="terminal-accent">basheerahamedjr@gmail.com</a>
  • LinkedIn      : <a href="https://www.linkedin.com/in/basheer-ahamed-jr-996479284/" target="_blank" class="terminal-accent">linkedin.com/in/basheer-ahamed-jr</a>
  • GitHub        : <a href="https://github.com/basheerahamed123" target="_blank" class="terminal-accent">github.com/basheerahamed123</a>
  • Location      : Chennai, Tamil Nadu, India`,

  'bench run-tests': `<span class="terminal-accent">[TEST SUITE] Running automated validations...</span>
  ✔ test_doctype_bike_service_workflow() ..... <span class="terminal-success">PASSED (0.04s)</span>
  ✔ test_inventory_parts_deduction() ......... <span class="terminal-success">PASSED (0.02s)</span>
  ✔ test_role_based_field_permissions() ...... <span class="terminal-success">PASSED (0.01s)</span>
  ✔ test_sql_procurement_analytics() ......... <span class="terminal-success">PASSED (0.03s)</span>
  --------------------------------------------------
  <span class="terminal-success">ALL 4 TESTS PASSED (100% Code Coverage on Core Hooks)</span>`
};

function executeCommand(rawCmd) {
  const cmd = rawCmd.trim().toLowerCase();

  if (cmd === 'clear') {
    terminalOutput.innerHTML = '';
    return;
  }

  // Add command entry to terminal history
  const cmdLine = document.createElement('div');
  cmdLine.className = 'terminal-line';
  cmdLine.innerHTML = `<span class="terminal-prompt">frappe@bench:~$</span> <span class="terminal-cmd">${escapeHtml(rawCmd)}</span>`;
  terminalOutput.appendChild(cmdLine);

  const responseLine = document.createElement('div');
  responseLine.className = 'terminal-output';

  if (terminalCommands[cmd]) {
    responseLine.innerHTML = terminalCommands[cmd];
  } else if (cmd === '') {
    // empty
  } else {
    responseLine.innerHTML = `<span style="color: #EF4444;">bench: command not found: "${escapeHtml(rawCmd)}". Type <span class="terminal-accent">help</span> for list of commands.</span>`;
  }

  terminalOutput.appendChild(responseLine);
  terminalOutput.scrollTop = terminalOutput.scrollHeight;
}

function escapeHtml(text) {
  return text.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

if (terminalInput) {
  terminalInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') {
      const val = terminalInput.value;
      executeCommand(val);
      terminalInput.value = '';
    }
  });
}

quickCmdBtns.forEach(btn => {
  btn.addEventListener('click', () => {
    const cmd = btn.getAttribute('data-cmd');
    if (cmd) {
      if (terminalInput) terminalInput.value = cmd;
      executeCommand(cmd);
      if (terminalInput) terminalInput.value = '';
    }
  });
});

// Interactive DocType State Machine / Workflow Visualizer
const workflowSteps = [
  {
    id: 'draft',
    stepNumber: '01',
    name: 'Draft / Customer Intake',
    role: 'Service Advisor',
    desc: 'Customer vehicle registration & issue declaration recorded in custom Bike Service Request DocType.',
    code: `doc.status = "Draft"\ndoc.validate_vehicle_chassis_no()\ndoc.create_inspection_entry()`
  },
  {
    id: 'inspection',
    stepNumber: '02',
    name: 'Vehicle Inspection & Checklist',
    role: 'Vehicle Inspector',
    desc: 'Digital multi-point inspection recorded in Child Table with photo attachments and damage estimation.',
    code: `for item in doc.inspection_items:\n    if item.is_critical and not item.approved_by_client:\n        frappe.throw("Client consent required for critical repair")`
  },
  {
    id: 'allocated',
    stepNumber: '03',
    name: 'Job Card & Parts Allocation',
    role: 'Store Manager / Technician',
    desc: 'Automated stock reservation from Inventory warehouse & technician assignment via role-based hook.',
    code: `doc.status = "In Progress"\ndoc.technician = assign_technician(doc.service_type)\nreserve_stock_in_warehouse(doc.required_parts)`
  },
  {
    id: 'repair',
    stepNumber: '04',
    name: 'Active Repair & Labor Log',
    role: 'Certified Technician',
    desc: 'Technician updates live job card, tracks labor hours, and requests additional OEM parts as needed.',
    code: `doc.actual_labor_hours += calculated_shift_hours\nupdate_live_repair_progress(doc.name)`
  },
  {
    id: 'qc',
    stepNumber: '05',
    name: 'Quality Assurance & Road Test',
    role: 'Supervisor / QA Lead',
    desc: 'Final test ride validation, checklist approval, and green light trigger for automated billing.',
    code: `if not doc.qa_passed:\n    doc.status = "Rework Required"\nelse:\n    trigger_billing_invoice_creation(doc)`
  },
  {
    id: 'invoiced',
    stepNumber: '06',
    name: 'Sales Invoice & Gate Pass',
    role: 'Cashier / Customer',
    desc: 'Automated Sales Invoice generation in Accounts module, tax calculation & QR code gate pass issuance.',
    code: `invoice = create_erpnext_sales_invoice(doc)\ngenerate_secure_gatepass_qr(doc.vehicle_no)\ndoc.status = "Completed"`
  }
];

let currentStepIndex = 0;

function renderWorkflowStep(index) {
  currentStepIndex = index;
  const step = workflowSteps[index];

  const stepElements = document.querySelectorAll('.workflow-step');
  stepElements.forEach((el, idx) => {
    if (idx === index) {
      el.classList.add('active');
    } else {
      el.classList.remove('active');
    }
  });

  const detailBox = document.getElementById('workflow-active-detail');
  if (detailBox) {
    detailBox.innerHTML = `
      <div style="display: flex; justify-content: space-between; align-items: center; margin-bottom: 8px;">
        <span style="font-weight: 700; color: var(--frappe-cyan); font-size: 0.95rem;">Step ${step.stepNumber}: ${step.name}</span>
        <span style="font-size: 0.75rem; background: rgba(56, 189, 248, 0.15); color: #38BDF8; padding: 2px 8px; border-radius: 4px; font-family: var(--font-mono);">Role: ${step.role}</span>
      </div>
      <p style="font-size: 0.85rem; color: #cbd5e1; margin-bottom: 12px;">${step.desc}</p>
      <div style="background: #090d16; padding: 10px; border-radius: 6px; font-family: var(--font-mono); font-size: 0.78rem; color: #34D399; border: 1px solid rgba(255,255,255,0.05); overflow-x: auto;">
        <pre style="margin: 0;">${escapeHtml(step.code)}</pre>
      </div>
    `;
  }
}

// Attach workflow click handlers
document.addEventListener('DOMContentLoaded', () => {
  const stepElements = document.querySelectorAll('.workflow-step');
  stepElements.forEach((el, idx) => {
    el.addEventListener('click', () => {
      renderWorkflowStep(idx);
    });
  });
  renderWorkflowStep(0);
});

// Toast message helper
function showToast(message) {
  let toast = document.getElementById('toast-notification');
  if (!toast) {
    toast = document.createElement('div');
    toast.id = 'toast-notification';
    toast.className = 'toast-msg';
    document.body.appendChild(toast);
  }
  toast.innerHTML = message;
  toast.classList.add('show');
  setTimeout(() => {
    toast.classList.remove('show');
  }, 3500);
}

// Copy to Clipboard helpers
function copyText(text, label) {
  navigator.clipboard.writeText(text).then(() => {
    showToast(`✔ Copied ${label} to clipboard!`);
  }).catch(() => {
    showToast(`Copied: ${text}`);
  });
}

// Live Formspree Integration with AJAX fetch
const contactForm = document.getElementById('portfolio-contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const submitBtn = document.getElementById('form-submit-btn') || contactForm.querySelector('button[type="submit"]');
    const originalBtnText = submitBtn.innerHTML;

    // Set loading state
    submitBtn.disabled = true;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending Inquiry...';

    const formData = new FormData(contactForm);

    try {
      const response = await fetch("https://formspree.io/f/xzezyvor", {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        showToast("🎉 Thank you! Your inquiry has been sent, Soon will get back to you.");
        contactForm.reset();
      } else {
        const data = await response.json();
        if (data.errors) {
          const errText = data.errors.map(err => err.message).join(", ");
          showToast(`❌ Error: ${errText}`);
        } else {
          showToast("❌ There was a problem submitting your message. Please try again.");
        }
      }
    } catch (error) {
      showToast("❌ Network error. Email basheerahamedjr@gmail.com directly.");
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnText;
    }
  });
}
