// ─────────────────────────────────────────────────────────────
//  Saara content yahan hai. Text, links aur images yahin badlein.
//  Images /public/images mein hain, path e.g. "/images/projects/oasis.jpg".
//  image: null rakhne par navy/green gradient placeholder dikhega.
// ─────────────────────────────────────────────────────────────

export const site = {
  brand: "USMAN",
  fullName: "Muhammad Usman",
  role: "AI Automation & CMS Developer",
  tagline:
    "Muhammad Usman, AI Automation & CMS Developer from Karachi. GoHighLevel and n8n workflows, AI agents, and fast WordPress, Shopify and Webflow websites.",
  city: "Karachi, Pakistan",
  timeZone: "Asia/Karachi",
  email: "osmanmala356@gmail.com",
  phone: "+92 335 2309 390",
  phoneHref: "tel:+923352309390",
  whatsapp: "https://wa.me/+923352309390",
  address: "Block-16, Federal B Area, Karachi, Pakistan",
  cv: "/cv.pdf",
};

export const hero = {
  heading: "Muhammad Usman, AI Automation & CMS Developer. I build CRM workflows, AI agents and fast websites.",
  intro: "I help businesses stop losing leads, with automation that replies, reminds and follows up for them.",
  chips: ["n8n", "GoHighLevel", "AI Agents", "Workflow Automation", "Webhooks & APIs", "Prompt Engineering", "WordPress", "Shopify", "Webflow", "React.js", "Next.js"],
  slides: [
    { image: null, tone: "a" },
    { image: null, tone: "b" },
    { image: null, tone: "c" },
  ],
};

export const about = {
  label: "About Me",
  // [normal, highlighted (green), normal]
  text: ["I help businesses ", "stop losing leads", ". Every enquiry gets a reply, every appointment gets a reminder, and nothing slips through the cracks."],
  stats: [
    { value: "18", label: "Workflows in a live GoHighLevel system" },
    { value: "20+", label: "Websites built for agencies and businesses" },
  ],
  body: "Web developer turned AI automation builder. I treat every project like a product: it should work properly, look clean, and keep working after I hand it over.",
  image: "/images/usman-cutout.png",
};

// Companies I've worked with (logo marquee)
export const partners = ["STEPTECH", "ZAPLE", "AHM", "TECH-ZONE 360", "IGNYTES", "SMIT"];

export const services = [
  {
    title: "AI Agents & n8n Workflows",
    desc: "AI-powered workflows and agents that read, decide and act, from CV analysis to turning designs into WordPress pages.",
    items: ["n8n workflows", "AI agents (Claude Code)", "Prompt engineering", "LangGraph (learning)"],
    image: null,
    video: "/videos/n8n-short.mp4",
    poster: "/videos/n8n-short.jpg",
  },
  {
    title: "CRM & Sales Automation",
    desc: "GoHighLevel systems that capture leads, reply instantly, book appointments and follow up until the job is won.",
    items: ["Lead capture & pipelines", "SMS & email follow-ups", "Missed-call text-back", "A2P 10DLC & email domain"],
    image: null,
    video: "/videos/ghl-short.mp4",
    poster: "/videos/ghl-short.jpg",
  },
  {
    title: "CMS Websites",
    desc: "Fast, conversion-focused websites with custom themes, plugins, forms and integrations.",
    items: ["WordPress (all builders)", "Shopify", "Webflow & Wix", "Squarespace"],
    image: "/images/projects/oasis.jpg",
  },
  {
    title: "APIs & Front-End",
    desc: "Webhooks, REST API integrations and modern interfaces with React.js and Next.js.",
    items: ["Webhooks & REST APIs", "React.js & Next.js", "TypeScript", "Tailwind & GSAP"],
    image: "/images/projects/aceestar.jpg",
  },
];

export const process = [
  { title: "Map The Process", text: "I learn how leads, bookings and follow-ups move today and find exactly where they leak.", h: 440 },
  { title: "Build The Workflow", text: "Triggers, pipelines, messages and AI steps are built in GoHighLevel, n8n or code, whichever fits the job.", h: 440 },
  { title: "Test With Dummy Data", text: "Every trigger, message and branch is tested with fake contacts before anything goes live.", h: 440 },
  { title: "Hand Over & Support", text: "The client gets a handoff guide and documentation, and I stay available after launch.", h: 440 },
];

// AI agents & automation case studies (zig-zag cards, shown first)
export const projects = [
  {
    title: "GoHighLevel Lead-to-Customer System",
    tags: ["GOHIGHLEVEL", "CRM", "AUTOMATION"],
    desc: "Live system for a US construction client with 18 workflows: instant lead replies, booking reminders, estimate follow-ups, review requests and 30/60/90-day reactivation.",
    year: "2026",
    image: null,
    video: "/videos/ghl-short.mp4",
    poster: "/videos/ghl-short.jpg",
  },
  {
    title: "AI Project Manager Agent",
    tags: ["CLAUDE CODE", "TRELLO", "AI AGENT"],
    desc: "Projects come in through a form. The agent reviews each one and assigns it to the best-fit team member in Trello.",
    year: "2026",
    image: null,
    video: "/videos/trello-short.mp4",
    poster: "/videos/trello-short.jpg",
  },
  {
    title: "n8n AI Workflows",
    tags: ["N8N", "AI", "APIS"],
    desc: "An AI CV analyzer and a weather forecasting automation, built as n8n workflows.",
    year: "2026",
    image: null,
    video: "/videos/n8n-short.mp4",
    poster: "/videos/n8n-short.jpg",
  },
  {
    title: "Figma & Reference to WordPress Agents",
    tags: ["AI AGENTS", "FIGMA", "WORDPRESS"],
    desc: "AI agents that turn Figma designs and reference websites into WordPress pages.",
    year: "2026",
    image: null,
    video: "/videos/figma-short.mp4",
    poster: "/videos/figma-short.jpg",
  },
];

// Live web projects (grid). ai: true = built with AI tools.
export const websites = [
  { title: "Aceestar Services", url: "https://aceestarservices.com/", stack: ["WordPress", "React.js"], desc: "Event management system: WordPress website plus React.js admin and user apps on their own subdomains.", image: "/images/projects/aceestar.jpg", video: "/videos/aceestar.mp4", poster: "/videos/aceestar.jpg" },
  { title: "Pacific Northwest Construction", url: "https://pacificnorthwestconstinc.com/", stack: ["WordPress", "GoHighLevel"], desc: "WordPress website plus the complete lead automation behind it.", image: "/images/projects/pnc.jpg", video: "/videos/pnc.mp4", poster: "/videos/pnc.jpg" },
  { title: "Streamline Pet Solutions", url: "https://streamlinepetsolutions.com/", stack: ["WordPress", "Divi"], desc: "Complete marketplace built with Divi Builder and a custom plugin.", image: "/images/projects/streamline.jpg", video: "/videos/streamline.mp4", poster: "/videos/streamline.jpg" },
  { title: "Oasis Home Care MN", url: "https://oasishomecaremn.com/", stack: ["WordPress", "SMTP"], desc: "WordPress website with SMTP email setup.", image: "/images/projects/oasis.jpg" },
  { title: "Macaw Post Production", url: "https://macawpostproduction.com/", stack: ["WordPress"], desc: "WordPress website for a film post-production studio.", image: "/images/projects/macaw.jpg" },
  { title: "StepTech", url: "https://staging.steptech.us/", stack: ["WordPress", "GSAP"], desc: "WordPress website with GSAP animations (staging).", image: "/images/projects/steptech.jpg", video: "/videos/steptech.mp4", poster: "/videos/steptech.jpg" },
  { title: "Koma", url: "https://koma.steptech.us/", stack: ["WooCommerce", "WoodMart"], ai: true, desc: "Store rebuilt on WoodMart with a custom box-pricing plugin, built with a Claude Code agent.", image: "/images/projects/koma.jpg", video: "/videos/koma-short.mp4", poster: "/videos/koma-short.jpg" },
  { title: "Arya", url: "https://arya.steptech.us/", stack: ["WordPress"], ai: true, desc: "WordPress website built with AI.", image: "/images/projects/arya.jpg", video: "/videos/arya-short.mp4", poster: "/videos/arya-short.jpg" },
  { title: "Dannari", url: "https://dannari-amgn0rci.myshopify.com/", stack: ["Shopify"], ai: true, desc: "Lab-grown diamond jewelry store on Shopify, built with AI. (Store is password protected.)", image: "/images/projects/dannari.jpg", video: "/videos/dannari-short.mp4", poster: "/videos/dannari-short.jpg" },
  { title: "Gravy Work", url: "https://www.gravywork.com/", stack: ["Webflow"], desc: "On-demand hospitality staffing platform.", image: "/images/projects/gravy-work.jpg" },
  { title: "Janice Greenwald", url: "https://www.janicegreenwald.com/", stack: ["Wix"], desc: "Clean, accessible consulting website that is easy for the client to maintain.", image: "/images/projects/janicegreenwald.jpg" },
  { title: "HiiClub Social", url: "https://hiiclub.social-fitness.co/hiiclub-3-classes-opt-in", stack: ["Shopify"], desc: "High-converting Shopify landing page for a 3-class intro offer.", image: "/images/projects/hiiclubsocial.jpg" },
  { title: "Cali Diamonds", url: "https://calidiamonds.com/", stack: ["WordPress", "Elementor"], desc: "Responsive e-commerce site for luxury jewelry.", image: "/images/projects/calidiamonds.jpg" },
  { title: "Noble Painting AZ", url: "https://noblepaintingaz.com/", stack: ["WordPress", "Elementor"], desc: "Website for an Arizona residential and commercial painting company.", image: "/images/projects/noble.jpg" },
  { title: "James H Bloom", url: "https://jameshbloom.com/", stack: ["WordPress", "Elementor"], desc: "Professional website with easy content management.", image: "/images/projects/jameshbloom.jpg" },
  { title: "Spreading Childcare", url: "https://www.spreadingchildcare.org/", stack: ["WordPress", "Elementor"], desc: "User-friendly website for a childcare and preschool provider.", image: "/images/projects/spreading.jpg" },
  { title: "ECCO Certified", url: "https://www.eccocert.org/", stack: ["Webflow"], desc: "CMS-driven certification platform for brand onboarding.", image: "/images/projects/eccocert.jpg" },
  { title: "The Travel Clinic", url: "https://thetravelclinicmidlands.co.uk/", stack: ["WordPress", "WPBakery"], desc: "Travel vaccination services website.", image: "/images/projects/travelvaccine.jpg" },
  { title: "Voulez Vous", url: "https://voulezvous.uk/", stack: ["WordPress", "Elementor"], desc: "E-commerce website for a fashion brand.", image: "/images/projects/voulezvous.jpg" },
  { title: "Digital Code Studio", url: "https://digitalcodestudio.com/", stack: ["HTML", "Tailwind", "PHP"], desc: "Web development and design studio website.", image: "/images/projects/digitalcodestudio.jpg" },
  { title: "365 Real State", url: "https://365realstate.netlify.app/", stack: ["HTML", "Bootstrap"], desc: "Real estate homepage with property listings.", image: "/images/projects/realstate.jpg" },
  { title: "Budget Security", url: "https://budget-security.netlify.app/", stack: ["JavaScript", "Tailwind"], desc: "Website for an affordable cybersecurity service.", image: "/images/projects/budgetsecurity.jpg" },
  { title: "Webunion", url: "https://job-site-pi.vercel.app/", stack: ["HTML", "Bootstrap"], desc: "Job portal with a simple search and apply flow.", image: "/images/projects/jobsite.jpg" },
  { title: "BodieCraft", url: "https://bodiecraft.vercel.app/", stack: ["HTML", "JavaScript"], desc: "Single-page website for a gym.", image: "/images/projects/bodyCraft.jpg" },
];

// "Pricing" box is used for skills
export const pricing = [
  {
    name: "Automation & AI",
    desc: "CRM systems, workflows and AI agents that do the follow-up work.",
    fixed: "AUTOMATE",
    incl: "Tools I use:",
    features: ["n8n workflow automation", "GoHighLevel (CRM & workflows)", "AI agents & prompt engineering", "Claude Code", "Webhooks, REST APIs & integrations", "LangGraph (learning)"],
    button: "light",
    cta: "Hire Me",
  },
  {
    name: "CMS & Code",
    desc: "Fast, conversion-focused websites and front ends.",
    fixed: "BUILD",
    incl: "Tools I use:",
    features: ["WordPress (all builders)", "Shopify, Webflow, Wix, Squarespace", "React.js & Next.js", "JavaScript (ES6+) & TypeScript", "Tailwind, Bootstrap & GSAP", "Git & GitHub"],
    button: "accent",
    cta: "Let's Talk",
  },
];

// swarm: true = animated "AI agents assembling the portfolio" scene.
// Agar extension se real recording banao to video: "/images/reel.mp4" daal do (video sabse pehle dikhegi).
export const showreel = { left: "AUTOMATE", right: "//2026©", video: null, swarm: true, image: null };

// "Testimonials" slider is used for experience (no fake reviews)
export const testimonials = [
  { quote: "Built a live GoHighLevel CRM with 18 workflows, an AI project manager agent and n8n automations.", name: "StepTech", role: "Full Stack & AI Automation Developer", tag: "Current", rating: "Mar 2026 - Present", logo: null },
  { quote: "Built and maintained WordPress sites for a Dubai agency, with GoHighLevel forms for lead capture.", name: "Allied Health Media", role: "WordPress Front & Backend Developer", tag: "Remote", rating: "Aug 2025 - Jan 2026", logo: null },
  { quote: "Delivered CMS-driven websites end to end, with React.js and Next.js front ends.", name: "Zaple", role: "CMS & Full-Stack Developer", tag: "On-site", rating: "Jan 2025 - Mar 2026", logo: "/images/logos/zaple.png" },
  { quote: "Built reusable UI components with React.js and Next.js, and tuned client WordPress sites.", name: "Tech-Zone 360", role: "WordPress & Frontend Developer", tag: "On-site", rating: "Apr 2024 - Jan 2025", logo: "/images/logos/techzone.png" },
  { quote: "Built responsive interfaces with HTML, CSS, Bootstrap and JavaScript alongside senior developers.", name: "Ignytes Digital", role: "WordPress & Frontend Developer (Intern)", tag: "Internship", rating: "Dec 2023 - Mar 2024", logo: "/images/logos/ignytes.png" },
];

export const nav = ["Home", "About", "Services", "Projects", "Websites", "Experience", "Contact"];
export const socials = [
  { name: "LinkedIn", url: "https://www.linkedin.com/in/musmanirfan/" },
  { name: "GitHub", url: "https://github.com/musmanirfan" },
  { name: "WhatsApp", url: "https://wa.me/+923352309390" },
  { name: "Instagram", url: "https://www.instagram.com/musmanirfan1/" },
  { name: "Facebook", url: "https://www.facebook.com/musmanjs" },
];
