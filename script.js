// Portfolio JS extracted from index.html

document.addEventListener('DOMContentLoaded', function () {
  // Initialize Timeline Animations
  const initTimelineAnimations = () => {
    const timelineItems = document.querySelectorAll('.timeline-item');
    
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          
          // Animate stats if they exist
          const stats = entry.target.querySelectorAll('.count');
          stats.forEach(stat => {
            const target = parseInt(stat.getAttribute('data-target'), 10);
            if (!stat.getAttribute('data-animated')) {
              animateValue(stat, 0, target, 1500);
              stat.setAttribute('data-animated', 'true');
            }
          });
        }
      });
    }, {
      threshold: 0.2,
      rootMargin: '-50px'
    });

    timelineItems.forEach(item => observer.observe(item));
  };

  // Animate number counting
  const animateValue = (element, start, end, duration) => {
    let startTimestamp = null;
    const step = (timestamp) => {
      if (!startTimestamp) startTimestamp = timestamp;
      const progress = Math.min((timestamp - startTimestamp) / duration, 1);
      const value = Math.floor(progress * (end - start) + start);
      element.textContent = value;
      if (progress < 1) {
        window.requestAnimationFrame(step);
      }
    };
    window.requestAnimationFrame(step);
  };

  // Initialize animations
  initTimelineAnimations();

  // Mobile Menu Toggle
  document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Initialize Skills Animation
  document.querySelectorAll('.skill-category').forEach(category => {
    category.querySelectorAll('.skill-item').forEach((item, index) => {
      item.style.setProperty('--item-index', index);
    });
  });

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      // Add active class to clicked button
      button.classList.add('active');
      // Filtering logic can be added here
    });
  });

  // Smooth scrolling for navigation links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
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

  // End of DOMContentLoaded
});
