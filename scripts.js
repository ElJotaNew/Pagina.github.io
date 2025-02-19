document.addEventListener('DOMContentLoaded', () => {
    /* PRELOADER */
    window.addEventListener('load', () => {
      const preloader = document.getElementById('preloader');
      preloader.style.opacity = '0';
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 500);
    });
  
    /* ANIMACIÓN ESCALONADA y Observer */
    document.querySelectorAll('.animated').forEach((el, index) => {
      el.style.animationDelay = `${0.5 + index * 0.3}s`;
    });
    const observerOptions = { threshold: 0.2 };
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, observerOptions);
    document.querySelectorAll('.animated').forEach(el => observer.observe(el));
  
    /* MODO OSCURO CON LOCAL STORAGE */
    const toggleModeBtn = document.getElementById('toggleMode');
    if (localStorage.getItem('darkMode') === 'true') {
      document.body.classList.add('dark');
      toggleModeBtn.textContent = 'Modo Claro';
    }
    toggleModeBtn.addEventListener('click', () => {
      document.body.classList.toggle('dark');
      const isDark = document.body.classList.contains('dark');
      toggleModeBtn.textContent = isDark ? 'Modo Claro' : 'Modo Oscuro';
      localStorage.setItem('darkMode', isDark);
      const imcIndicator = document.getElementById('imcIndicator');
      if (imcIndicator.textContent === 'Saludable') {
        imcIndicator.style.backgroundColor = isDark ? '#2ecc71' : '#28a745';
      } else if (imcIndicator.textContent === 'Fuera de rango') {
        imcIndicator.style.backgroundColor = isDark ? '#e74c3c' : '#dc3545';
      }
    });
  
    /* INDICADOR DE SCROLL Y BOTÓN "VOLVER ARRIBA" */
    const progressBar = document.getElementById('progressBar');
    const backToTopBtn = document.getElementById('backToTop');
    window.addEventListener('scroll', () => {
      const scrollTop = document.documentElement.scrollTop;
      const docHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrollPercent = (scrollTop / docHeight) * 100;
      progressBar.style.width = scrollPercent + '%';
      backToTopBtn.style.display = scrollTop > 300 ? 'block' : 'none';
    });
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  
    /* MODAL DEL TEST CON TRANSICIÓN (centrado con Flexbox) */
    const testModal = document.getElementById('testModal');
    const openTestModalBtn = document.getElementById('openTestModalBtn');
    const closeTestModal = document.getElementById('closeTestModal');
  
    if (openTestModalBtn) {
      openTestModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        testModal.style.display = 'flex';
        setTimeout(() => {
          testModal.classList.add('show');
        }, 10);
      });
    }
    if (closeTestModal) {
      closeTestModal.addEventListener('click', () => {
        testModal.classList.remove('show');
        setTimeout(() => {
          testModal.style.display = 'none';
        }, 300);
      });
    }
    window.addEventListener('click', (e) => {
      if (e.target === testModal) {
        testModal.classList.remove('show');
        setTimeout(() => {
          testModal.style.display = 'none';
        }, 300);
      }
    });
  
    /* TEST INTERACTIVO */
    const submitQuiz = document.getElementById('submitQuiz');
    if (submitQuiz) {
      submitQuiz.addEventListener('click', () => {
        let score = 0;
        const q1 = document.querySelector('input[name="q1"]:checked');
        const q2 = document.querySelector('input[name="q2"]:checked');
        if (q1 && q1.value === 'a') score++;
        if (q2 && q2.value === 'a') score++;
        document.getElementById('quizResult').textContent = `Obtuviste ${score} de 2 respuestas correctas.`;
      });
    }
  
    /* CALCULADORA DE IMC */
    const calculateImcBtn = document.getElementById('calculateImc');
    if (calculateImcBtn) {
      calculateImcBtn.addEventListener('click', () => {
        const weight = parseFloat(document.getElementById('weight').value);
        const height = parseFloat(document.getElementById('height').value);
        const imcResultDiv = document.getElementById('imcResult');
        const imcIndicator = document.getElementById('imcIndicator');
        if (weight > 0 && height > 0) {
          const imc = weight / (height * height);
          imcResultDiv.textContent = `Tu IMC es ${imc.toFixed(2)}`;
          if (imc >= 18.5 && imc <= 24.9) {
            imcIndicator.style.backgroundColor = document.body.classList.contains('dark') ? '#2ecc71' : '#28a745';
            imcIndicator.textContent = 'Saludable';
          } else {
            imcIndicator.style.backgroundColor = document.body.classList.contains('dark') ? '#e74c3c' : '#dc3545';
            imcIndicator.textContent = 'Fuera de rango';
          }
        } else {
          imcResultDiv.textContent = 'Por favor, ingresa valores válidos.';
          imcIndicator.style.backgroundColor = 'transparent';
          imcIndicator.textContent = '';
        }
      });
    }
  
    /* SLIDER DE BENEFICIOS (EFECTO FADE) */
    function initBenefitsSlider() {
      const slides = document.querySelectorAll('.benefit-slide');
      let index = 0;
      setInterval(() => {
        slides[index].classList.remove('active');
        index = (index + 1) % slides.length;
        slides[index].classList.add('active');
      }, 3000);
    }
    initBenefitsSlider();
  
    /* SLIDER DE HISTORIAS DE ÉXITO CON FLECHAS */
    const slider = document.querySelector('.slider');
    const slidesArr = document.querySelectorAll('.slide');
    const prevBtn = document.querySelector('.prev');
    const nextBtn = document.querySelector('.next');
    let currentSlide = 0;
    function updateSlider() {
      slider.style.transform = `translateX(-${currentSlide * 100}%)`;
    }
    prevBtn.addEventListener('click', () => {
      currentSlide = (currentSlide === 0) ? slidesArr.length - 1 : currentSlide - 1;
      updateSlider();
    });
    nextBtn.addEventListener('click', () => {
      currentSlide = (currentSlide === slidesArr.length - 1) ? 0 : currentSlide + 1;
      updateSlider();
    });
    setInterval(() => {
      currentSlide = (currentSlide === slidesArr.length - 1) ? 0 : currentSlide + 1;
      updateSlider();
    }, 5000);
  
    /* FAQ (Acordeón interactivo con ARIA) */
    const faqButtons = document.querySelectorAll('.faq-question');
    faqButtons.forEach((btn) => {
      btn.addEventListener('click', () => {
        const expanded = btn.getAttribute('aria-expanded') === 'true';
        btn.setAttribute('aria-expanded', !expanded);
        const answer = btn.nextElementSibling;
        if (answer.style.maxHeight) {
          answer.style.maxHeight = null;
        } else {
          answer.style.maxHeight = answer.scrollHeight + "px";
        }
      });
    });
  
    /* ACCESIBILIDAD: Cambio de tamaño de fuente */
    const increaseFontBtn = document.getElementById('increaseFont');
    const decreaseFontBtn = document.getElementById('decreaseFont');
    increaseFontBtn.addEventListener('click', () => {
      let currentSize = parseFloat(getComputedStyle(document.body).fontSize);
      document.body.style.fontSize = (currentSize + 1) + 'px';
      localStorage.setItem('fontSize', document.body.style.fontSize);
    });
    decreaseFontBtn.addEventListener('click', () => {
      let currentSize = parseFloat(getComputedStyle(document.body).fontSize);
      document.body.style.fontSize = (currentSize - 1) + 'px';
      localStorage.setItem('fontSize', document.body.style.fontSize);
    });
    const savedFontSize = localStorage.getItem('fontSize');
    if (savedFontSize) {
      document.body.style.fontSize = savedFontSize;
    }
  });
  