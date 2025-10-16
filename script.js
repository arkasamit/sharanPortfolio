// Portfolio JS extracted from index.html

document.addEventListener('DOMContentLoaded', function () {
  // Mobile Menu Toggle
  document.querySelector('.mobile-menu').addEventListener('click', function() {
    document.querySelector('.nav-links').classList.toggle('active');
  });

  // Portfolio Filtering
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');
  
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

  // Counters for experience infographics
  const counts = document.querySelectorAll('.count');
  if (counts.length) {
    const runCounter = (el) => {
      const target = +el.getAttribute('data-target');
      const duration = 1200;
      let start = 0;
      const stepTime = Math.max(Math.floor(duration / target), 12);
      const timer = setInterval(() => {
        start += 1;
        el.textContent = start;
        if (start >= target) clearInterval(timer);
      }, stepTime);
    };

    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.querySelectorAll('.count').forEach(c => runCounter(c));
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.4 });

    document.querySelectorAll('.timeline .timeline-content').forEach(node => {
      observer.observe(node);
    });
  }
});
