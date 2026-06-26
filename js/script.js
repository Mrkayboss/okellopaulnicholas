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

  // Contact form handler with Web3Forms
  const contactForm = document.getElementById('contact-form');
  if (contactForm) {
    contactForm.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      // Hide previous messages
      const successMsg = document.getElementById('form-success');
      const errorMsg = document.getElementById('form-error');
      if (successMsg) successMsg.classList.add('hidden');
      if (errorMsg) errorMsg.classList.add('hidden');
      
      // Check if access key is set
      const accessKey = contactForm.querySelector('input[name="access_key"]').value;
      if (accessKey === 'YOUR_WEB3FORMS_ACCESS_KEY_HERE') {
        if (errorMsg) {
          errorMsg.textContent = '✗ Contact form not configured. Please set your Web3Forms access key.';
          errorMsg.classList.remove('hidden');
        }
        return;
      }
      
      try {
        const formData = new FormData(contactForm);
        const response = await fetch('https://api.web3forms.com/submit', {
          method: 'POST',
          body: formData
        });
        
        const data = await response.json();
        
        if (data.success) {
          if (successMsg) successMsg.classList.remove('hidden');
          contactForm.reset();
          // Scroll to success message
          setTimeout(() => {
            if (successMsg) successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          }, 100);
        } else {
          if (errorMsg) {
            errorMsg.textContent = '✗ ' + (data.message || 'Failed to send message. Please try again.');
            errorMsg.classList.remove('hidden');
          }
        }
      } catch (error) {
        console.error('Form submission error:', error);
        if (errorMsg) {
          errorMsg.textContent = '✗ Network error. Please check your connection and try again.';
          errorMsg.classList.remove('hidden');
        }
      }
    });
  }
});
