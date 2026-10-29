const projectDetails = {
    bazardor: {
        title: 'BazarDor', image: 'images/projects/bazardor.svg',
        description: 'BazarDor tracks the daily prices of essential goods across different markets. Visitors can compare regional prices, see minimum, maximum, and average prices, browse by category, and review price variation at a glance.',
        stack: ['Next.js App Router', 'JavaScript', 'Tailwind CSS', 'Better Auth', 'MongoDB', 'Lucide React', 'React Hot Toast'],
        repo: 'https://github.com/nafisasraboni/BazarDor', live: 'https://bazardor1.vercel.app/',
        challenge: 'Bringing market-wise price information together in a useful comparison view is central to the project. The interface also needs to keep category browsing, price sorting, protected account routes, and responsive layouts understandable on smaller screens.',
        next: 'Potential next steps include adding dated price history charts, expanding market coverage, and making it easier to compare selected goods across locations.',
        highlights: ['Market-by-market price breakdowns', 'Category filters and price sorting', 'Email, Google, and GitHub sign-in']
    },
    'fit-log': {
        title: 'Fit Log', image: 'images/projects/fit-log.svg',
        description: 'A workout library and daily planner. Browse exercises from the FitLog API, add workouts to a structured daily plan, save exercises, and review weekly activity. The app keeps a user’s plan and saved items across reloads.',
        stack: ['Next.js App Router', 'React', 'Tailwind CSS', 'React Context API', 'React Hooks', 'LocalStorage', 'FitLog API', 'React Toastify'],
        repo: 'https://github.com/nafisasraboni/Fit_Log', live: 'https://fit-log.sraboni.dev/',
        challenge: 'The app combines remote workout data with user-managed plan and saved lists. Keeping those interactions synchronized, persistent after reload, and clear on mobile—while also covering loading and not-found states—was a key implementation challenge.',
        next: 'Potential improvements include more personalized routine templates, richer progress summaries, and additional filtering options for workout goals and equipment.',
        highlights: ['Workout search and sorting', 'Daily plan and saved workouts', 'Persistent selections and responsive navigation']
    },
    devstack: {
        title: 'DevStack', image: 'images/projects/devstack.svg',
        description: 'An interactive technology catalog where developers can explore frontend, backend, database, and DevOps tools, compare their details, and assemble a custom stack.',
        stack: ['React', 'Vite', 'TypeScript', 'Tailwind CSS', 'DaisyUI', 'React Toastify', 'Local JSON'],
        repo: 'https://github.com/nafisasraboni/DevStack-A-5-', live: 'https://devstack-1.sraboni.dev/',
        challenge: 'The core interaction is moving from browsing a catalog to building a personal stack. Managing selections, preventing duplicates, and keeping the catalog useful across screen sizes are central parts of the experience.',
        next: 'Potential next steps include allowing users to save and share their stacks, adding more technology comparisons, and expanding the catalog with additional categories.',
        highlights: ['Technology catalog with category details', 'Custom stack builder with duplicate protection', 'Responsive interface']
    },
    nature: {
        title: 'Nature’s Platter', image: 'images/projects/nature.svg',
        description: 'A responsive grocery and pet essentials storefront landing page. It combines promotional banners, product highlights, service information, and a newsletter section in a shopping-focused layout.',
        stack: ['HTML5', 'Tailwind CSS v4', 'Font Awesome 6.5.1'],
        repo: 'https://github.com/nafisasraboni/Tailwind-1st-project-clone', live: 'https://nature.sraboni.dev/',
        challenge: 'A main challenge was composing overlapping promotional and newsletter sections while keeping the layout fluid at mobile, tablet, and desktop widths. The project also practices organizing product cards with grid and flex layouts.',
        next: 'Potential improvements include connecting the product cards to product detail pages, adding working cart interactions, and wiring up the newsletter form.',
        highlights: ['Promotional hero and offer banners', 'Product and service sections', 'Responsive Tailwind layouts']
    },
    conference: {
        title: 'DevConf 2026', image: 'images/projects/conference.svg',
        description: 'A responsive developer-conference landing page that presents event details, speakers, ticket tiers, and an interactive DevQuest area with coding and networking activities.',
        stack: ['HTML5', 'CSS3', 'Flexbox', 'CSS Grid', 'Google Fonts', 'Font Awesome', 'GitHub Pages'],
        repo: 'https://github.com/nafisasraboni/Conference-Landing-Page-PH-A1-', live: 'https://nafisasraboni.github.io/Conference-Landing-Page-PH-A1-/',
        challenge: 'The page brings several content-heavy areas—speaker profiles, pricing comparisons, and interactive challenges—into one coherent landing page. Keeping those sections easy to scan while adapting the card layouts to smaller screens is a key frontend challenge.',
        next: 'Potential next steps include making ticket calls to action functional, adding an event schedule, and connecting the interactive challenge area to real attendee progress.',
        highlights: ['Speaker and ticket sections', 'Responsive Flexbox and Grid layouts', 'DevQuest interactive activities']
    },
    'book-shop': {
        title: 'Book Shop Project', image: 'images/projects/book-shop.svg',
        description: 'A book shop application with a browsable catalog, book management features, Google sign-in, and role-based admin access. The frontend is built as a React single-page app.',
        stack: ['React', 'JavaScript ES6+', 'Vite', 'Firebase Authentication', 'Custom CSS'],
        repo: 'https://github.com/nafisasraboni/Book_Shop_Project', live: 'https://book-shop-project.sraboni.dev/',
        challenge: 'The project combines catalog management with authentication and role-based admin access. Configuring Firebase credentials and authorized domains for deployment, while keeping the interface responsive, are important parts of making the app work beyond local development.',
        next: 'Potential improvements include a fuller checkout and order history flow, stronger catalog search, and more detailed admin inventory tools.',
        highlights: ['Book catalog and management UI', 'Google sign-in with Firebase Auth', 'Role-based admin access']
    },
    vibespace: {
        title: 'VibeSpace', image: 'images/projects/vibespace.svg',
        description: 'A movie and TV discovery app with trending titles, categories, trailers, search, and search history. Its API uses TMDB data, while authenticated routes support personal account features.',
        stack: ['React 19', 'Vite', 'Tailwind CSS', 'React Router', 'Zustand', 'Node.js', 'Express', 'MongoDB', 'Mongoose', 'TMDB API', 'JWT'],
        repo: 'https://github.com/nafisasraboni/VibeSpace', live: '',
        challenge: 'The app connects several moving parts: third-party movie data, backend API routes, authentication in HTTP-only cookies, and protected frontend pages. Preparing that flow for production also requires matching frontend API configuration with backend CORS and cookie settings.',
        next: 'Potential next steps include publishing a stable live demo, adding richer recommendation tools, and improving discovery based on viewing preferences.',
        highlights: ['Trending movies and TV with trailers', 'Protected auth and search history routes', 'Separate React frontend and Express API']
    },
    portfolio: {
        title: 'Portfolio Final', image: 'images/projects/portfolio.svg',
        description: 'A responsive, modular portfolio website that brings together projects, research, certificates, skills, and professional experience. Separate HTML section files are loaded into a single-page layout.',
        stack: ['HTML5', 'CSS3', 'Vanilla JavaScript ES6+', 'Cloudflare Pages'],
        repo: 'https://github.com/nafisasraboni/portfolio-final', live: 'https://sraboni.dev/',
        challenge: 'Keeping a growing portfolio maintainable led to splitting content into section files and loading them into one page. Navigation state and interactive components also need to initialize after those sections load.',
        next: 'Potential improvements include clearer project case studies, continued accessibility refinements, and keeping the content and preview images current as new work is added.',
        highlights: ['Modular section includes', 'Responsive single-page navigation', 'Research, certificates, CV, and projects']
    },
    leetcode: {
        title: 'LeetCode Problems JS', image: 'images/projects/leetcode.svg',
        description: 'A JavaScript repository for practicing and recording LeetCode problem solutions. It is a code collection rather than a deployed website, so there is no separate live project URL.',
        stack: ['JavaScript', 'Algorithms', 'Data Structures', 'Problem Solving'],
        repo: 'https://github.com/nafisasraboni/LeetCode_Problems_JS', live: '',
        challenge: 'Each problem calls for understanding its constraints, selecting an appropriate approach, and checking edge cases as well as the main example. Keeping the solutions organized and readable helps make the collection useful for review.',
        next: 'Potential improvements include grouping solutions by topic and difficulty, adding brief complexity notes, and including test cases for edge conditions.',
        highlights: ['JavaScript problem solutions', 'Ongoing algorithm practice', 'A reference for reviewing approaches']
    }
};

const params = new URLSearchParams(window.location.search);
const rawProjectKey = params.get('project') || params.get('id') || params.get('slug') ||
    new URLSearchParams(window.location.hash.slice(1)).get('project') || window.location.hash.slice(1);
const projectKey = (rawProjectKey || '').trim().toLowerCase().replace(/[_\s]+/g, '-');
const projectAliases = {
    "nature's-platter": 'nature',
    "natures-platter": 'nature',
    'devconf-2026': 'conference',
    'book-shop-project': 'book-shop',
    'portfolio-final': 'portfolio',
    'leetcode-problems-js': 'leetcode'
};
const project = projectDetails[projectAliases[projectKey] || projectKey];
if (!project) {
    document.getElementById('detail-title').textContent = 'Project not found';
    document.getElementById('detail-description').textContent = 'Choose a project from the portfolio to see its details.';
} else {
    document.title = `${project.title} | Nafisa Tabassum Sraboni`;
    document.getElementById('detail-title').textContent = project.title;
    const image = document.getElementById('detail-image');
    image.src = project.image;
    image.alt = `${project.title} project preview`;
    document.getElementById('detail-description').textContent = project.description;
    document.getElementById('detail-challenge').textContent = project.challenge;
    document.getElementById('detail-next').textContent = project.next;
    document.getElementById('detail-stack').replaceChildren(...project.stack.map((item) => {
        const tag = document.createElement('span');
        tag.textContent = item;
        return tag;
    }));
    document.getElementById('detail-highlights').replaceChildren(...project.highlights.map((item) => {
        const li = document.createElement('li');
        li.textContent = item;
        return li;
    }));
    const links = document.getElementById('detail-links');
    const repositoryLink = document.createElement('a');
    repositoryLink.href = project.repo;
    repositoryLink.textContent = 'View GitHub repository';
    repositoryLink.target = '_blank';
    repositoryLink.rel = 'noopener noreferrer';
    repositoryLink.className = 'btn';
    links.append(repositoryLink);
    if (project.live) {
        const liveLink = document.createElement('a');
        liveLink.href = project.live;
        liveLink.textContent = 'Open live project';
        liveLink.target = '_blank';
        liveLink.rel = 'noopener noreferrer';
        liveLink.className = 'btn btn-primary';
        links.prepend(liveLink);
    } else {
        const note = document.createElement('span');
        note.className = 'project-no-live';
        note.textContent = 'No public live demo is currently listed.';
        links.prepend(note);
    }
}
