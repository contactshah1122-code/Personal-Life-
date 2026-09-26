/**
 * Sawal Ahmed — Personal Life Archive
 * Production Static Client Scripts (Vanilla JavaScript)
 * Zero backend dependencies, Cloudflare Pages ready.
 */

document.addEventListener('DOMContentLoaded', () => {
  'use strict';

  // --- 1. Mobile Navigation Drawer ---
  const mobileToggle = document.getElementById('mobileNavToggle');
  const mobileDrawer = document.getElementById('mobileDrawer');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

  function openMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.add('open');
      document.body.style.overflow = 'hidden';
    }
  }

  function closeMobileDrawer() {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('open');
      document.body.style.overflow = '';
    }
  }

  if (mobileToggle) {
    mobileToggle.addEventListener('click', openMobileDrawer);
  }

  if (mobileDrawerClose) {
    mobileDrawerClose.addEventListener('click', closeMobileDrawer);
  }

  if (mobileDrawer) {
    mobileDrawer.addEventListener('click', (e) => {
      if (e.target === mobileDrawer) {
        closeMobileDrawer();
      }
    });
  }

  mobileNavLinks.forEach((link) => {
    link.addEventListener('click', () => {
      closeMobileDrawer();
    });
  });

  // --- 2. Active Navigation Link Highlighting on Scroll ---
  const sections = document.querySelectorAll('section[id]');
  const desktopNavLinks = document.querySelectorAll('.site-header .nav-link');

  function updateActiveNavLink() {
    const scrollY = window.pageYOffset;
    const headerHeight = 80;

    sections.forEach((current) => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - headerHeight - 40;
      const sectionId = current.getAttribute('id');

      if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
        desktopNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
        mobileNavLinks.forEach((link) => {
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          } else {
            link.classList.remove('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', updateActiveNavLink, { passive: true });
  updateActiveNavLink();

  // --- 3. Timeline Filtering ---
  const timelineFilterBtns = document.querySelectorAll('.timeline-filter-btn');
  const timelineNodes = document.querySelectorAll('.timeline-node');

  timelineFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      timelineFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      timelineNodes.forEach((node) => {
        const category = node.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          node.style.display = 'flex';
        } else {
          node.style.display = 'none';
        }
      });
    });
  });

  // --- 4. Timeline Card Expansion ---
  const expandButtons = document.querySelectorAll('.timeline-expand-btn');
  expandButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const card = btn.closest('.timeline-card');
      if (card) {
        card.classList.toggle('expanded');
        if (card.classList.contains('expanded')) {
          btn.innerHTML = '<span>Show Less</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M18 15l-6-6-6 6"/></svg>';
        } else {
          btn.innerHTML = '<span>Read Archival Note</span> <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M6 9l6 6 6-6"/></svg>';
        }
      }
    });
  });

  // --- 5. Photo Archive Filtering ---
  const photoFilterBtns = document.querySelectorAll('.photo-filter-btn');
  const photoCards = document.querySelectorAll('.photo-card');

  photoFilterBtns.forEach((btn) => {
    btn.addEventListener('click', () => {
      photoFilterBtns.forEach((b) => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.getAttribute('data-filter');

      photoCards.forEach((card) => {
        const category = card.getAttribute('data-category');
        if (filter === 'all' || category === filter) {
          card.style.display = 'flex';
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // --- 6. Photo Archive Lightbox Modal ---
  const lightbox = document.getElementById('photoLightbox');
  const lightboxImg = document.getElementById('lightboxImg');
  const lightboxCaption = document.getElementById('lightboxCaption');
  const lightboxDate = document.getElementById('lightboxDate');
  const lightboxClose = document.getElementById('lightboxClose');

  let currentPhotoIndex = 0;
  const visiblePhotosList = [];

  function updateVisiblePhotos() {
    visiblePhotosList.length = 0;
    photoCards.forEach((card) => {
      if (window.getComputedStyle(card).display !== 'none') {
        visiblePhotosList.push(card);
      }
    });
  }

  function openLightbox(index) {
    if (!lightbox || visiblePhotosList.length === 0) return;
    currentPhotoIndex = index;
    const card = visiblePhotosList[index];
    const imgEl = card.querySelector('img');
    const captionEl = card.querySelector('.photo-caption');
    const dateEl = card.querySelector('.photo-date');

    if (imgEl && lightboxImg) {
      lightboxImg.src = imgEl.src;
      lightboxImg.alt = imgEl.alt || 'Archive Photo';
    }
    if (captionEl && lightboxCaption) {
      lightboxCaption.textContent = captionEl.textContent;
    }
    if (dateEl && lightboxDate) {
      lightboxDate.textContent = dateEl.textContent;
    }

    lightbox.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeLightbox() {
    if (lightbox) {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }
  }

  photoCards.forEach((card) => {
    card.addEventListener('click', () => {
      updateVisiblePhotos();
      const idx = visiblePhotosList.indexOf(card);
      if (idx !== -1) {
        openLightbox(idx);
      }
    });
  });

  if (lightboxClose) {
    lightboxClose.addEventListener('click', closeLightbox);
  }

  if (lightbox) {
    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) {
        closeLightbox();
      }
    });
  }

  // Keyboard navigation for Lightbox
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.classList.contains('active')) {
      if (e.key === 'Escape') {
        closeLightbox();
      } else if (e.key === 'ArrowRight') {
        updateVisiblePhotos();
        if (visiblePhotosList.length > 0) {
          openLightbox((currentPhotoIndex + 1) % visiblePhotosList.length);
        }
      } else if (e.key === 'ArrowLeft') {
        updateVisiblePhotos();
        if (visiblePhotosList.length > 0) {
          openLightbox((currentPhotoIndex - 1 + visiblePhotosList.length) % visiblePhotosList.length);
        }
      }
    }
    if (mobileDrawer && mobileDrawer.classList.contains('open') && e.key === 'Escape') {
      closeMobileDrawer();
    }
  });

  // --- 7. Toast Notification Utility ---
  const toastNotice = document.getElementById('toastNotice');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(message) {
    if (!toastNotice || !toastMessage) return;
    toastMessage.textContent = message;
    toastNotice.classList.add('show');

    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toastNotice.classList.remove('show');
    }, 4000);
  }

  // --- 8. Copy Email Action ---
  const copyEmailButtons = document.querySelectorAll('.btn-copy-email, [data-copy-email]');
  copyEmailButtons.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const email = btn.getAttribute('data-email') || 'contactshah1122@gmail.com';
      navigator.clipboard.writeText(email).then(() => {
        showToast(`Email address (${email}) copied to clipboard!`);
      }).catch(() => {
        showToast(`Email: ${email}`);
      });
    });
  });

  // --- 9. Guestbook / Archival Ledger Demo ---
  const guestbookForm = document.getElementById('contactForm');
  const guestFeed = document.getElementById('guestbookFeed');

  const defaultNotes = [
    {
      author: 'Marcus Vance',
      time: 'Earlier this week',
      message: 'Inspiring to see such a methodical chronicle of your roots and intellectual journey. Keep archiving!'
    },
    {
      author: 'Elena Rostova',
      time: '2 weeks ago',
      message: 'The timeline milestones and future vision pillars articulate a profound life philosophy.'
    }
  ];

  function loadGuestbook() {
    if (!guestFeed) return;
    let stored = [];
    try {
      const data = localStorage.getItem('sawal_ahmed_archive_notes');
      if (data) {
        stored = JSON.parse(data);
      }
    } catch {
      stored = [];
    }

    const allNotes = [...stored, ...defaultNotes];
    guestFeed.innerHTML = '';

    allNotes.forEach((note) => {
      const el = document.createElement('div');
      el.className = 'guest-note-entry';
      el.innerHTML = `
        <div class="guest-note-header">
          <span class="guest-note-author">${escapeHtml(note.author)}</span>
          <span class="guest-note-time">${escapeHtml(note.time)}</span>
        </div>
        <p class="guest-note-msg">${escapeHtml(note.message)}</p>
      `;
      guestFeed.appendChild(el);
    });
  }

  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  loadGuestbook();

  if (guestbookForm) {
    guestbookForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const nameInput = document.getElementById('senderName');
      const emailInput = document.getElementById('senderEmail');
      const subjectInput = document.getElementById('msgSubject');
      const messageInput = document.getElementById('senderMessage');

      const name = nameInput ? nameInput.value.trim() : '';
      const email = emailInput ? emailInput.value.trim() : '';
      const subject = subjectInput ? subjectInput.value.trim() : '';
      const message = messageInput ? messageInput.value.trim() : '';

      if (!name || !email || !message) {
        showToast('Please fill in your name, email, and message.');
        return;
      }

      // Save to localStorage for demo persistence
      const newEntry = {
        author: name,
        time: 'Just now (Demo Ledger)',
        message: message
      };

      try {
        const stored = JSON.parse(localStorage.getItem('sawal_ahmed_archive_notes') || '[]');
        stored.unshift(newEntry);
        localStorage.setItem('sawal_ahmed_archive_notes', JSON.stringify(stored));
      } catch (err) {
        console.warn('LocalStorage unavailable for guestbook:', err);
      }

      // Reset form
      guestbookForm.reset();
      loadGuestbook();

      showToast(`Thank you, ${name}! Your note has been registered in the archive demo ledger.`);
    });
  }

  // --- 10. Download / Export Archive Summary ---
  const downloadBtn = document.getElementById('downloadArchiveBtn');
  if (downloadBtn) {
    downloadBtn.addEventListener('click', (e) => {
      e.preventDefault();
      const archiveSummary = `=====================================================
SAWAL AHMED — PERSONAL LIFE ARCHIVE
=====================================================
Archival Ref: SA-CHRONICLE-2026-V1
Classification: Open Public Memoir & Life Portfolio
Status: Active Living Archive

PERSONAL PROFILE
----------------
Name: Sawal Ahmed
Title: Technologist • Chronicler • Lifelong Learner
Core Principles: Authenticity, Resilience, Craftsmanship, Impact
Primary Vision: Building enduring technological & human solutions

KEY CHAPTERS & SECTIONS:
- Roots & Childhood: Cultural foundations & early formative curiosity.
- Education: Academic degrees, continuous self-guided study & systems engineering.
- Interactive Timeline: Curated chronological milestones spanning formative years, academia, career, and breakthroughs.
- Memories & Reflections: Formative life moments and perspective shifts.
- Photo Archive: Photographic catalog of journeys, workspaces, and milestones.
- Growth & Evolution: Skill matrix, deliberate daily disciplines, and personal philosophy.
- Future Vision: Horizon 2026-2035 roadmap, mentorship, and societal impact.

Direct Contact: contactshah1122@gmail.com
Deployed Statically via Cloudflare Pages.
=====================================================`;

      const blob = new Blob([archiveSummary], { type: 'text/plain;charset=utf-8' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Sawal_Ahmed_Personal_Life_Archive_Summary.txt';
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      showToast('Archival summary downloaded successfully!');
    });
  }

  // --- 11. Back to Top Button ---
  const backToTopBtn = document.getElementById('backToTopBtn');
  if (backToTopBtn) {
    backToTopBtn.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
});
