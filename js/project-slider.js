document.addEventListener('DOMContentLoaded', function() {
    const projectSlides = document.querySelectorAll('.project-slide');
    const dots = document.querySelectorAll('.project-dots .dot');
    const prevButton = document.querySelector('.prev-project');
    const nextButton = document.querySelector('.next-project');
    let currentSlide = 0;
    const totalSlides = projectSlides.length;

    // Function to update slide
    function updateSlide(index) {
        // Remove active class from all slides and dots
        projectSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));

        // Add active class to current slide and dot
        projectSlides[index].classList.add('active');
        dots[index].classList.add('active');
    }

    // Function to go to next slide
    function nextSlide() {
        currentSlide = (currentSlide + 1) % totalSlides;
        updateSlide(currentSlide);
    }

    // Function to go to previous slide
    function prevSlide() {
        currentSlide = (currentSlide - 1 + totalSlides) % totalSlides;
        updateSlide(currentSlide);
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener('click', nextSlide);
    prevButton.addEventListener('click', prevSlide);

    // Event listeners for dots
    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentSlide = index;
            updateSlide(currentSlide);
        });
    });

    // Auto slide every 5 seconds
    setInterval(nextSlide, 5000);
}); 