// Load posts from JSON
async function loadPosts(start = 0, limit = 2) {
  try {
    const response = await fetch('js/blog/posts.json');
    const data = await response.json();
    return data.posts.slice(start, start + limit);
  } catch (error) {
    console.error('Error loading posts:', error);
    return [];
  }
}

// Create post HTML element
function createPostElement(post) {
  const postElement = document.createElement('div');
  postElement.className = 'col-6 mb-4';
  postElement.innerHTML = `
  <div class="card blog-card h-100">
            <div class="blog-card-image">
                <img  alt="" src="${post.img}" width="100%" height="100%">
            </div>
            <div class="card-body">
              <div class="card-meta mb-2">
                <span class="badge bg-secondary">${post.category}</span>
              </div>
                  <h3 class="card-title">${post.title}</h3>
                  <p class="card-text">${post.content}</p>              <div class="post-meta">
                  <small class="text-muted">Por ${post.author} • ${post.readTime} min de leitura</small>
              </div>
               <a href="${post.link}" class="btn btn-outline-primary mt-3">Continuar lendo</a>
            </div>
          </div>
        </div>
`;

  return postElement;
}

// Initialize posts
let currentPostIndex = 0;
const postsPerPage = 2;

async function initializePosts() {
  const blogSection = document.querySelector('.blog-section .row');
  blogSection.innerHTML = ''; // Clear existing posts
  
  const initialPosts = await loadPosts(0, postsPerPage);
  initialPosts.forEach(post => {
    const postElement = createPostElement(post);
    blogSection.appendChild(postElement);
  });
  
  currentPostIndex = postsPerPage;
}

// Load More Posts Functionality
document.getElementById('loadMoreBtn').addEventListener('click', async function() {
  const blogSection = document.querySelector('.blog-section .row');
  const button = this;
  
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Carregando...';
  button.disabled = true;
  
  try {
    const newPosts = await loadPosts(currentPostIndex, postsPerPage);
    
    if (newPosts.length === 0) {
      button.style.display = 'none';
      return;
    }
    
    setTimeout(() => {
      newPosts.forEach(post => {
        const postElement = createPostElement(post);
        blogSection.appendChild(postElement);
      });

      button.innerHTML = '<span>Carregar mais posts</span><i class="bi bi-arrow-down-circle ms-2"></i>';
      button.disabled = false;

      currentPostIndex += postsPerPage;

      const newCards = blogSection.querySelectorAll('.blog-card');
      newCards.forEach(card => {
        card.style.opacity = '0';
        setTimeout(() => {
          card.style.transition = 'opacity 0.5s ease-in';
          card.style.opacity = '1';
        }, 100);
      });
    }, 1000);
  } catch (error) {
    console.error('Error loading more posts:', error);
    button.innerHTML = 'Erro ao carregar posts';
    button.disabled = true;
  }
});

(function() {
  emailjs.init('rucuzCTYPYB8QjCDJ'); // Substitua pela sua chave pública do EmailJS
})();

// Newsletter Form Submission
document.getElementById('newsletterForm').addEventListener('submit', function(e) {
  e.preventDefault();
  const email = this.querySelector('input[type="email"]').value;
  const button = this.querySelector('button');
  const originalText = button.innerHTML;
  
  button.disabled = true;
  button.innerHTML = '<span class="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span> Enviando...';
  const templateParams = {
    from_name: email,
    to_name: "Vozes do bairro",
    message: "quero receber nottificacoes dos vossos posts",
    user_email: email,
    };
  emailjs.send("service_7povaex","template_kt0ac83",templateParams)
  .then(function(response) {
      
    }, function(error) {

        console.error('Erro:', error);
    });
  setTimeout(() => {
    alert('Obrigado por se inscrever! Em breve você receberá nossas novidades.');
    this.reset();
    button.disabled = false;
    button.innerHTML = originalText;
  }, 1500);
});

// Initialize posts when page loads
document.addEventListener('DOMContentLoaded', initializePosts);

// Smooth scroll functionality
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    document.querySelector(this.getAttribute('href')).scrollIntoView({
      behavior: 'smooth'
    });
  });
});