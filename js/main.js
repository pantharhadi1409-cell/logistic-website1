document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle
    const themeToggle = document.getElementById('theme-toggle');
    const currentTheme = localStorage.getItem('nexus_theme') || 'dark';
    
    if (currentTheme === 'light') {
        document.documentElement.setAttribute('data-theme', 'light');
        if (themeToggle) themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
    }

    if (themeToggle) {
        themeToggle.addEventListener('click', () => {
            let theme = document.documentElement.getAttribute('data-theme');
            if (theme === 'light') {
                document.documentElement.removeAttribute('data-theme');
                localStorage.setItem('nexus_theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            } else {
                document.documentElement.setAttribute('data-theme', 'light');
                localStorage.setItem('nexus_theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            }
        });
    }

    // 2. Custom Cursor (Hide on mobile via CSS)
    const cursor = document.querySelector('.cursor');
    const cursorDot = document.querySelector('.cursor-dot');
    
    if (cursor && cursorDot) {
        document.addEventListener('mousemove', (e) => {
            cursor.style.left = e.clientX + 'px';
            cursor.style.top = e.clientY + 'px';
            cursorDot.style.left = e.clientX + 'px';
            cursorDot.style.top = e.clientY + 'px';
        });
        document.addEventListener('mousedown', () => cursor.style.transform = 'translate(-50%, -50%) scale(0.7)');
        document.addEventListener('mouseup', () => cursor.style.transform = 'translate(-50%, -50%) scale(1)');

        const initHoverEffects = () => {
            document.querySelectorAll('a, button, .product-card, .page-btn, .btn-icon').forEach(el => {
                el.addEventListener('mouseenter', () => {
                    cursor.style.width = '40px'; cursor.style.height = '40px';
                    cursor.style.backgroundColor = 'rgba(0, 240, 255, 0.1)';
                    cursor.style.borderColor = 'transparent';
                });
                el.addEventListener('mouseleave', () => {
                    cursor.style.width = '20px'; cursor.style.height = '20px';
                    cursor.style.backgroundColor = 'transparent';
                    cursor.style.borderColor = 'var(--accent-1)';
                });
            });
        };
        initHoverEffects();
    }

    // 3. Scroll Progress Bar
    const progressBar = document.createElement('div');
    progressBar.className = 'scroll-progress';
    document.body.appendChild(progressBar);

    // 4. Navbar & Mobile Menu & Scroll
    const nav = document.querySelector('nav');
    const mobileBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileBtn && navLinks) {
        mobileBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if (navLinks.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-times');
            } else {
                icon.classList.remove('fa-times');
                icon.classList.add('fa-bars');
            }
        });
    }

    window.addEventListener('scroll', () => {
        // Nav shrink
        if (nav) {
            if (window.scrollY > 50) nav.classList.add('scrolled');
            else nav.classList.remove('scrolled');
        }
        // Progress bar width
        const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
        const scrolled = (window.scrollY / windowHeight) * 100;
        progressBar.style.width = scrolled + '%';
    });

    const initReveal = () => {
        const revealElements = document.querySelectorAll('.reveal');
        const observer = new IntersectionObserver((entries) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                    observer.unobserve(entry.target);
                }
            });
        }, { threshold: 0.1 });
        revealElements.forEach(el => observer.observe(el));
    };
    initReveal();

    // Cool Magnetic Buttons (Mouse track)
    const initMagneticButtons = () => {
        const buttons = document.querySelectorAll('.btn');
        buttons.forEach(btn => {
            btn.addEventListener('mousemove', function(e) {
                if(window.innerWidth > 768) {
                    const position = btn.getBoundingClientRect();
                    const x = e.clientX - position.left - position.width / 2;
                    const y = e.clientY - position.top - position.height / 2;
                    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
                }
            });
            btn.addEventListener('mouseout', function() {
                btn.style.transform = 'translate(0px, 0px)';
            });
        });
    };
    initMagneticButtons();

    // 5. 3D Tilt Effect
    const initTilt = () => {
        document.querySelectorAll('.tilt').forEach(card => {
            card.addEventListener('mousemove', e => {
                if(window.innerWidth > 768) {
                    const rect = card.getBoundingClientRect();
                    const x = e.clientX - rect.left;
                    const y = e.clientY - rect.top;
                    const xOffset = (x - rect.width/2) / rect.width * 20;
                    const yOffset = (y - rect.height/2) / rect.height * -20;
                    card.style.transform = `perspective(1000px) rotateX(${yOffset}deg) rotateY(${xOffset}deg) scale3d(1.02, 1.02, 1.02)`;
                }
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        });
    };
    initTilt();

    // 6. 54+ Products & Pagination
    const shopGrid = document.getElementById('shop-grid');
    const pagination = document.getElementById('pagination');
    
    if (shopGrid) {
        const categories = ["Hardware", "Digital Assets", "Audio", "Software"];
        const names = ["Keyboard", "Core CPU", "Neon Pack", "Headset", "XR Goggles", "AI Node", "Mouse", "Display", "Synth"];
        const prefixes = ["Nexus", "Quantum", "Aura", "Cyber", "Holo", "Nova"];
        const icons = ["fa-keyboard", "fa-microchip", "fa-cube", "fa-headphones", "fa-vr-cardboard", "fa-brain", "fa-mouse", "fa-desktop", "fa-wave-square"];
        
        let allProducts = [];
        for (let i = 1; i <= 54; i++) {
            const catIdx = i % categories.length;
            const nameIdx = i % names.length;
            const prefIdx = i % prefixes.length;
            const price = (Math.random() * 400 + 50).toFixed(2);
            allProducts.push({
                id: 'prod_' + i,
                category: categories[catIdx],
                name: `${prefixes[prefIdx]} ${names[nameIdx]} V${Math.floor(Math.random()*3)+1}`,
                price: parseFloat(price),
                icon: icons[nameIdx]
            });
        }

        const itemsPerPage = 18;
        let currentPage = 1;
        const totalPages = Math.ceil(allProducts.length / itemsPerPage);

        const renderProducts = (page) => {
            shopGrid.innerHTML = '';
            const start = (page - 1) * itemsPerPage;
            const end = start + itemsPerPage;
            const pageProducts = allProducts.slice(start, end);

            pageProducts.forEach((p, idx) => {
                const delay = (idx % 3) * 0.1;
                const card = document.createElement('div');
                card.className = 'product-card reveal tilt';
                card.style.transitionDelay = delay + 's';
                card.innerHTML = `
                    <a href="product.html" style="text-decoration: none;">
                        <div class="product-image"><i class="fas ${p.icon}"></i></div>
                    </a>
                    <p class="product-category">${p.category}</p>
                    <a href="product.html" class="product-title">${p.name}</a>
                    <div class="product-price">$${p.price.toFixed(2)}</div>
                    <div class="product-footer">
                        <button class="btn add-to-cart" data-id="${p.id}" data-name="${p.name}" data-price="${p.price}">
                            <i class="fas fa-plus"></i> Add
                        </button>
                    </div>
                `;
                shopGrid.appendChild(card);
            });
            initReveal();
            initTilt();
            initMagneticButtons();
            if(window.initCartButtons) window.initCartButtons();
            
            // Render Pagination Buttons
            pagination.innerHTML = '';
            for(let i = 1; i <= totalPages; i++) {
                const btn = document.createElement('button');
                btn.className = `page-btn ${i === page ? 'active' : ''}`;
                btn.textContent = i;
                btn.addEventListener('click', () => {
                    currentPage = i;
                    renderProducts(currentPage);
                    window.scrollTo({top: 200, behavior: 'smooth'});
                });
                pagination.appendChild(btn);
            }
        };

        renderProducts(currentPage);
    }

    // 7. E-Commerce Cart Logic
    let cart = JSON.parse(localStorage.getItem('nexus_cart')) || [];
    
    function updateCartBadge() {
        const badge = document.querySelector('.cart-badge');
        if (badge) {
            badge.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
        }
    }
    updateCartBadge();

    window.initCartButtons = () => {
        document.querySelectorAll('.add-to-cart').forEach(btn => {
            const newBtn = btn.cloneNode(true);
            btn.parentNode.replaceChild(newBtn, btn);
            
            newBtn.addEventListener('click', (e) => {
                e.preventDefault();
                const id = newBtn.getAttribute('data-id');
                const name = newBtn.getAttribute('data-name');
                const price = parseFloat(newBtn.getAttribute('data-price'));
                
                const existing = cart.find(item => item.id === id);
                if(existing) existing.quantity += 1;
                else cart.push({ id, name, price, quantity: 1 });
                
                localStorage.setItem('nexus_cart', JSON.stringify(cart));
                updateCartBadge();
                
                const originalText = newBtn.innerHTML;
                newBtn.innerHTML = '<i class="fas fa-check"></i> Added';
                newBtn.style.backgroundColor = 'var(--accent-1)';
                newBtn.style.color = 'var(--bg-color)';
                setTimeout(() => {
                    newBtn.innerHTML = originalText;
                    newBtn.style.backgroundColor = 'transparent';
                    newBtn.style.color = 'var(--accent-1)';
                }, 1000);
            });
        });
    };
    initCartButtons();
});
