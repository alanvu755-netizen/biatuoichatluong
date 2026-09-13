// Main JavaScript file for biatuoichatluong.com

document.addEventListener('DOMContentLoaded', () => {
  // --- SLIDER LOGIC ---
  let currentSlide = 0;
  const slides = document.querySelectorAll('.slide');
  const dots = document.querySelectorAll('.dot');
  const sliderWrapper = document.querySelector('.slider-wrapper');
  let slideInterval = null;

  function showSlide(index) {
    if (!slides.length) return;
    slides.forEach(s => s.classList.remove('active'));
    dots.forEach(d => d.classList.remove('active'));

    currentSlide = (index + slides.length) % slides.length;
    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) {
      dots[currentSlide].classList.add('active');
    }
  }

  function nextSlide() {
    showSlide(currentSlide + 1);
    resetTimer();
  }

  function prevSlide() {
    showSlide(currentSlide - 1);
    resetTimer();
  }

  function goToSlide(index) {
    showSlide(index);
    resetTimer();
  }

  function resetTimer() {
    if (slideInterval) clearInterval(slideInterval);
    slideInterval = setInterval(nextSlide, 5000);
  }

  // Attach window functions for inline controls if needed
  window.nextSlide = nextSlide;
  window.prevSlide = prevSlide;
  window.goToSlide = goToSlide;

  // Touch swipe support for Mobile Slider
  let startX = 0;
  let endX = 0;

  if (sliderWrapper) {
    sliderWrapper.addEventListener('touchstart', (e) => {
      startX = e.changedTouches[0].screenX;
    }, { passive: true });

    sliderWrapper.addEventListener('touchend', (e) => {
      endX = e.changedTouches[0].screenX;
      handleSwipe();
    }, { passive: true });
  }

  function handleSwipe() {
    const threshold = 40;
    if (startX - endX > threshold) {
      nextSlide();
    } else if (endX - startX > threshold) {
      prevSlide();
    }
  }

  // Start initial timer
  resetTimer();


  // --- MOBILE MENU DRAWER LOGIC ---
  const mobileToggleBtn = document.getElementById('mobileToggleBtn');
  const mobileMenuDrawer = document.getElementById('mobileMenuDrawer');
  const mobileMenuOverlay = document.getElementById('mobileMenuOverlay');
  const mobileMenuCloseBtn = document.getElementById('mobileMenuCloseBtn');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-list a');

  function openMobileMenu() {
    mobileMenuDrawer.classList.add('open');
    mobileMenuOverlay.classList.add('open');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    mobileMenuDrawer.classList.remove('open');
    mobileMenuOverlay.classList.remove('open');
    document.body.style.overflow = '';
  }

  if (mobileToggleBtn) {
    mobileToggleBtn.addEventListener('click', openMobileMenu);
  }

  if (mobileMenuCloseBtn) {
    mobileMenuCloseBtn.addEventListener('click', closeMobileMenu);
  }

  if (mobileMenuOverlay) {
    mobileMenuOverlay.addEventListener('click', closeMobileMenu);
  }

  mobileNavLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });


  // --- PARTY BEER CALCULATOR LOGIC ---
  const guestInput = document.getElementById('guests');
  
  window.updateCalculator = function(val) {
    const guestDisplay = document.getElementById('guestDisplay');
    const resultLiters = document.getElementById('resultLiters');
    const resultKegs = document.getElementById('resultKegs');

    if (guestDisplay) guestDisplay.innerText = val + ' người';
    
    const totalLiters = Math.round(val * 1.5);
    if (resultLiters) resultLiters.innerText = totalLiters + ' Lít';
    
    const kegs50 = Math.floor(totalLiters / 50);
    const remaining = totalLiters % 50;
    const kegs20 = Math.ceil(remaining / 20);

    let text = 'Khuyên dùng: ';
    if (kegs50 > 0) text += `<strong>${kegs50} Bom 50L Inox</strong> `;
    if (kegs20 > 0) text += `${kegs50 > 0 ? '+ ' : ''}<strong>${kegs20} Bom 20L Inox</strong> `;
    text += '(Đi kèm bộ làm lạnh mini miễn phí)';
    
    if (resultKegs) resultKegs.innerHTML = text;
  };

  if (guestInput) {
    updateCalculator(guestInput.value);
  }
});
