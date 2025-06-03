// Get property ID from URL
const urlParams = new URLSearchParams(window.location.search);
const propertyId = parseInt(urlParams.get('id'));

// DOM Elements
const mainImage = document.getElementById('mainImage');
const thumbnailStrip = document.getElementById('thumbnailStrip');
const propertyTitle = document.getElementById('propertyTitle');
const propertyLocation = document.getElementById('propertyLocation');
const propertyStatus = document.getElementById('propertyStatus');
const propertyPrice = document.getElementById('propertyPrice');
const bedrooms = document.getElementById('bedrooms');
const bathrooms = document.getElementById('bathrooms');
const area = document.getElementById('area');
const propertyType = document.getElementById('propertyType');
const propertyDescription = document.getElementById('propertyDescription');
const amenitiesList = document.getElementById('amenitiesList');
const agentImage = document.getElementById('agentImage');
const agentName = document.getElementById('agentName');
const agentRole = document.getElementById('agentRole');
const propertyIdElement = document.getElementById('propertyId');
const propertyTypeInfo = document.getElementById('propertyTypeInfo');
const propertyStatusInfo = document.getElementById('propertyStatusInfo');
const propertyArea = document.getElementById('propertyArea');
const propertyBedrooms = document.getElementById('propertyBedrooms');
const propertyBathrooms = document.getElementById('propertyBathrooms');
const similarProperties = document.getElementById('similarProperties');

// Find the property from the properties array
const property = properties.find(p => p.id === propertyId);

if (property) {
    // Update page title
    document.title = `${property.title} - Realar Real Estate`;

    // Update main image and thumbnails
    mainImage.src = property.image;
    mainImage.alt = property.title;

    // Create thumbnails
    property.images.forEach((img, index) => {
        const thumbnail = document.createElement('img');
        thumbnail.src = img;
        thumbnail.alt = `Thumbnail ${index + 1}`;
        thumbnail.classList.toggle('active', index === 0);
        thumbnail.addEventListener('click', () => {
            mainImage.src = img;
            document.querySelectorAll('.thumbnail-strip img').forEach(thumb => {
                thumb.classList.toggle('active', thumb.src === img);
            });
        });
        thumbnailStrip.appendChild(thumbnail);
    });

    // Update property details
    propertyTitle.textContent = property.title;
    propertyLocation.innerHTML = `<i class="fas fa-map-marker-alt"></i> ${property.location}`;
    propertyStatus.textContent = property.status;
    propertyPrice.textContent = `$${property.price.toLocaleString()}`;
    bedrooms.textContent = `${property.bedrooms} Bedrooms`;
    bathrooms.textContent = `${property.bathrooms} Bathrooms`;
    area.textContent = `${property.area} sq ft`;
    propertyType.textContent = property.type;
    propertyDescription.textContent = property.description;

    // Update amenities
    property.amenities.forEach(amenity => {
        const li = document.createElement('li');
        li.innerHTML = `<i class="fas fa-check"></i> ${amenity}`;
        amenitiesList.appendChild(li);
    });

    // Update agent information
    agentImage.src = property.agent.image;
    agentImage.alt = property.agent.name;
    agentName.textContent = property.agent.name;
    agentRole.textContent = property.agent.role;

    // Update property information card
    propertyIdElement.textContent = `#${property.id}`;
    propertyTypeInfo.textContent = property.type;
    propertyStatusInfo.textContent = property.status;
    propertyArea.textContent = `${property.area} sq ft`;
    propertyBedrooms.textContent = property.bedrooms;
    propertyBathrooms.textContent = property.bathrooms;

    // Show similar properties
    const similarProps = properties
        .filter(p => {
            // Find properties that match at least one of these criteria:
            // 1. Same property type
            // 2. Same location
            // 3. Similar price range (within 20%)
            // 4. Similar number of bedrooms
            return p.id !== property.id && (
                p.type === property.type ||
                p.location === property.location ||
                (Math.abs(p.price - property.price) / property.price) <= 0.2 ||
                p.bedrooms === property.bedrooms
            );
        })
        .sort((a, b) => {
            // Sort by relevance score
            const getScore = (prop) => {
                let score = 0;
                if (prop.type === property.type) score += 3;
                if (prop.location === property.location) score += 2;
                if (Math.abs(prop.price - property.price) / property.price <= 0.2) score += 2;
                if (prop.bedrooms === property.bedrooms) score += 1;
                return score;
            };
            return getScore(b) - getScore(a);
        })
        .slice(0, 3);

    // Clear existing similar properties
    similarProperties.innerHTML = '';

    if (similarProps.length > 0) {
        similarProps.forEach(prop => {
            const propertyCard = document.createElement('div');
            propertyCard.className = 'property-card';
            propertyCard.innerHTML = `
                <div class="property-image">
                    <img src="${prop.image}" alt="${prop.title}">
                    <div class="property-tags">
                        ${prop.featured ? '<span class="tag featured">Featured</span>' : ''}
                        <span class="tag ${prop.status.toLowerCase()}">${prop.status}</span>
                    </div>
                </div>
                <div class="property-info">
                    <h3>${prop.title}</h3>
                    <p class="price">$${prop.price.toLocaleString()}</p>
                    <p class="location"><i class="fas fa-map-marker-alt"></i> ${prop.location}</p>
                    <div class="features">
                        <span><i class="fas fa-bed"></i> ${prop.bedrooms} Beds</span>
                        <span><i class="fas fa-bath"></i> ${prop.bathrooms} Baths</span>
                        <span><i class="fas fa-ruler-combined"></i> ${prop.area} sq ft</span>
                    </div>
                </div>
            `;
            propertyCard.addEventListener('click', () => {
                window.location.href = `property-details.html?id=${prop.id}`;
            });
            similarProperties.appendChild(propertyCard);
        });
    } else {
        // Show a message if no similar properties are found
        similarProperties.innerHTML = `
            <div class="no-similar-properties">
                <i class="fas fa-search"></i>
                <h3>No Similar Properties Found</h3>
                <p>We couldn't find any similar properties at the moment.</p>
            </div>
        `;
    }

    // Add event listeners for gallery navigation
    let currentImageIndex = 0;
    const images = property.images;

    document.querySelector('.gallery-nav.prev').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
        mainImage.src = images[currentImageIndex];
        updateThumbnails();
    });

    document.querySelector('.gallery-nav.next').addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % images.length;
        mainImage.src = images[currentImageIndex];
        updateThumbnails();
    });

    // Favorites Functionality
    const favoriteBtn = document.querySelector('.favorite-btn');
    const favoriteIcon = favoriteBtn.querySelector('i');
    
    // Initialize favorites from localStorage
    let favorites = JSON.parse(localStorage.getItem('favorites')) || [];
    
    // Check if current property is in favorites
    const isFavorite = favorites.includes(property.id);
    
    // Update button state
    function updateFavoriteButton() {
        if (isFavorite) {
            favoriteIcon.classList.remove('far');
            favoriteIcon.classList.add('fas');
            favoriteBtn.classList.add('active');
        } else {
            favoriteIcon.classList.remove('fas');
            favoriteIcon.classList.add('far');
            favoriteBtn.classList.remove('active');
        }
    }
    
    // Initialize button state
    updateFavoriteButton();
    
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
    
    // Update favorite count when toggling favorites
    favoriteBtn.addEventListener('click', () => {
        const index = favorites.indexOf(property.id);
        
        if (index === -1) {
            // Add to favorites
            favorites.push(property.id);
            showNotification('Added to favorites!', 'success');
        } else {
            // Remove from favorites
            favorites.splice(index, 1);
            showNotification('Removed from favorites!', 'info');
        }
        
        // Update localStorage
        localStorage.setItem('favorites', JSON.stringify(favorites));
        
        // Update button state
        isFavorite = !isFavorite;
        updateFavoriteButton();
        
        // Update favorite count
        updateFavoriteCount();
    });
    
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

    // Add event listeners for agent contact buttons
    document.querySelector('.agent-contact .btn-primary').addEventListener('click', () => {
        // Implement call functionality
        alert('Call functionality will be implemented here');
    });

    document.querySelector('.agent-contact .btn-outline').addEventListener('click', () => {
        // Implement email functionality
        alert('Email functionality will be implemented here');
    });

    // Add event listener for schedule viewing button
    const scheduleViewingBtn = document.querySelector('.property-actions .btn-primary');
    const bookingModal = document.querySelector('.booking-modal');
    const closeModalBtn = document.querySelector('.close-modal');
    const bookingForm = document.querySelector('.booking-form');

    // Open booking modal
    scheduleViewingBtn.addEventListener('click', () => {
        if (localStorage.getItem('isAuthenticated') !== 'true') {
            alert('Please login first!');
            return;
        }
        bookingModal.classList.add('active');
        document.body.style.overflow = 'hidden';
    });

    // Close booking modal
    closeModalBtn.addEventListener('click', () => {
        bookingModal.classList.remove('active');
        document.body.style.overflow = '';
    });

    // Close modal when clicking outside
    bookingModal.addEventListener('click', (e) => {
        if (e.target === bookingModal) {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // Handle form submission
    bookingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        
        // Get form data
        const formData = new FormData(bookingForm);
        const bookingData = {
            propertyId: property.id,
            propertyTitle: property.title,
            fullName: formData.get('name'),
            email: formData.get('email'),
            phone: formData.get('phone'),
            preferredDate: formData.get('date'),
            preferredTime: formData.get('time'),
            notes: formData.get('message'),
            propertyImage: property.image
        };

        // Validate form data
        if (!validateBookingForm(bookingData)) {
            return;
        }

        // Here you would typically send this data to your backend
        console.log('Booking Data:', bookingData);

        // Show success message
        const modalBody = bookingModal.querySelector('.modal-body');
        modalBody.innerHTML = `
            <div class="booking-success">
                <i class="fas fa-check-circle"></i>
                <h3>Viewing Scheduled!</h3>
                <p>Thank you for your interest in ${property.title}. We will contact you shortly to confirm your viewing appointment.</p>
                <button class="btn btn-primary close-modal">Close</button>
            </div>
        `;

        // Save scheduled viewing to localStorage
        let scheduledViewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
        // Optionally, associate with user email if logged in
        const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
        bookingData.userEmail = user.email || '';
        scheduledViewings.push(bookingData);
        localStorage.setItem('scheduledViewings', JSON.stringify(scheduledViewings));

        // Add event listener to the new close button
        modalBody.querySelector('.close-modal').addEventListener('click', () => {
            bookingModal.classList.remove('active');
            document.body.style.overflow = '';
            // Reset form after closing
            setTimeout(() => {
                modalBody.innerHTML = bookingForm.outerHTML;
                bookingForm = document.querySelector('.booking-form');
                bookingForm.addEventListener('submit', handleFormSubmit);
            }, 300);
        });

        // Redirect to scheduled-viewings.html after 2 seconds
        setTimeout(() => {
            window.location.href = 'scheduled-viewings.html';
        }, 2000);
    });

    // Form validation function
    function validateBookingForm(data) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^\+?[\d\s-]{10,}$/;
        
        if (!data.fullName || data.fullName.trim().length < 2) {
            alert('Please enter a valid full name');
            return false;
        }
        
        if (!emailRegex.test(data.email)) {
            alert('Please enter a valid email address');
            return false;
        }
        
        if (!phoneRegex.test(data.phone)) {
            alert('Please enter a valid phone number');
            return false;
        }
        
        if (!data.preferredDate) {
            alert('Please select a preferred date');
            return false;
        }
        
        if (!data.preferredTime) {
            alert('Please select a preferred time');
            return false;
        }

        // Validate date is not in the past
        const selectedDate = new Date(data.preferredDate);
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        if (selectedDate < today) {
            alert('Please select a future date');
            return false;
        }

        return true;
    }

    // Set minimum date for date input to today
    const dateInput = document.getElementById('date');
    const today = new Date().toISOString().split('T')[0];
    dateInput.min = today;

    // Add event listener for share button
    document.querySelector('.property-actions .btn-outline:last-child').addEventListener('click', () => {
        // Implement share functionality
        if (navigator.share) {
            navigator.share({
                title: property.title,
                text: property.description,
                url: window.location.href
            });
        } else {
            alert('Share functionality will be implemented here');
        }
    });
} else {
    // Property not found
    window.location.href = 'properties.html';
}

// Function to update thumbnails
function updateThumbnails() {
    const thumbnails = document.querySelectorAll('.thumbnail-strip img');
    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle('active', index === currentImageIndex);
    });
} 