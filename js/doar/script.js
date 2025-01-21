document.addEventListener('DOMContentLoaded', function() {

  (function() {
    emailjs.init('rucuzCTYPYB8QjCDJ'); // Substitua pela sua chave pública do EmailJS
  })();
  // contactar
  document.getElementById('formContactar').addEventListener('submit', function(e) {
  e.preventDefault();
  const nome = this.querySelector('#nome').value;
  const email = this.querySelector('#email').value;
  const tel = this.querySelector('#tel').value;
  const assunto = this.querySelector('#assunto').value;
  const mensagem = this.querySelector('#mensagem').value;
  const button = this.querySelector('button');
  const originalText = button.innerHTML;
  alert(nome)
  button.disabled = true;
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
  const templateParams = {
    from_name: nome,
    to_name: "Vozes do bairro",
    assunto: assunto,
    tel: tel,
    message: mensagem,
    user_email: email,
    };
  emailjs.send("service_7povaex","template_3ur1tsf",templateParams)
  .then(function(response) {
      
    }, function(error) {
  
        console.error('Erro:', error);
    });
  setTimeout(() => {
    alert('Obrigado por nos contactar! Em breve entraremos em contacto.');
    this.reset();
    button.disabled = false;
    button.innerHTML = originalText;
  }, 1500);
  });

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

