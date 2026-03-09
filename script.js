const map = L.map('map').setView([36.5, 137.5], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const overlay = document.getElementById('modal-overlay');
const modalCity = document.getElementById('modal-city');
const modalDates = document.getElementById('modal-dates');
const modalSummary = document.getElementById('modal-summary');
const modalHighlights = document.getElementById('modal-highlights');
const carouselContainer = document.getElementById('carousel-container');
const carouselTrack = document.getElementById('carousel-track');
const carouselCaption = document.getElementById('carousel-caption');
const btnPrev = document.getElementById('carousel-prev');
const btnNext = document.getElementById('carousel-next');
const btnClose = document.getElementById('modal-close');

let currentSlide = 0;
let currentPhotos = [];

function openModal(stage) {
  modalCity.textContent = stage.city;
  modalDates.textContent = stage.dates;
  modalSummary.textContent = stage.summary;

  modalHighlights.innerHTML = '';
  stage.highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    modalHighlights.appendChild(li);
  });

  currentPhotos = stage.photos || [];
  currentSlide = 0;

  if (currentPhotos.length > 0) {
    carouselContainer.classList.remove('hidden');
    carouselTrack.innerHTML = '';
    currentPhotos.forEach(p => {
      const img = document.createElement('img');
      img.src = p.file;
      img.alt = p.caption;
      carouselTrack.appendChild(img);
    });
    updateCarousel();
  } else {
    carouselContainer.classList.add('hidden');
  }

  overlay.classList.remove('hidden');
}

function closeModal() {
  overlay.classList.add('hidden');
}

function updateCarousel() {
  carouselTrack.style.transform = `translateX(-${currentSlide * 100}%)`;
  carouselCaption.textContent = currentPhotos[currentSlide]?.caption || '';
}

btnPrev.addEventListener('click', () => {
  if (currentSlide > 0) {
    currentSlide--;
    updateCarousel();
  }
});

btnNext.addEventListener('click', () => {
  if (currentSlide < currentPhotos.length - 1) {
    currentSlide++;
    updateCarousel();
  }
});

btnClose.addEventListener('click', closeModal);

overlay.addEventListener('click', (e) => {
  if (e.target === overlay) closeModal();
});

document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape') closeModal();
  if (!overlay.classList.contains('hidden')) {
    if (e.key === 'ArrowLeft' && currentSlide > 0) {
      currentSlide--;
      updateCarousel();
    }
    if (e.key === 'ArrowRight' && currentSlide < currentPhotos.length - 1) {
      currentSlide++;
      updateCarousel();
    }
  }
});

// Load data and populate map
fetch('data.json')
  .then(r => r.json())
  .then(data => {
    // Filter stages to Japan only (lat 24-46, lon 122-154)
    const japanStages = data.stages.filter(s =>
      s.coords[0] >= 24 && s.coords[0] <= 46 &&
      s.coords[1] >= 122 && s.coords[1] <= 154
    );

    japanStages.forEach(stage => {
      const marker = L.circleMarker([stage.coords[0], stage.coords[1]], {
        radius: 10,
        fillColor: '#e74c3c',
        color: '#c0392b',
        weight: 2,
        fillOpacity: 0.9
      }).addTo(map);

      marker.bindTooltip(stage.city, {
        permanent: true,
        direction: 'top',
        offset: [0, -12],
        className: 'city-tooltip'
      });

      marker.on('click', () => openModal(stage));
    });

    // Draw routes
    data.routes.forEach(route => {
      L.geoJSON(route.geometry, {
        style: {
          color: '#e74c3c',
          weight: 3,
          opacity: 0.7,
          dashArray: '8, 6'
        }
      }).addTo(map);
    });
  });
