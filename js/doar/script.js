document.addEventListener('DOMContentLoaded', function() {
  // Smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        target.scrollIntoView({
          behavior: 'smooth'
        });
      }
    });
  });

  // Donation form handling
  const form = document.getElementById('formDoacao');
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      // Here you would typically handle the form submission
      alert('Obrigado pela sua doação! Em breve entraremos em contato.');
      form.reset();
    });
  }

  // Add animation on scroll
  const observerOptions = {
    threshold: 0.1
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.style.opacity = '1';
        entry.target.style.transform = 'translateY(0)';
      }
    });
  }, observerOptions);

  const elements = document.querySelectorAll('.impact-card, .valor-card, .estrutura-card');
  elements.forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'all 0.5s ease-out';
    observer.observe(el);
  });

  // Footer animation
const footerElements = document.querySelectorAll('.footer-section h3, .footer-links, .contact-info, .social-links');
footerElements.forEach(element => {
  element.style.opacity = "0";
  element.style.transform = "translateY(20px)";
  element.style.transition = "all 0.5s ease-out";
  observer.observe(element);
});
});