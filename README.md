# Manish - React.js Developer

[**Live portfolio**](https://manish-portfolio-six-hazel.vercel.app/)

My background is in Computer Science and Engineering, and I am based in Jalandhar, Punjab, India. I enjoy building clean, responsive web applications and continue to develop my skills in cybersecurity, ethical hacking, and digital media.

## About me

I studied Computer Science and Engineering at CT Group of Institutions for my B.Tech (2022-2026). My experience includes freelance React.js development and video editing/content creation, along with a six-month ethical hacking internship at Techcadd Company.

In web development, I build component-based interfaces with React.js, JavaScript, HTML, and CSS. I have used React Hooks and Context API for state management, integrated REST APIs, and focused on responsive layouts and reusable components.

My cybersecurity training covered ethical hacking and vulnerability assessment, including networking fundamentals, the OWASP Top 10, reconnaissance, client-side attacks, social engineering awareness, and mobile and Wi-Fi security. I value authorized testing, clear reporting, and practical remediation recommendations.

I also create video and visual content for social media, marketing, and personal branding. My tools include Adobe Premiere Pro, After Effects, and CapCut.

## Experience

- **React.js Developer - Freelance:** Built responsive web applications with reusable React components, Hooks, Context API, and REST API integrations.
- **Video Editor / Content Creator - Freelance:** Edited social, marketing, and personal-brand content, including cutting, color grading, motion graphics, and audio synchronization.
- **Ethical Hacker Intern - Techcadd Company:** Completed a six-month hands-on internship focused on authorized penetration-testing methods, vulnerability reporting, and remediation.

## Education and certificates

- **B.Tech, Computer Science and Engineering** - CT Group of Institutions, 2022-2026
- **Senior Secondary (Class XII), Science** - PSEB, Jalandhar Government School, Bhargo Nagar Boys, 2021 (73%)
- **Ethical Hacking** - Techcadd Trainings
- **Web Development in React.js** - GTB Computer Education

## Skills

- **Web:** HTML, CSS, JavaScript, React.js, JSX, Hooks, Context API, REST APIs, responsive design, component-based architecture, CSS-in-JS
- **Cybersecurity:** Ethical hacking, VAPT concepts, OWASP Top 10, footprinting and reconnaissance, client-side attacks, social engineering and malware awareness, mobile and Wi-Fi security, steganography, password security, penetration-testing reports
- **Networking:** Computer networking basics and network security fundamentals
- **Content and media:** Adobe Premiere Pro, After Effects, CapCut, image editing, photography, motion graphics, audio synchronization

## About this portfolio

This repository contains my responsive personal portfolio. It presents selected work, my education and experience timeline, short blog articles, areas I am learning, and ways to contact me.

The site is built with React and Vite. It includes:

- Responsive layouts for mobile, tablet, and desktop screens
- A compact expandable mobile navigation menu
- Project, timeline, blog, skills, and experience sections
- GSAP entrance and scroll effects, with reduced-motion support
- A custom M favicon and downloadable résumé; DM Sans, DM Mono, and Playfair Display are locally hosted and preloaded
- Analytics that remain off until a visitor accepts, with a changeable privacy preference
- Prerendered blog, privacy, terms, and custom 404 pages
- Production security headers and production source maps disabled

## Run locally

You will need Node.js and npm installed.

```sh
npm install
npm run dev
```

Vite prints a local address to open in your browser. To create and preview a production build:

```sh
npm run build
npm run preview
```

## Configure a Vercel deployment

Deploy the project to Vercel with the repository root as the project root, `npm run build` as the build command, and `dist` as the output directory. The static portfolio works without secrets, but the contact form remains disabled until its services are configured.

Copy `.env.example` to `.env.local` for local development, or add these settings in Vercel Environment Variables. Never commit `.env.local` or place private credentials in a `VITE_` variable.

- `VITE_TURNSTILE_SITE_KEY`: public Cloudflare Turnstile site key for the exact hostname.
- `TURNSTILE_SECRET_KEY`: private Turnstile secret used by the server function.
- `UPSTASH_REDIS_REST_URL`, `UPSTASH_REDIS_REST_TOKEN`: private Upstash REST credentials for rate limiting.
- `RATE_LIMIT_SALT`: private random string of at least 32 characters for hashing rate-limit keys.
- `RESEND_API_KEY`: private Resend API key.
- `CONTACT_TO_EMAIL`: destination mailbox for contact messages.
- `CONTACT_FROM_EMAIL`: sender on a domain verified with Resend.
- `SITE_ORIGIN`: exact site origin without a trailing slash; defaults to the current production Vercel URL.

Enable Vercel Web Analytics in the project dashboard to receive reports. Analytics code is loaded only after a visitor accepts. The contact form loads Cloudflare’s official Turnstile script only when mounted; the server validates each token through Siteverify.

For local serverless form testing, link the project with Vercel CLI and run `vercel dev`; Vite’s dev server does not emulate `/api/contact`. Configure a local Turnstile test site key there. After configuring production secrets, redeploy and submit one test message end to end. Preview deployments need their own exact `SITE_ORIGIN` and matching Turnstile hostname.

Vercel provisions HTTPS for its domains. The checked-in configuration also upgrades HTTP requests to the current production origin and applies HSTS; verify the project’s production domain and HTTPS redirect setting in Vercel before launch.

## Contact and links

- **Email:** [manishbassanpul9411@gmail.com](mailto:manishbassanpul9411@gmail.com)
- **LinkedIn:** [manish-mental-59445b258](https://www.linkedin.com/in/manish-mental-59445b258)
- **GitHub:** [Mental9411](https://github.com/Mental9411)
- **Location:** Jalandhar, Punjab, India

For a detailed work and education history, see [`public/Manish_Resume.pdf`](public/Manish_Resume.pdf).

