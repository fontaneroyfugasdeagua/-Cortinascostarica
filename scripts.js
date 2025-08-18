document.addEventListener('DOMContentLoaded', () => {

  // --- Partículas en el header ---
  const particlesContainer = document.getElementById('particles');
  for(let i=0;i<60;i++){
      let p = document.createElement('div');
      p.classList.add('particle');
      p.style.left = Math.random()*100 + 'vw';
      p.style.animationDuration = (3+Math.random()*5) + 's';
      p.style.animationDelay = (Math.random()*3) + 's';
      p.style.width = p.style.height = (2+Math.random()*4) + 'px';
      particlesContainer.appendChild(p);
  }

  // --- Cortina 3D interactiva ---
  const cortina = document.getElementById('cortina');
  const sound = document.getElementById('sound');
  const sala = document.getElementById('sala-bg');
  
  // Condicional para verificar si los elementos existen
  if (cortina && sound && sala) {
    if(window.innerWidth > 768) { // Solo en dispositivos no móviles
      document.addEventListener('mousemove', e => {
          const x = (e.clientX / window.innerWidth - 0.5) * 20;
          const y = (e.clientY / window.innerHeight - 0.5) * 15;
          sala.style.transform = `rotateY(${x}deg) rotateX(${-y}deg) scale(1.05)`;
      });
    }

    // Animación de la cortina al hacer scroll
    window.addEventListener('scroll', () => {
      const salaSection = document.getElementById('sala');
      const triggerPosition = salaSection.getBoundingClientRect().top + window.scrollY;
      
      if (window.scrollY > triggerPosition - window.innerHeight * 0.5 && !cortina.classList.contains('open')) {
          cortina.classList.add('open');
          sound.play().catch(e => console.log('El usuario no ha interactuado con la página, no se puede reproducir el sonido.'));
      }
    });
  }

  // --- Lazy loading para imágenes ---
  const images = document.querySelectorAll('img[loading="lazy"]');
  const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
          if (entry.isIntersecting) {
              entry.target.src = entry.target.dataset.src || entry.target.src;
              entry.target.classList.add('fade-in');
              observer.unobserve(entry.target);
          }
      });
  }, { threshold: 0.2 });

  images.forEach(img => {
      observer.observe(img);
  });

  // --- Menú de hamburguesa ---
  const menuToggle = document.getElementById('menu-toggle');
  const navLinks = document.getElementById('nav-links');

  if (menuToggle && navLinks) {
    menuToggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      menuToggle.classList.toggle('open');
    });
  }
});
