document.addEventListener('DOMContentLoaded', () => {
  // Initialize AOS if present
  if (window.AOS && typeof AOS.init === 'function') AOS.init();

  // Mobile nav toggle
  const mobileBtn = document.getElementById('mobileMenuBtn');
  const navLinks = document.getElementById('navLinks');
  if (mobileBtn && navLinks) {
    mobileBtn.addEventListener('click', () => {
      navLinks.classList.toggle('open');
      mobileBtn.classList.toggle('active');
    });
  }

  // Simple modal for project previews
  window.openProjectModal = function (src, caption) {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    const modalCaption = document.getElementById('modalCaption');
    if (!modal || !modalImg) return;
    modalImg.src = src;
    if (modalCaption) modalCaption.textContent = caption || '';
    modal.style.display = 'block';
  };

  window.closeModal = function () {
    const modal = document.getElementById('imageModal');
    if (modal) modal.style.display = 'none';
  };

  // Close modal when clicking outside the image
  document.addEventListener('click', (e) => {
    const modal = document.getElementById('imageModal');
    const modalImg = document.getElementById('modalImg');
    if (!modal) return;
    if (e.target === modal) modal.style.display = 'none';
  });

  // Download CV fallback (points to assets/PDFs/Paul_Nicholas_CV.pdf if present)
  const downloadBtn = document.getElementById('downloadCVBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      // If a real CV exists, the link will resolve; else this is a noop for now
      // Prevent default and try to navigate
      e.preventDefault();
      window.location.href = 'assets/PDFs/Paul_Nicholas_CV.pdf';
    });
  }

  // Contact form demo handler
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      // Basic demo behavior: show a quick confirmation and reset
      alert('Thanks — your message has been received (demo).');
      contactForm.reset();
    });
  }
});
