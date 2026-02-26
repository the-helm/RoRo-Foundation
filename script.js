// Mobile Menu Toggle
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mainNav = document.getElementById('mainNav');
const navLinks = document.querySelectorAll('nav a');

mobileMenuBtn.addEventListener('click', () => {
    mainNav.querySelector('ul').classList.toggle('active');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-bars');
    mobileMenuBtn.querySelector('i').classList.toggle('fa-times');
});

// Close mobile menu when clicking on a link
navLinks.forEach(link => {
    link.addEventListener('click', () => {
        mainNav.querySelector('ul').classList.remove('active');
        mobileMenuBtn.querySelector('i').classList.remove('fa-times');
        mobileMenuBtn.querySelector('i').classList.add('fa-bars');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if(targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if(targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// WhatsApp Registration Button Enhancement
const whatsappBtn = document.querySelector('.whatsapp-btn');
if(whatsappBtn) {
    // Add click tracking (in a real implementation, you would send this to analytics)
    whatsappBtn.addEventListener('click', function() {
        console.log('User clicked on WhatsApp registration button');
        // In a real implementation, you might send this event to Google Analytics or similar
        // gtag('event', 'click', { 'event_category': 'Registration', 'event_label': 'WhatsApp CTA' });
    });
}

// Gallery Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Gallery Filtering
    const filterButtons = document.querySelectorAll('.gallery-filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Update active button
            filterButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            const filterValue = this.getAttribute('data-filter');
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (filterValue === 'all' || item.getAttribute('data-category') === filterValue) {
                    item.style.display = 'block';
                    setTimeout(() => {
                        item.style.opacity = '1';
                        item.style.transform = 'scale(1)';
                    }, 10);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.8)';
                    setTimeout(() => {
                        item.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
    
    // Lightbox Functionality
    const lightboxModal = document.getElementById('lightboxModal');
    const lightboxClose = document.getElementById('lightboxClose');
    const lightboxPrev = document.getElementById('lightboxPrev');
    const lightboxNext = document.getElementById('lightboxNext');
    const lightboxImage = document.getElementById('lightboxImage');
    const lightboxTitle = document.getElementById('lightboxTitle');
    const lightboxDescription = document.getElementById('lightboxDescription');
    const currentIndexElement = document.getElementById('currentIndex');
    const totalImagesElement = document.getElementById('totalImages');
    
    const galleryData = [
        {
            image: 'images/david-geneugelijk-CXa6E3krENE-unsplash.jpg',
            title: 'Literacy Program Launch',
            description: 'Kisumu, Kenya - 2023 | Launching our literacy program that has helped over 500 children learn to read and write.'
        },
        {
            image: 'https://images.unsplash.com/photo-1531482615713-2afd69097998?ixlib=rb-4.0.3&auto=format&fit=crop&w=1200&q=80',
            title: 'Digital Skills Workshop',
            description: 'Nairobi, Kenya - 2024 | Training youth in coding and digital marketing to prepare them for the digital economy.'
        },
        {
            image: 'images/tim-mossholder-xDwEa2kaeJA-unsplash.jpg',
            title: 'Sustainable Farming Project',
            description: 'Kigali, Rwanda - 2022 | Teaching sustainable farming techniques to rural communities for food security.'
        },
        {
            image: 'images/andile-mnothoza-K5yNGK2Jw4w-unsplash.jpg',
            title: 'Youth Leadership Summit',
            description: 'Jinja, Uganda - 2023 | Annual summit bringing together young leaders from across Africa.'
        },
        {
            image: 'images/emmanuel-ikwuegbu-JwdHpCUmpg8-unsplash.jpg',
            title: 'Community Library Opening',
            description: 'Lagos, Nigeria - 2022 | Opening a community library that serves over 1,000 students monthly.'
        },
        {
            image: 'images/michael-ali-2_rFy9TFRRc-unsplash.jpg',
            title: 'Women Entrepreneurship Program',
            description: 'Nairobi, Kenya - 2023 | Empowering women with business skills to start their own enterprises.'
        },
        {
            image: 'images/lisa-marie-theck-IivIqWCYgcs-unsplash.jpg',
            title: 'Clean Water Initiative',
            description: 'Dar es Salaam, Tanzania - 2022 | Providing clean drinking water to communities in need.'
        },
        {
            image: 'images/WhatsApp Image 2026-01-27 at 0707.18.jpeg',
            title: 'Graduation Ceremony',
            description: 'Kampala, Uganda - 2023 | Celebrating the graduation of 200 youth from our skills training program.'
        }
    ];
    
    let currentImageIndex = 0;
    totalImagesElement.textContent = galleryData.length;
    
    // Open lightbox
    const viewButtons = document.querySelectorAll('.gallery-view-btn');
    viewButtons.forEach((button, index) => {
        button.addEventListener('click', function() {
            currentImageIndex = parseInt(this.getAttribute('data-index'));
            updateLightbox();
            lightboxModal.classList.add('active');
            document.body.style.overflow = 'hidden'; // Prevent scrolling
        });
    });
    
    // Close lightbox
    lightboxClose.addEventListener('click', function() {
        lightboxModal.classList.remove('active');
        document.body.style.overflow = 'auto'; // Re-enable scrolling
    });
    
    // Close lightbox when clicking outside the image
    lightboxModal.addEventListener('click', function(e) {
        if (e.target === lightboxModal) {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        }
    });
    
    // Navigate lightbox
    lightboxPrev.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
        updateLightbox();
    });
    
    lightboxNext.addEventListener('click', function() {
        currentImageIndex = (currentImageIndex + 1) % galleryData.length;
        updateLightbox();
    });
    
    // Keyboard navigation for lightbox
    document.addEventListener('keydown', function(e) {
        if (!lightboxModal.classList.contains('active')) return;
        
        if (e.key === 'Escape') {
            lightboxModal.classList.remove('active');
            document.body.style.overflow = 'auto';
        } else if (e.key === 'ArrowLeft') {
            currentImageIndex = (currentImageIndex - 1 + galleryData.length) % galleryData.length;
            updateLightbox();
        } else if (e.key === 'ArrowRight') {
            currentImageIndex = (currentImageIndex + 1) % galleryData.length;
            updateLightbox();
        }
    });
    
    function updateLightbox() {
        const data = galleryData[currentImageIndex];
        lightboxImage.src = data.image;
        lightboxImage.alt = data.title;
        lightboxTitle.textContent = data.title;
        lightboxDescription.textContent = data.description;
        currentIndexElement.textContent = currentImageIndex + 1;
    }
    
    // Form validation for potential future form implementations
    function validateForm(form) {
        let isValid = true;
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        
        inputs.forEach(input => {
            if(!input.value.trim()) {
                isValid = false;
                input.classList.add('error');
            } else {
                input.classList.remove('error');
            }
        });
        
        return isValid;
    }
    
    // Sticky header effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
        if (window.scrollY > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            header.style.boxShadow = '0 2px 15px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Current year for footer copyright
    const currentYear = new Date().getFullYear();
    const yearElement = document.querySelector('.footer-bottom p');
    if(yearElement) {
        yearElement.innerHTML = yearElement.innerHTML.replace('2023', currentYear);
    }
    
    console.log('RoRo Foundation website loaded successfully!');
});