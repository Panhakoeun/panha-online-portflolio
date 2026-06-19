document.addEventListener('DOMContentLoaded', function () {

    // Mobile Menu Toggle
    const menuBtn = document.getElementById('menu-btn');
    const mobileMenu = document.getElementById('mobile-menu');

    if (menuBtn && mobileMenu) {
        menuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
            // Toggle icon
            const icon = menuBtn.querySelector('i');
            if (mobileMenu.classList.contains('hidden')) {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            } else {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            }
        });
    }

    // Smooth Scrolling for Anchors
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;

            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                // Close mobile menu if open
                if (mobileMenu && !mobileMenu.classList.contains('hidden')) {
                    mobileMenu.classList.add('hidden');
                    const icon = menuBtn.querySelector('i');
                    icon.classList.remove('fa-times');
                    icon.classList.add('fa-bars');
                }

                // Scroll to target
                const headerOffset = 80;
                const elementPosition = targetElement.getBoundingClientRect().top;
                const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // Navbar Scroll Effect
    const navbar = document.getElementById('navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.style.background = 'rgba(15, 23, 42, 0.9)';
                navbar.style.backdropFilter = 'blur(20px)';
                navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.background = 'rgba(15, 23, 42, 0.7)'; // Back to initial glass state
                navbar.style.backdropFilter = 'blur(10px)';
                navbar.style.boxShadow = 'none';
            }
        });
    }

    // Back to Top Button
    const backToTopBtn = document.getElementById('backToTop');
    if (backToTopBtn) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTopBtn.classList.remove('opacity-0', 'invisible');
            } else {
                backToTopBtn.classList.add('opacity-0', 'invisible');
            }
        });

        backToTopBtn.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({
                top: 0,
                behavior: 'smooth'
            });
        });
    }

    // Current Year
    const currentYear = document.getElementById('currentYear');
    if (currentYear) {
        currentYear.textContent = new Date().getFullYear();
    }

    // Contact Form Handling
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        const contactFormStatus = document.getElementById('contactFormStatus');

        const showContactStatus = (message, type) => {
            if (!contactFormStatus) return;

            contactFormStatus.textContent = message;
            contactFormStatus.classList.remove(
                'hidden',
                'border-green-500/30',
                'bg-green-500/10',
                'text-green-200',
                'border-red-500/30',
                'bg-red-500/10',
                'text-red-200',
                'border-yellow-500/30',
                'bg-yellow-500/10',
                'text-yellow-100'
            );

            if (type === 'success') {
                contactFormStatus.classList.add('border-green-500/30', 'bg-green-500/10', 'text-green-200');
            } else if (type === 'warning') {
                contactFormStatus.classList.add('border-yellow-500/30', 'bg-yellow-500/10', 'text-yellow-100');
            } else {
                contactFormStatus.classList.add('border-red-500/30', 'bg-red-500/10', 'text-red-200');
            }
        };

        contactForm.addEventListener('submit', async function (e) {
            e.preventDefault();

            const submitBtn = this.querySelector('button[type="submit"]');
            if (!submitBtn) return;

            const originalBtnText = submitBtn.innerHTML;
            const formData = new FormData(this);

            submitBtn.disabled = true;
            submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin mr-2"></i> Sending...';

            if (contactFormStatus) {
                contactFormStatus.classList.add('hidden');
                contactFormStatus.textContent = '';
            }

            if (window.location.protocol === 'file:') {
                const senderName = formData.get('name') || 'Portfolio Visitor';
                const senderEmail = formData.get('email') || '';
                const senderMessage = formData.get('message') || '';
                const mailtoSubject = encodeURIComponent(`Portfolio Message from ${senderName}`);
                const mailtoBody = encodeURIComponent(
                    `Name: ${senderName}\nEmail: ${senderEmail}\n\nMessage:\n${senderMessage}`
                );

                window.location.href = `mailto:panha.koeun142007@gmail.com?subject=${mailtoSubject}&body=${mailtoBody}`;

                showContactStatus(
                    'Your email app was opened because this page is running as a local file. Publish the site or run it on a web server for direct form sending.',
                    'warning'
                );

                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
                return;
            }

            try {
                const response = await fetch(this.action, {
                    method: 'POST',
                    body: formData,
                    headers: {
                        Accept: 'application/json'
                    }
                });

                if (!response.ok) {
                    throw new Error(`Request failed with status ${response.status}`);
                }

                this.reset();
                showContactStatus('Your message was sent successfully. I will get back to you soon.', 'success');
            } catch (error) {
                showContactStatus(
                    'Sending failed right now. Please try again from the live website or email panha.koeun142007@gmail.com directly.',
                    'error'
                );
            } finally {
                submitBtn.disabled = false;
                submitBtn.innerHTML = originalBtnText;
            }
        });
    }

    // CV Download Handler
    const downloadCvBtn = document.getElementById('downloadCvBtn');
    if (downloadCvBtn) {
        downloadCvBtn.addEventListener('click', async function (e) {
            const pdfPath = this.dataset.pdfPath;
            const downloadName = this.dataset.downloadName || 'Panha-Koeun-CV.pdf';

            if (!pdfPath) return;

            e.preventDefault();

            const originalMarkup = this.innerHTML;
            const originalClasses = this.className;

            this.classList.add('pointer-events-none', 'opacity-80');
            this.innerHTML = 'Downloading... <i class="fas fa-spinner fa-spin ml-2 text-sm"></i>';

            try {
                const response = await fetch(pdfPath, {
                    cache: 'no-store'
                });

                if (!response.ok) {
                    throw new Error(`Download failed with status ${response.status}`);
                }

                const pdfBlob = await response.blob();
                const blobUrl = window.URL.createObjectURL(pdfBlob);
                const tempLink = document.createElement('a');

                tempLink.href = blobUrl;
                tempLink.download = downloadName;
                tempLink.style.display = 'none';
                document.body.appendChild(tempLink);
                tempLink.click();
                tempLink.remove();
                window.URL.revokeObjectURL(blobUrl);

                this.innerHTML = 'Download Complete <i class="fas fa-check ml-2 text-sm"></i>';
            } catch (error) {
                // Fall back to the native browser download/open behavior.
                window.open(pdfPath, '_blank', 'noopener');
                this.innerHTML = 'Opened PDF <i class="fas fa-external-link-alt ml-2 text-sm"></i>';
            } finally {
                setTimeout(() => {
                    this.className = originalClasses;
                    this.innerHTML = originalMarkup;
                }, 2200);
            }
        });
    }

    // Skill Bar Animation (Intersection Observer)
    // We look for .skill-container and animate .skill-progress inside it
    const animateSkills = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const progressBar = entry.target.querySelector('.skill-progress');
                if (progressBar) {
                    // Start width at 0 via CSS, then set it to the data-width
                    const targetWidth = progressBar.getAttribute('data-width');
                    progressBar.style.width = targetWidth;
                }
                observer.unobserve(entry.target);
            }
        });
    };

    const skillObserver = new IntersectionObserver(animateSkills, {
        threshold: 0.5
    });

    document.querySelectorAll('.skill-container').forEach(skill => {
        skillObserver.observe(skill);
    });

    // Typewriter Effect
    const typewriterElement = document.getElementById('typewriter');
    const phrases = ['FRONTEND DEVELOPER', 'BACKEND DEVELOPER', 'UX/UI DESIGNER'];
    let phraseIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typeSpeed = 100;

    function type() {
        if (!typewriterElement) return;

        const currentPhrase = phrases[phraseIndex];

        if (isDeleting) {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex - 1);
            charIndex--;
            typeSpeed = 50; // Faster when deleting
        } else {
            typewriterElement.textContent = currentPhrase.substring(0, charIndex + 1);
            charIndex++;
            typeSpeed = 150; // Normal typing speed
        }

        if (!isDeleting && charIndex === currentPhrase.length) {
            isDeleting = true;
            typeSpeed = 2000; // Pause at end
        } else if (isDeleting && charIndex === 0) {
            isDeleting = false;
            phraseIndex = (phraseIndex + 1) % phrases.length;
            typeSpeed = 500; // Pause before new word
        }

        setTimeout(type, typeSpeed);
    }

    type();

});
