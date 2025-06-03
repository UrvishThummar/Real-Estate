document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('scheduledViewingsContainer');
    let scheduledViewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userEmail = user.email || '';

    // Filter for current user if logged in
    if (userEmail) {
        scheduledViewings = scheduledViewings.filter(v => v.userEmail === userEmail);
    }

    if (!scheduledViewings.length) {
        container.innerHTML = `
            <div class="no-scheduled-viewings">
                <i class="fas fa-calendar-times"></i>
                <h3>No Scheduled Viewings</h3>
                <p>You have not scheduled any property viewings yet.</p>
                <a href="properties.html" class="btn btn-primary">Browse Properties</a>
            </div>
        `;
        return;
    }

    // Render scheduled viewings
    container.innerHTML = `
        <div class="scheduled-viewings-list">
            ${scheduledViewings.map((v, idx) => `
                <div class="scheduled-viewing-card" data-idx="${idx}">
                    <div class="scheduled-viewing-image">
                        <img src="${v.propertyImage || 'images/property-placeholder.jpg'}" alt="${v.propertyTitle}" />
                    </div>
                    <div class="scheduled-viewing-content">
                        <div class="scheduled-viewing-header">
                            <i class="fas fa-calendar-check"></i>
                            <span class="scheduled-viewing-title">${v.propertyTitle}</span>
                        </div>
                        <div class="scheduled-viewing-details">
                            <span><i class="fas fa-calendar"></i> <strong>Date:</strong> ${v.preferredDate}</span>
                            <span><i class="fas fa-clock"></i> <strong>Time:</strong> ${v.preferredTime}</span>
                            <span><i class="fas fa-user"></i> <strong>Name:</strong> ${v.fullName}</span>
                            <span><i class="fas fa-envelope"></i> <strong>Email:</strong> ${v.email}</span>
                            <span><i class="fas fa-phone"></i> <strong>Phone:</strong> ${v.phone}</span>
                        </div>
                        <div class="scheduled-viewing-timer" id="timer-${idx}"></div>
                        ${v.notes ? `<div class="scheduled-viewing-notes"><i class="fas fa-sticky-note"></i> ${v.notes}</div>` : ''}
                        <button class="remove-viewing-btn" data-idx="${idx}"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;

    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-viewing-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            let allViewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
            // Remove only the correct user's viewing at the correct index
            let filtered = userEmail ? allViewings.filter(v => v.userEmail === userEmail) : allViewings;
            const toRemove = filtered[idx];
            // Remove from allViewings by matching all fields
            allViewings = allViewings.filter(v => {
                return !(v.userEmail === toRemove.userEmail && v.propertyTitle === toRemove.propertyTitle && v.preferredDate === toRemove.preferredDate && v.preferredTime === toRemove.preferredTime && v.fullName === toRemove.fullName && v.email === toRemove.email && v.phone === toRemove.phone && v.notes === toRemove.notes);
            });
            localStorage.setItem('scheduledViewings', JSON.stringify(allViewings));
            renderScheduledViewings();
        });
    });

    // Start timers
    scheduledViewings.forEach((v, idx) => {
        const timerEl = document.getElementById('timer-' + idx);
        function updateTimer() {
            const t = getTimeRemaining(v.preferredDate, v.preferredTime);
            if (!t) {
                timerEl.textContent = 'Viewing time has passed';
                timerEl.classList.add('expired');
                return;
            }
            timerEl.textContent = `Time left: ${t.hours}h ${t.minutes}m ${t.seconds}s`;
        }
        updateTimer();
        setInterval(updateTimer, 1000);
    });
});

function getTimeRemaining(dateStr, timeStr) {
    const now = new Date();
    const dateTime = new Date(dateStr + ' ' + timeStr);
    const diff = dateTime - now;
    if (diff <= 0) return null;
    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff / (1000 * 60)) % 60);
    const seconds = Math.floor((diff / 1000) % 60);
    return { hours, minutes, seconds };
}

function renderScheduledViewings() {
    const container = document.getElementById('scheduledViewingsContainer');
    let scheduledViewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
    const user = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const userEmail = user.email || '';
    if (userEmail) {
        scheduledViewings = scheduledViewings.filter(v => v.userEmail === userEmail);
    }
    if (!scheduledViewings.length) {
        container.innerHTML = `
            <div class="no-scheduled-viewings">
                <i class="fas fa-calendar-times"></i>
                <h3>No Scheduled Viewings</h3>
                <p>You have not scheduled any property viewings yet.</p>
                <a href="properties.html" class="btn btn-primary">Browse Properties</a>
            </div>
        `;
        return;
    }
    container.innerHTML = `
        <div class="scheduled-viewings-list">
            ${scheduledViewings.map((v, idx) => `
                <div class="scheduled-viewing-card" data-idx="${idx}">
                    <div class="scheduled-viewing-image">
                        <img src="${v.propertyImage || 'images/property-placeholder.jpg'}" alt="${v.propertyTitle}" />
                    </div>
                    <div class="scheduled-viewing-content">
                        <div class="scheduled-viewing-header">
                            <i class="fas fa-calendar-check"></i>
                            <span class="scheduled-viewing-title">${v.propertyTitle}</span>
                        </div>
                        <div class="scheduled-viewing-details">
                            <span><i class="fas fa-calendar"></i> <strong>Date:</strong> ${v.preferredDate}</span>
                            <span><i class="fas fa-clock"></i> <strong>Time:</strong> ${v.preferredTime}</span>
                            <span><i class="fas fa-user"></i> <strong>Name:</strong> ${v.fullName}</span>
                            <span><i class="fas fa-envelope"></i> <strong>Email:</strong> ${v.email}</span>
                            <span><i class="fas fa-phone"></i> <strong>Phone:</strong> ${v.phone}</span>
                        </div>
                        <div class="scheduled-viewing-timer" id="timer-${idx}"></div>
                        ${v.notes ? `<div class="scheduled-viewing-notes"><i class="fas fa-sticky-note"></i> ${v.notes}</div>` : ''}
                        <button class="remove-viewing-btn" data-idx="${idx}"><i class="fas fa-trash"></i> Remove</button>
                    </div>
                </div>
            `).join('')}
        </div>
    `;
    // Add event listeners for remove buttons
    document.querySelectorAll('.remove-viewing-btn').forEach(btn => {
        btn.addEventListener('click', function() {
            const idx = parseInt(this.getAttribute('data-idx'));
            let allViewings = JSON.parse(localStorage.getItem('scheduledViewings') || '[]');
            // Remove only the correct user's viewing at the correct index
            let filtered = userEmail ? allViewings.filter(v => v.userEmail === userEmail) : allViewings;
            const toRemove = filtered[idx];
            // Remove from allViewings by matching all fields
            allViewings = allViewings.filter(v => {
                return !(v.userEmail === toRemove.userEmail && v.propertyTitle === toRemove.propertyTitle && v.preferredDate === toRemove.preferredDate && v.preferredTime === toRemove.preferredTime && v.fullName === toRemove.fullName && v.email === toRemove.email && v.phone === toRemove.phone && v.notes === toRemove.notes);
            });
            localStorage.setItem('scheduledViewings', JSON.stringify(allViewings));
            renderScheduledViewings();
        });
    });
    // Start timers
    scheduledViewings.forEach((v, idx) => {
        const timerEl = document.getElementById('timer-' + idx);
        function updateTimer() {
            const t = getTimeRemaining(v.preferredDate, v.preferredTime);
            if (!t) {
                timerEl.textContent = 'Viewing time has passed';
                timerEl.classList.add('expired');
                return;
            }
            timerEl.textContent = `Time left: ${t.hours}h ${t.minutes}m ${t.seconds}s`;
        }
        updateTimer();
        setInterval(updateTimer, 1000);
    });
} 