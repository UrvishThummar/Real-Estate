// Get the blog post slug from URL
const urlParams = new URLSearchParams(window.location.search);
const postSlug = urlParams.get('slug');

// Blog posts data (same as in blog.js)
const blogPosts = [
    {
        id: 1,
        title: "How to Choose the Perfect Neighborhood for Your Home",
        excerpt: "Discover key factors to consider when selecting the ideal neighborhood for your next home purchase.",
        category: "tips",
        image: "https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg",
        date: "2024-05-01",
        readTime: "5 min read",
        slug: "how-to-choose-perfect-neighborhood",
        content: `
            <p>Choosing the right neighborhood is one of the most important decisions when buying a home. Here are key factors to consider:</p>
            
            <h2>1. Location and Accessibility</h2>
            <p>Consider the proximity to your workplace, schools, shopping centers, and public transportation. A convenient location can save you time and money in the long run.</p>
            
            <h2>2. Safety and Security</h2>
            <p>Research crime rates and talk to local residents about their experiences. Visit the neighborhood at different times of day to get a feel for the area.</p>
            
            <h2>3. School Quality</h2>
            <p>Even if you don't have children, good schools can positively impact property values. Check school ratings and visit local schools if possible.</p>
            
            <h2>4. Future Development</h2>
            <p>Research planned developments in the area. New amenities can increase property values, but construction might be disruptive.</p>
            
            <h2>5. Community Feel</h2>
            <p>Visit local parks, attend community events, and talk to neighbors to understand the community's character and whether it aligns with your lifestyle.</p>
        `
    },
    {
        id: 2,
        title: "The Impact of Smart Home Technology on Property Values",
        excerpt: "Explore how smart home features are influencing real estate prices and buyer preferences.",
        category: "market-trends",
        image: "https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg",
        date: "2024-04-20",
        readTime: "6 min read",
        slug: "impact-smart-home-technology",
        content: `
            <p>Smart home technology is revolutionizing the real estate market. Here's how it's affecting property values:</p>
            
            <h2>1. Increased Property Value</h2>
            <p>Homes with smart features can command higher prices, with some studies showing up to 5% increase in value.</p>
            
            <h2>2. Energy Efficiency</h2>
            <p>Smart thermostats and lighting systems can significantly reduce energy costs, making properties more attractive to eco-conscious buyers.</p>
            
            <h2>3. Security Benefits</h2>
            <p>Smart security systems provide peace of mind and can lower insurance premiums, adding to a home's appeal.</p>
            
            <h2>4. Future-Proofing</h2>
            <p>Properties with smart infrastructure are better positioned for future technological advancements.</p>
        `
    },
    // Add content for other blog posts...
];

// Function to load and display blog post
function loadBlogPost() {
    if (!postSlug) {
        window.location.href = 'blog.html';
        return;
    }

    const post = blogPosts.find(p => p.slug === postSlug);
    
    if (!post) {
        window.location.href = 'blog.html';
        return;
    }

    // Update page title
    document.title = `${post.title} - Real Estate Insights`;

    // Update post details
    document.getElementById('postCategory').textContent = post.category.replace('-', ' ');
    document.getElementById('postTitle').textContent = post.title;
    document.getElementById('postDate').innerHTML = `<i class="far fa-calendar"></i> ${post.date}`;
    document.getElementById('postReadTime').innerHTML = `<i class="far fa-clock"></i> ${post.readTime}`;
    document.getElementById('postImage').src = post.image;
    document.getElementById('postImage').alt = post.title;
    document.getElementById('postContent').innerHTML = post.content;
}

// Load the blog post when the page loads
document.addEventListener('DOMContentLoaded', loadBlogPost); 