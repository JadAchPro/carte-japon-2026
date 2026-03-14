const map = L.map('map').setView([36.5, 137.5], 6);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

const overlay = document.getElementById('modal-overlay');
const modalCity = document.getElementById('modal-city');
const modalDates = document.getElementById('modal-dates');
const modalSummary = document.getElementById('modal-summary');
const modalHighlights = document.getElementById('modal-highlights');
const dayTabs = document.getElementById('day-tabs');
const carouselContainer = document.getElementById('carousel-container');
const carouselTrack = document.getElementById('carousel-track');
const carouselCaption = document.getElementById('carousel-caption');
const btnPrev = document.getElementById('carousel-prev');
const btnNext = document.getElementById('carousel-next');
const btnClose = document.getElementById('modal-close');
const dayTabsBottom = document.getElementById('day-tabs-bottom');

let currentSlide = 0;
let currentPhotos = [];
let currentStage = null;
let currentAnchor = null;

function renderContent(summary, highlights, photos, anchor) {
  modalSummary.textContent = summary;

  modalHighlights.innerHTML = '';
  highlights.forEach(h => {
    const li = document.createElement('li');
    li.textContent = h;
    modalHighlights.appendChild(li);
  });

  // Story link
  let storyLink = document.getElementById('story-link');
  if (!storyLink) {
    storyLink = document.createElement('a');
    storyLink.id = 'story-link';
    storyLink.className = 'read-story-link';
    modalHighlights.parentNode.insertBefore(storyLink, carouselContainer);
  }
  const linkAnchor = anchor || currentAnchor || (currentStage && currentStage.anchor);
  if (linkAnchor) {
    storyLink.href = 'journal.html#' + linkAnchor;
    storyLink.textContent = 'Lire le récit \u2192';
    storyLink.style.display = '';
  } else {
    storyLink.style.display = 'none';
  }

  currentPhotos = photos || [];
  currentSlide = 0;

  if (currentPhotos.length > 0) {
    carouselContainer.classList.remove('hidden');
    carouselTrack.innerHTML = '';
    currentPhotos.forEach(p => {
      const ext = p.file.split('.').pop().toLowerCase();
      if (ext === 'mp4' || ext === 'mov') {
        const video = document.createElement('video');
        video.src = p.file;
        video.controls = true;
        video.playsInline = true;
        video.preload = 'metadata';
        video.setAttribute('controlsList', 'nodownload');
        carouselTrack.appendChild(video);
      } else {
        const img = document.createElement('img');
        img.src = p.file;
        img.alt = p.caption;
        carouselTrack.appendChild(img);
      }
    });
    updateCarousel();
  } else {
    carouselContainer.classList.add('hidden');
  }
}

function selectDay(index) {
  const day = currentStage.days[index];
  document.querySelectorAll('.day-tab').forEach((tab, i) => {
    tab.classList.toggle('active', i === index);
  });
  currentAnchor = day.anchor || currentStage.anchor;
  renderContent(day.summary, day.highlights, day.photos, currentAnchor);
}

function buildDayTabs(container, days) {
  container.innerHTML = '';
  days.forEach((day, i) => {
    const btn = document.createElement('button');
    btn.className = 'day-tab';
    btn.textContent = day.label;
    btn.addEventListener('click', () => selectDay(i));
    container.appendChild(btn);
  });
}

function openModal(stage) {
  currentStage = stage;
  modalCity.textContent = stage.city;
  modalDates.textContent = stage.dates;

  // Planned badge + convert button
  let badgePlanned = document.getElementById('badge-planned');
  let btnConvert = document.getElementById('btn-convert');
  if (!badgePlanned) {
    badgePlanned = document.createElement('span');
    badgePlanned.id = 'badge-planned';
    badgePlanned.className = 'badge-planned';
    badgePlanned.textContent = 'Planifié';
    modalDates.parentNode.insertBefore(badgePlanned, modalDates.nextSibling);
  }
  if (!btnConvert) {
    btnConvert = document.createElement('button');
    btnConvert.id = 'btn-convert';
    btnConvert.className = 'btn-convert';
    btnConvert.textContent = 'Marquer comme visité';
    badgePlanned.parentNode.insertBefore(btnConvert, badgePlanned.nextSibling);
  }

  if (stage.planned) {
    badgePlanned.style.display = '';
    btnConvert.style.display = '';
    btnConvert.onclick = () => convertStage(stage);
  } else {
    badgePlanned.style.display = 'none';
    btnConvert.style.display = 'none';
  }

  dayTabs.innerHTML = '';
  dayTabsBottom.innerHTML = '';

  if (stage.days && stage.days.length > 0) {
    buildDayTabs(dayTabs, stage.days);
    buildDayTabs(dayTabsBottom, stage.days);
    selectDay(0);
  } else {
    currentAnchor = stage.anchor;
    renderContent(stage.summary, stage.highlights, stage.photos, stage.anchor);
  }

  overlay.classList.remove('hidden');
}

function closeModal() {
  overlay.classList.add('hidden');
}

function updateCarousel() {
  // Pause all videos when switching slides
  carouselTrack.querySelectorAll('video').forEach(v => v.pause());
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

// --- EPIC 6: Planned stage management ---

function getConvertedStages() {
  try { return JSON.parse(localStorage.getItem('convertedStages') || '[]'); }
  catch { return []; }
}

function saveConvertedStage(stageId) {
  const converted = getConvertedStages();
  if (!converted.includes(stageId)) {
    converted.push(stageId);
    localStorage.setItem('convertedStages', JSON.stringify(converted));
  }
}


function convertStage(stage) {
  stage.planned = false;
  saveConvertedStage(stage.id);
  closeModal();
  loadMap();
}

function applyConversions(stages) {
  const today = new Date().toISOString().slice(0, 10);
  const converted = getConvertedStages();

  stages.forEach(s => {
    if (converted.includes(s.id)) {
      s.planned = false;
      return;
    }
    if (s.planned && s.plannedDate && s.plannedDate <= today) {
      s.planned = false;
    }
  });
}

function applyRouteConversions(routes, stages) {
  routes.forEach(r => {
    if (!r.planned) return;
    const fromStage = stages.find(s => s.city === r.from);
    const toStage = stages.find(s => s.city === r.to);
    if (fromStage && toStage && !fromStage.planned && !toStage.planned) {
      r.planned = false;
    }
  });
}


// --- Map rendering ---

let mapMarkers = [];
let mapRoutes = [];

function clearMapLayers() {
  mapMarkers.forEach(m => map.removeLayer(m));
  mapRoutes.forEach(r => map.removeLayer(r));
  mapMarkers = [];
  mapRoutes = [];
}

function loadMap() {
  clearMapLayers();

  fetch('data.json')
    .then(r => r.json())
    .then(data => {
      // Apply date-based and localStorage conversions
      applyConversions(data.stages);
      applyRouteConversions(data.routes, data.stages);

      const japanStages = data.stages.filter(s =>
        s.coords[0] >= 24 && s.coords[0] <= 46 &&
        s.coords[1] >= 122 && s.coords[1] <= 154
      );

      // Build order number: Japan stages sorted by id, numbered from 1
      const sortedJapan = [...japanStages].sort((a, b) => a.id - b.id);
      const orderMap = {};
      sortedJapan.forEach((s, i) => { orderMap[s.id] = i + 1; });

      // Detect duplicate cities to offset overlapping markers
      const cityCount = {};
      japanStages.forEach(s => {
        const key = s.city;
        cityCount[key] = (cityCount[key] || 0) + 1;
      });
      const citySeenSoFar = {};

      japanStages.forEach(stage => {
        const num = orderMap[stage.id] || stage.id;
        const markerClass = stage.planned ? 'stage-marker planned' : 'stage-marker';
        const icon = L.divIcon({
          className: '',
          html: `<div class="${markerClass}"><span class="stage-num">${num}</span></div>`,
          iconSize: [36, 36],
          iconAnchor: [18, 18],
          popupAnchor: [0, -18]
        });

        // Offset duplicate city markers so both are visible
        let lat = stage.coords[0];
        let lng = stage.coords[1];
        const key = stage.city;
        citySeenSoFar[key] = (citySeenSoFar[key] || 0) + 1;
        if (cityCount[key] > 1 && citySeenSoFar[key] > 1) {
          lat += 0.15;
          lng += 0.15;
        }

        const marker = L.marker([lat, lng], { icon }).addTo(map);

        // Show "Tokyo (retour)" for the planned Tokyo to distinguish
        const tooltipName = (cityCount[key] > 1 && stage.planned) ? stage.city + ' (retour)' : stage.city;
        marker.bindTooltip(tooltipName, {
          permanent: true,
          direction: 'top',
          offset: [0, -18],
          className: 'city-tooltip'
        });

        marker.on('click', () => openModal(stage));
        mapMarkers.push(marker);
      });

      // Draw done routes first (red)
      data.routes.filter(r => !r.planned).forEach(route => {
        const layer = L.geoJSON(route.geometry, {
          style: { color: '#e74c3c', weight: 4, opacity: 0.9 }
        }).addTo(map);
        mapRoutes.push(layer);
      });

      // Draw planned routes on top with white border so they're visible over red
      data.routes.filter(r => r.planned).forEach(route => {
        // White border (wider)
        const border = L.geoJSON(route.geometry, {
          style: { color: '#ffffff', weight: 7, opacity: 0.9 }
        }).addTo(map);
        mapRoutes.push(border);
        // Pink fill
        const fill = L.geoJSON(route.geometry, {
          style: { color: '#f5a6b8', weight: 4, opacity: 0.9 }
        }).addTo(map);
        mapRoutes.push(fill);
      });

    });
}

// Load map on start
loadMap();
