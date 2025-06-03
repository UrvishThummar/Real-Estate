// Get favorites from localStorage
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Update favorite count in navbar
function updateFavoriteCount() {
    const favoriteCount = document.querySelector('.favorite-count');
    const count = favorites.length;
    
    favoriteCount.textContent = count;
    
    if (count > 0) {
        favoriteCount.classList.add('show');
    } else {
        favoriteCount.classList.remove('show');
    }
}

// Initialize favorite count
updateFavoriteCount();

// Display favorite properties
function displayFavorites() {
    const favoritesGrid = document.getElementById('favoritesGrid');
    
    if (favorites.length === 0) {
        favoritesGrid.innerHTML = `
            <div class="no-favorites">
                <i class="fas fa-heart"></i>
                <h3>No Favorite Properties Yet</h3>
                <p>Start exploring our properties and add your favorites to see them here.</p>
                <a href="properties.html" class="btn">Browse Properties</a>
            </div>
        `;
        return;
    }
    
    // Filter properties to show only favorites
    const favoriteProperties = properties.filter(property => 
        favorites.includes(property.id)
    );
    
    // Create property cards
    favoritesGrid.innerHTML = favoriteProperties.map(property => `
        <div class="property-card">
            <div class="property-image">
                <img src="${property.image}" alt="${property.title}">
                <div class="property-tags">
                    ${property.featured ? '<span class="tag featured">Featured</span>' : ''}
                    <span class="tag ${property.status ? property.status.toLowerCase() : ''}">${property.status || ''}</span>
                </div>
            </div>
            <div class="property-info">
                <h3>${property.title}</h3>
                <div class="price">${typeof property.price === 'number' ? '$' + property.price.toLocaleString() : property.price}</div>
                <div class="location"><i class="fas fa-map-marker-alt"></i> ${property.location}</div>
                <div class="features">
                    <span><i class="fas fa-bed"></i> ${property.bedrooms} Beds</span>
                    <span><i class="fas fa-bath"></i> ${property.bathrooms} Baths</span>
                    <span><i class="fas fa-ruler-combined"></i> ${property.area}${typeof property.area === 'number' ? ' sqft' : ''}</span>
                </div>
                <div class="agent-info">
                    <img src="${property.agent && property.agent.image ? property.agent.image : 'images/agent-avatar.png'}" alt="Agent">
                    <div>
                        <div class="agent-name">${property.agent && property.agent.name ? property.agent.name : 'Realar Agent'}</div>
                        <div class="agent-role">${property.agent && property.agent.role ? property.agent.role : 'Property Expert'}</div>
                    </div>
                </div>
                <div class="property-actions">
                    <button class="btn btn-primary view-details-btn" data-property-id="${property.id}">View Details <i class="fas fa-arrow-right"></i></button>
                    <button class="btn remove-fav-btn" data-property-id="${property.id}"><i class="fas fa-heart-broken"></i> Remove</button>
                </div>
            </div>
        </div>
    `).join('');
    
    // Add click event listeners to view details buttons
    document.querySelectorAll('.view-details-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = btn.dataset.propertyId;
            window.location.href = `property-details.html?id=${propertyId}`;
        });
    });

    // Add click event listeners to remove favorite buttons
    document.querySelectorAll('.remove-fav-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.stopPropagation();
            const propertyId = parseInt(btn.dataset.propertyId);
            const index = favorites.indexOf(propertyId);
            if (index !== -1) {
                favorites.splice(index, 1);
                showNotification('Removed from favorites!', 'info');
                localStorage.setItem('favorites', JSON.stringify(favorites));
                updateFavoriteCount();
                displayFavorites();
            }
        });
    });
}

// Notification function
function showNotification(message, type = 'success') {
    const notification = document.createElement('div');
    notification.className = `notification ${type}`;
    notification.innerHTML = `
        <i class="fas ${type === 'success' ? 'fa-check-circle' : 'fa-info-circle'}"></i>
        <span>${message}</span>
    `;
    
    document.body.appendChild(notification);
    
    // Trigger animation
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    // Remove notification after 3 seconds
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// Initialize the page
document.addEventListener('DOMContentLoaded', () => {
    displayFavorites();
}); 