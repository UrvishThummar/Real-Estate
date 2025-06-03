// Blog posts data
const blogPosts = [
    {
        id: 1,
        title: "How to Choose the Perfect Neighborhood for Your Home",
        excerpt: "Discover key factors to consider when selecting the ideal neighborhood for your next home purchase.",
        category: "tips",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        date: "2024-05-01",
        readTime: "5 min read",
        slug: "how-to-choose-perfect-neighborhood"
    },
    {
        id: 2,
        title: "The Impact of Smart Home Technology on Property Values",
        excerpt: "Explore how smart home features are influencing real estate prices and buyer preferences.",
        category: "market-trends",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        date: "2024-04-20",
        readTime: "6 min read",
        slug: "impact-smart-home-technology"
    },
    {
        id: 3,
        title: "Top 10 Interior Design Trends for Modern Homes",
        excerpt: "Stay ahead of the curve with these popular interior design trends for 2024.",
        category: "design",
        image: "https://images.pexels.com/photos/2587054/pexels-photo-2587054.jpeg",
        date: "2024-04-10",
        readTime: "4 min read",
        slug: "top-10-interior-design-trends"
    },
    {
        id: 4,
        title: "Real Estate Investment Strategies for Beginners",
        excerpt: "A beginner's guide to building wealth through smart real estate investments.",
        category: "investment",
        image: "https://images.pexels.com/photos/2079234/pexels-photo-2079234.jpeg",
        date: "2024-03-28",
        readTime: "7 min read",
        slug: "real-estate-investment-strategies"
    },
    {
        id: 5,
        title: "How to Stage Your Home for a Quick Sale",
        excerpt: "Tips and tricks to make your property stand out and sell faster.",
        category: "tips",
        image: "https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg",
        date: "2024-03-15",
        readTime: "5 min read",
        slug: "how-to-stage-home"
    }
];

// State variables
let currentPage = 1;
const postsPerPage = 3;
let currentCategory = 'all';
let filteredPosts = [...blogPosts];

// Debug function to check if elements exist
function checkElements() {
    console.log('=== DEBUG: Checking DOM Elements ===');
    
    const blogPostsContainer = document.getElementById('blogPosts');
    const loadMoreBtn = document.querySelector('.load-more');
    const searchForm = document.querySelector('.search-form');
    const categoryLinks = document.querySelectorAll('.categories-list a');
    const popularPostsList = document.querySelector('.popular-posts-list');
    
    console.log('blogPostsContainer:', blogPostsContainer);
    console.log('loadMoreBtn:', loadMoreBtn);
    console.log('searchForm:', searchForm);
    console.log('categoryLinks:', categoryLinks);
    console.log('popularPostsList:', popularPostsList);
    
    return {
        blogPostsContainer,
        loadMoreBtn,
        searchForm,
        categoryLinks,
        popularPostsList
    };
}

// Render Posts Function
function renderPosts(append = false) {
    console.log('=== DEBUG: Rendering Posts ===');
    console.log('Current page:', currentPage);
    console.log('Posts per page:', postsPerPage);
    console.log('Filtered posts count:', filteredPosts.length);
    
    const blogPostsContainer = document.getElementById('blogPosts');
    
    if (!blogPostsContainer) {
        console.error('ERROR: blogPosts container not found! Make sure you have an element with id="blogPosts"');
        return;
    }
    
    const startIndex = 0;
    const endIndex = currentPage * postsPerPage;
    const postsToShow = filteredPosts.slice(startIndex, endIndex);
    
    console.log('Posts to show:', postsToShow.length);
    console.log('Start index:', startIndex, 'End index:', endIndex);
    
    const postsHTML = postsToShow.map((post, index) => `
        <article class="blog-post animate-fade-up delay-${(index + 1) * 100} hover-lift" onclick="openBlogDetail('${post.slug}')">
            <div class="post-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/400x200?text=Image+Not+Found'">
                <div class="post-category">${post.category.replace('-', ' ')}</div>
            </div>
            <div class="post-content">
                <h3>${post.title}</h3>
                <p>${post.excerpt}</p>
                <div class="post-meta">
                    <span><i class="far fa-calendar"></i> ${post.date}</span>
                    <span><i class="far fa-clock"></i> ${post.readTime}</span>
                </div>
            </div>
        </article>
    `).join('');
    
    if (append) {
        blogPostsContainer.insertAdjacentHTML('beforeend', postsHTML);
    } else {
        blogPostsContainer.innerHTML = postsHTML;
    }
    
    console.log('Posts HTML generated and inserted');
    
    // Update load more button visibility
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.style.display = endIndex >= filteredPosts.length ? 'none' : 'block';
        console.log('Load more button visibility:', loadMoreBtn.style.display);
    }
}

// Setup Event Listeners
function setupEventListeners() {
    console.log('=== DEBUG: Setting up Event Listeners ===');
    
    // Load More Button
    const loadMoreBtn = document.querySelector('.load-more');
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            console.log('Load more clicked');
            currentPage++;
            renderPosts(true);
        });
        console.log('✓ Load more button listener added');
    } else {
        console.warn('⚠ Load more button not found');
    }

    // Search Form
    const searchForm = document.querySelector('.search-form');
    if (searchForm) {
        searchForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const searchInput = searchForm.querySelector('input');
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            console.log('Search term:', searchTerm);
            filterPosts(searchTerm);
        });
        console.log('✓ Search form listener added');
    } else {
        console.warn('⚠ Search form not found');
    }

    // Category Links
    const categoryLinks = document.querySelectorAll('.categories-list a');
    if (categoryLinks.length > 0) {
        categoryLinks.forEach(link => {
            link.addEventListener('click', (e) => {
                e.preventDefault();
                const category = e.target.dataset.category || e.target.getAttribute('data-category');
                console.log('Category clicked:', category);
                filterByCategory(category);
                
                // Update active state
                categoryLinks.forEach(l => l.classList.remove('active'));
                e.target.classList.add('active');
            });
        });
        console.log('✓ Category links listeners added');
    } else {
        console.warn('⚠ Category links not found');
    }
}

// Filter Posts
function filterPosts(searchTerm) {
    console.log('=== DEBUG: Filtering Posts ===');
    console.log('Search term:', searchTerm);
    
    filteredPosts = blogPosts.filter(post => 
        post.title.toLowerCase().includes(searchTerm) ||
        post.excerpt.toLowerCase().includes(searchTerm) ||
        post.category.toLowerCase().includes(searchTerm)
    );
    
    console.log('Filtered posts count:', filteredPosts.length);
    currentPage = 1;
    renderPosts();
}

// Filter by Category
function filterByCategory(category) {
    console.log('=== DEBUG: Filtering by Category ===');
    console.log('Category:', category);
    
    currentCategory = category;
    filteredPosts = category === 'all' || !category
        ? [...blogPosts]
        : blogPosts.filter(post => post.category.toLowerCase() === category.toLowerCase());
    
    console.log('Filtered posts count:', filteredPosts.length);
    currentPage = 1;
    renderPosts();
}

// Load Popular Posts
function loadPopularPosts() {
    console.log('=== DEBUG: Loading Popular Posts ===');
    
    const popularPostsList = document.querySelector('.popular-posts-list');
    if (!popularPostsList) {
        console.warn('⚠ Popular posts list not found');
        return;
    }
    
    const popularPosts = blogPosts
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);

    const popularPostsHTML = popularPosts.map((post, index) => `
        <div class="popular-post animate-fade-up delay-${(index + 1) * 100} hover-lift" onclick="openBlogDetail('${post.slug}')">
            <div class="popular-post-image">
                <img src="${post.image}" alt="${post.title}" onerror="this.src='https://via.placeholder.com/80x60?text=Image'">
            </div>
            <div class="popular-post-content">
                <h4>${post.title}</h4>
                <span>${post.date}</span>
            </div>
        </div>
    `).join('');

    popularPostsList.innerHTML = popularPostsHTML;
    console.log('✓ Popular posts loaded');
}

// Function to open blog detail page
function openBlogDetail(slug) {
    // Add fade out animation to the current page
    document.body.classList.add('fade-out');
    
    // Wait for the fade out animation to complete before redirecting
    setTimeout(() => {
        window.location.href = `blog-detail.html?slug=${slug}`;
    }, 300); // 300ms matches the animation duration
}

// Mobile Menu (if exists)
function setupMobileMenu() {
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const navLinks = document.querySelector('.nav-links');

    if (mobileMenuBtn && navLinks) {
        mobileMenuBtn.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            mobileMenuBtn.classList.toggle('active');
        });

        // Close mobile menu when clicking outside
        document.addEventListener('click', (e) => {
            if (navLinks.classList.contains('active')) {
                if (!e.target.closest('.nav-links') && !e.target.closest('.mobile-menu-btn')) {
                    navLinks.classList.remove('active');
                    mobileMenuBtn.classList.remove('active');
                }
            }
        });
        console.log('✓ Mobile menu setup completed');
    }
}

// Initialize everything when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    console.log('=== DEBUG: DOM Content Loaded ===');
    console.log('Blog posts data:', blogPosts);
    
    // Check if all required elements exist
    checkElements();
    
    // Initialize the blog
    renderPosts();
    setupEventListeners();
    loadPopularPosts();
    setupMobileMenu();
    
    console.log('=== DEBUG: Initialization Complete ===');
});

// Alternative initialization if DOMContentLoaded already fired
if (document.readyState === 'loading') {
    console.log('Document still loading, waiting for DOMContentLoaded...');
} else {
    console.log('Document already loaded, initializing immediately...');
    setTimeout(() => {
        checkElements();
        renderPosts();
        setupEventListeners();
        loadPopularPosts();
        setupMobileMenu();
    }, 100);
}