const SITE_VERSION = 'design-refinement-20260712';

const addCacheBust = (filePath) => {
    const separator = filePath.includes('?') ? '&' : '?';
    return `${filePath}${separator}v=${SITE_VERSION}`;
};

const loadSectionIncludes = async () => {
    const includeElements = Array.from(document.querySelectorAll('[data-include]'));

    await Promise.all(includeElements.map(async (element) => {
        const filePath = element.getAttribute('data-include');
        const response = await fetch(addCacheBust(filePath), { cache: 'no-cache' });

        if (!response.ok) {
            throw new Error(`Could not load ${filePath}`);
        }

        element.outerHTML = await response.text();
    }));
};

const initIntroLoader = () => {
    const introLoader = document.getElementById('intro-loader');
    const prefersReducedMotion = window.matchMedia &&
        window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!introLoader) {
        return;
    }

    const startIntroExit = () => {
        const doorDelay = prefersReducedMotion ? 250 : 2200;
        const hideDelay = prefersReducedMotion ? 350 : 3100;
        const removeDelay = prefersReducedMotion ? 0 : 800;

        window.setTimeout(() => {
            introLoader.classList.add('doors-open');
        }, doorDelay);

        window.setTimeout(() => {
            introLoader.classList.add('intro-hide');
            document.body.classList.remove('intro-active');

            window.setTimeout(() => {
                introLoader.setAttribute('aria-hidden', 'true');
                introLoader.style.display = 'none';
            }, removeDelay);
        }, hideDelay);
    };

    if (document.readyState === 'complete') {
        startIntroExit();
    } else {
        window.addEventListener('load', startIntroExit, { once: true });
    }
};

const initNavigation = () => {
    const header = document.querySelector('.site-header');
    const navToggle = document.querySelector('.nav-toggle');
    const navLinks = document.querySelectorAll('.site-nav a');
    const navTargets = Array.from(navLinks)
        .map((link) => {
            const href = link.getAttribute('href');
            return href && href.startsWith('#') ? document.querySelector(href) : null;
        })
        .filter(Boolean);

    const setActiveLink = (sectionId) => {
        navLinks.forEach((link) => {
            const isActive = link.getAttribute('href') === `#${sectionId}`;
            link.classList.toggle('active', isActive);

            if (isActive) {
                link.setAttribute('aria-current', 'page');
            } else {
                link.removeAttribute('aria-current');
            }
        });
    };

    if (header && navToggle) {
        navToggle.addEventListener('click', () => {
            const isOpen = header.classList.toggle('nav-open');
            navToggle.setAttribute('aria-expanded', String(isOpen));
        });

        navLinks.forEach((link) => {
            link.addEventListener('click', () => {
                const href = link.getAttribute('href');

                if (href && href.startsWith('#')) {
                    setActiveLink(href.replace('#', ''));
                }

                header.classList.remove('nav-open');
                navToggle.setAttribute('aria-expanded', 'false');
            });
        });
    }

    if ('IntersectionObserver' in window && navTargets.length) {
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    setActiveLink(entry.target.id);
                }
            });
        }, {
            rootMargin: '-42% 0px -48% 0px'
        });

        navTargets.forEach((section) => observer.observe(section));
        setActiveLink(navTargets[0].id);
    } else if (navTargets.length) {
        setActiveLink(navTargets[0].id);
    }
};

const initRevealAnimations = () => {
    const revealElements = document.querySelectorAll('.reveal, .reveal-up, .reveal-left, .reveal-right');

    if ('IntersectionObserver' in window && revealElements.length) {
        const revealObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('reveal-visible');
                    observer.unobserve(entry.target);
                }
            });
        }, {
            threshold: 0.15,
            rootMargin: '0px 0px -80px 0px'
        });

        revealElements.forEach((element) => revealObserver.observe(element));
    } else {
        revealElements.forEach((element) => element.classList.add('reveal-visible'));
    }
};

const initCertificationFlipCards = () => {
    if (document.body.dataset.certificationFlipReady === 'true') {
        return;
    }

    document.body.dataset.certificationFlipReady = 'true';

    const toggleCard = (card) => {
        const isFlipped = card.classList.toggle('is-flipped');
        card.setAttribute('aria-pressed', String(isFlipped));
    };

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.certification-flip-card');

        if (!card || event.target.closest('a')) {
            return;
        }

        toggleCard(card);
    });

    document.addEventListener('keydown', (event) => {
        if (event.key !== 'Enter' && event.key !== ' ') {
            return;
        }

        const card = event.target.closest('.certification-flip-card');

        if (!card) {
            return;
        }

        event.preventDefault();
        toggleCard(card);
    });
};

const initAchievementModal = () => {
    if (document.body.dataset.achievementModalReady === 'true') {
        return;
    }

    document.body.dataset.achievementModalReady = 'true';
    let activeCard = null;

    const getModal = () => document.getElementById('achievement-modal');

    const closeModal = () => {
        const modal = getModal();

        if (!modal || !modal.classList.contains('is-open')) {
            return;
        }

        modal.classList.remove('is-open');
        modal.setAttribute('aria-hidden', 'true');
        document.body.classList.remove('achievement-modal-open');

        if (activeCard) {
            activeCard.focus();
            activeCard = null;
        }
    };

    const openModal = (card) => {
        const modal = getModal();

        if (!modal) {
            return;
        }

        activeCard = card;

        const modalCard = modal.querySelector('.achievement-modal-card');
        const icon = modal.querySelector('.achievement-modal-icon');
        const label = modal.querySelector('.achievement-modal-label');
        const title = modal.querySelector('#achievement-modal-title');
        const eventLabel = modal.querySelector('.achievement-modal-event');
        const organization = modal.querySelector('.achievement-modal-organization');
        const issued = modal.querySelector('.achievement-modal-issued');
        const skills = modal.querySelector('.achievement-modal-skills');
        const description = modal.querySelector('.achievement-modal-description');
        const closeButton = modal.querySelector('.achievement-modal-close');

        const iconElement = document.createElement('i');
        iconElement.className = card.dataset.iconClass || 'fa-solid fa-award';
        icon.replaceChildren(iconElement);

        if (modalCard) {
            modalCard.dataset.theme = card.dataset.theme || 'cyan';
        }

        label.textContent = card.dataset.badge || '';
        title.textContent = card.dataset.title || '';
        eventLabel.textContent = card.dataset.label || '';
        organization.textContent = card.dataset.organization ? `Organization: ${card.dataset.organization}` : '';
        issued.textContent = card.dataset.issued ? `Issued: ${card.dataset.issued}` : '';
        description.textContent = card.dataset.description || '';

        const skillItems = (card.dataset.skills || '')
            .split('|')
            .filter(Boolean)
            .map((skill) => {
                const item = document.createElement('span');
                item.textContent = skill;
                return item;
            });

        skills.replaceChildren(...skillItems);
        modal.classList.add('is-open');
        modal.setAttribute('aria-hidden', 'false');
        document.body.classList.add('achievement-modal-open');

        if (closeButton) {
            closeButton.focus();
        }
    };

    document.addEventListener('click', (event) => {
        const card = event.target.closest('.achievement-card');

        if (card) {
            openModal(card);
            return;
        }

        if (event.target.closest('.achievement-modal-close') || event.target.classList.contains('achievement-modal')) {
            closeModal();
        }
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') {
            closeModal();
        }
    });
};

const initContactBehavior = () => {
    if (document.body.dataset.contactBehaviorReady === 'true') {
        return;
    }

    document.body.dataset.contactBehaviorReady = 'true';
    let toastTimer = null;

    const isMobileContactDevice = () => {
        const userAgent = navigator.userAgent || '';
        const mobileUserAgent = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(userAgent);
        const ipadDesktopMode = /Macintosh/i.test(userAgent) && navigator.maxTouchPoints > 1;
        const coarseSmallScreen = window.matchMedia &&
            window.matchMedia('(pointer: coarse)').matches &&
            window.matchMedia('(max-width: 900px)').matches;

        return mobileUserAgent || ipadDesktopMode || coarseSmallScreen;
    };

    const getContactToast = () => {
        let toast = document.querySelector('.contact-toast');

        if (!toast) {
            toast = document.createElement('div');
            toast.className = 'contact-toast';
            toast.setAttribute('role', 'status');
            toast.setAttribute('aria-live', 'polite');
            document.body.appendChild(toast);
        }

        return toast;
    };

    const showPhoneToast = (phoneNumber, copied) => {
        const toast = getContactToast();
        toast.textContent = copied ? `Phone: ${phoneNumber} copied` : `Phone: ${phoneNumber}`;
        toast.classList.add('is-visible');

        window.clearTimeout(toastTimer);
        toastTimer = window.setTimeout(() => {
            toast.classList.remove('is-visible');
        }, 3600);
    };

    const copyPhoneNumber = async (phoneNumber) => {
        if (!navigator.clipboard || !window.isSecureContext) {
            return false;
        }

        try {
            await navigator.clipboard.writeText(phoneNumber);
            return true;
        } catch (error) {
            return false;
        }
    };

    const buildGmailUrl = (emailAddress) => {
        const subject = 'Portfolio Inquiry';
        const body = 'Hi Nafisa,\n\n';
        return `https://mail.google.com/mail/?view=cm&fs=1&to=${encodeURIComponent(emailAddress)}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    };

    if (!isMobileContactDevice()) {
        document.querySelectorAll('#contact a[href^="mailto:"]').forEach((emailLink) => {
            const emailAddress = emailLink.dataset.contactEmail || 'nafisasraboni2207@gmail.com';
            emailLink.dataset.mailtoHref = emailLink.href;
            emailLink.href = buildGmailUrl(emailAddress);
            emailLink.target = '_blank';
            emailLink.rel = 'noopener noreferrer';
        });
    }

    document.addEventListener('click', async (event) => {
        const phoneLink = event.target.closest('#contact a[href^="tel:"]');

        if (!phoneLink || isMobileContactDevice()) {
            return;
        }

        event.preventDefault();

        const phoneNumber = phoneLink.dataset.contactPhone || phoneLink.getAttribute('href').replace('tel:', '');
        const copied = await copyPhoneNumber(phoneNumber);
        showPhoneToast(phoneNumber, copied);
    });

    document.addEventListener('click', (event) => {
        const emailLink = event.target.closest('#contact a[data-contact-email]');

        if (!emailLink || isMobileContactDevice()) {
            return;
        }

        if (!emailLink.href.includes('mail.google.com')) {
            const emailAddress = emailLink.dataset.contactEmail || 'nafisasraboni2207@gmail.com';
            emailLink.href = buildGmailUrl(emailAddress);
            emailLink.target = '_blank';
            emailLink.rel = 'noopener noreferrer';
        }
    });
};

const initPortfolio = () => {
    initIntroLoader();
    initNavigation();
    initRevealAnimations();
    initCertificationFlipCards();
    initAchievementModal();
    initContactBehavior();
};

const bootPortfolio = async () => {
    try {
        await loadSectionIncludes();
    } catch (error) {
        console.error('Section loading failed:', error);
    }

    initPortfolio();
};

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', bootPortfolio, { once: true });
} else {
    bootPortfolio();
}
