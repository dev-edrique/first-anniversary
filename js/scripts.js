const slides = [...document.querySelectorAll('.hero-slide')];
const dots = [...document.querySelectorAll('.slide-dot')];
let currentSlide = 0;
let slideTimer;

function showSlide(index) {
	currentSlide = (index + slides.length) % slides.length;
	slides.forEach((slide, i) => slide.classList.toggle('active', i === currentSlide));
	dots.forEach((dot, i) => dot.classList.toggle('active', i === currentSlide));
}

function startSlideshow() {
	clearInterval(slideTimer);
	slideTimer = setInterval(() => showSlide(currentSlide + 1), 5500);
}
dots.forEach((dot, index) => dot.addEventListener('click', () => {
	showSlide(index);
	startSlideshow();
}));
startSlideshow();
const menuButton = document.querySelector('#menuButton');
const mobileMenu = document.querySelector('#mobileMenu');
menuButton?.addEventListener('click', () => {
	const isOpen = !mobileMenu.classList.contains('hidden');
	mobileMenu.classList.toggle('hidden', isOpen);
	menuButton.setAttribute('aria-expanded', String(!isOpen));
});
mobileMenu?.querySelectorAll('a').forEach(link => link.addEventListener('click', () => {
	mobileMenu.classList.add('hidden');
	menuButton.setAttribute('aria-expanded', 'false');
}));
const readMore = document.querySelector('#readMore');
readMore?.addEventListener('click', () => {
	document.querySelectorAll('.letter-extra').forEach(paragraph => paragraph.classList.remove('hidden'));
	readMore.remove();
});
const scrollTop = document.querySelector('#scrollTop');

function updateScrollTopButton() {
	scrollTop?.classList.toggle('pointer-events-none', window.scrollY < 500);
	scrollTop?.classList.toggle('opacity-0', window.scrollY < 500);
	scrollTop?.classList.toggle('translate-y-3', window.scrollY < 500);
}
window.addEventListener('scroll', updateScrollTopButton, {
	passive: true
});
updateScrollTopButton();
scrollTop?.addEventListener('click', () => window.scrollTo({
	top: 0,
	behavior: 'smooth'
}));

const memoryImages = [
  '03874aa1-1780-4913-b8f9-da7602fdddfa.jpg', '10d5afb5-806e-4ac5-86cd-b6f64d56a25c.jpg',
  '110a149c-d25f-420a-9dd4-fe1ff1d363cf.jpg', '13de456d-674e-4697-8eae-a042920835ee.jpg',
  '1a1a7fbe-5e2b-4c03-a2fa-dc299b1be818.jpg', '1bf05fb8-b431-4bb2-a255-8e3210c4c150.jpg',
  '20240223_141148.jpg', '2d8e4ac1-ccf7-4824-89e3-e4f390e07228.jpg',
  '306d3e54-cd32-486a-85bb-124b27e7cacf.jpg', '379c2c8c-3ef7-411a-b441-533a16604db0.jpg',
  '4162e3ff-23ca-4976-b557-6ebbe75f3940.jpg', '42dff0d5-f07f-40f0-869a-21e5827fee54.jpg',
  '4b84c875-099d-4b82-8e67-42563179c63b.jpg', '6e570ba8-87cf-4774-a7a0-1f243dd856ea.jpg',
  '81b9aad9-af69-4928-a887-d718a51f4178.jpg', '84f6ffd1-dd43-4a47-8031-404d29be723e.jpg',
  '8ec960de-f84e-4337-a744-c993ae789dd9.jpg', 'af0406b9-7a9c-424c-8be8-eb8d6a52bc89.jpg',
  'bca2cdf2-f8e6-4f59-afcf-52b7d2d4d4df.jpg', 'be1a64b4-4475-4ae1-8930-0f2e7c00adb1.jpg',
  'c30c1cb7-4319-4e5c-b5ab-f797281d1067.jpg', 'c311bf85-f55d-4d8c-8466-4d59c4a768ac.jpg',
  'cce73b7e-483d-4edb-be62-679bad73384d.jpg', 'daf70869-7bc4-43d1-8f0a-a8cebf75f1d7.jpg',
  'ed9069ca-adfe-4207-af69-0f95737d25f2.jpg', 'Messenger_creation_023025D8-0EDB-4D1A-B7FF-C365C7A80D5E.jpeg',
  'Messenger_creation_0597F7B4-B63A-4A01-93E2-E3E3C8E86D6F.jpeg', 'Messenger_creation_09F50CB4-79B9-4C4D-BD8A-D2F7B0693F12.jpeg',
  'Messenger_creation_15D58E36-5175-407D-B3D7-81A3B21D5BB7.jpeg', 'Messenger_creation_29F1E1C2-D207-4594-9DEE-D639ECE2BE54.jpeg',
  'Messenger_creation_3AB7B75F-393C-4DD8-BB6A-EA7503B1A787.jpeg', 'Messenger_creation_44CD34EB-9D6E-4F34-B386-8A32A3EB95BB.jpeg',
  'Messenger_creation_607AC91D-21E2-4F89-A2BD-7330347804F1.jpeg', 'Messenger_creation_70D39982-EC88-4462-8527-C7E521836F90.jpeg',
  'Messenger_creation_7A504D97-1D2E-46AF-9AD4-A9B477CAC087.jpeg', 'Messenger_creation_893082E7-2D5C-4D97-9251-A3B2E65927EC.jpeg',
  'Messenger_creation_A1F64943-978A-4870-B325-64EB65B0BCCF.jpeg', 'Messenger_creation_B051FBC3-1385-40C5-ABF0-354E8763FA2D.jpeg',
  'Messenger_creation_C0853B84-910B-4B2F-B12E-1E2C06342F3A.jpeg', 'Messenger_creation_D01A2C3B-FD31-428C-B074-54946A6D4437.jpeg',
  'Messenger_creation_E4F158E7-114E-4A08-8BC1-7C2F0DDB5845.jpeg', 'Messenger_creation_FC5D19B1-EC74-4B7E-9ECE-4D102E120DFD.jpeg'
];
const memorySlides = [...document.querySelectorAll('.memory-slide')];
const nextMemory = document.querySelector('#nextMemory');
let activeMemorySlide = 0;
let lastMemoryIndex = -1;
let memoryTimer;

function randomMemoryIndex() {
  if (memoryImages.length < 2) return 0;
  let nextIndex;
  do { nextIndex = Math.floor(Math.random() * memoryImages.length); } while (nextIndex === lastMemoryIndex);
  return nextIndex;
}
function showRandomMemory(initial = false) {
  if (!memorySlides.length) return;
  const nextIndex = randomMemoryIndex();
  const incomingIndex = initial ? activeMemorySlide : 1 - activeMemorySlide;
  const incoming = memorySlides[incomingIndex];
  const outgoing = memorySlides[activeMemorySlide];
  incoming.onload = () => {
    incoming.classList.add('is-active');
    if (!initial) outgoing.classList.remove('is-active');
    activeMemorySlide = incomingIndex;
    lastMemoryIndex = nextIndex;
  };
  incoming.src = `memories-imgs/${encodeURIComponent(memoryImages[nextIndex])}`;
}
function restartMemoryTimer() { window.clearInterval(memoryTimer); memoryTimer = window.setInterval(showRandomMemory, 6000); }
showRandomMemory(true);
restartMemoryTimer();
nextMemory?.addEventListener('click', () => { showRandomMemory(); restartMemoryTimer(); });

// --- Background music -------------------------------------------------------
// Filenames are listed by hand (same as memoryImages above); add a file to
// audio/ AND to this array for it to play.
const musicTracks = [
  'Tenerife_Sea.mp3',
  'Little_Things.mp3',
  'Those_eyes_cover.mp3',
  'Selfish_cover.mp3'
];
const bgMusic = document.querySelector('#bgMusic');
const musicPlayer = document.querySelector('#musicPlayer');
const musicToggle = document.querySelector('#musicToggle');
const musicTitle = document.querySelector('#musicTitle');
const musicNext = document.querySelector('#musicNext');
let musicTrackIndex = 0;
let musicGestureArmed = false;
let switchingTrack = false;

function setMusicState(state) {
  if (!musicPlayer) return;
  musicPlayer.dataset.state = state;
  const playing = state === 'playing';
  musicToggle?.setAttribute('aria-label', playing ? 'Mute the music' : 'Turn the music on');
  musicToggle?.setAttribute('aria-pressed', String(playing));
}

function loadTrack(index, autoplay) {
  if (!bgMusic || !musicTracks.length) return;
  musicTrackIndex = (index + musicTracks.length) % musicTracks.length;
  const file = musicTracks[musicTrackIndex];
  switchingTrack = true;
  bgMusic.src = `audio/${encodeURIComponent(file)}`;
  if (musicTitle) {
    musicTitle.textContent = file;
    musicTitle.title = file;
  }
  // Changing track must not undo a mute the listener chose.
  if (autoplay) playMusic(bgMusic.muted);
}

function playMusic(keepMuted) {
  if (!bgMusic) return;
  switchingTrack = false;
  if (!keepMuted) bgMusic.muted = false;
  const started = bgMusic.play();
  if (!started) {
    setMusicState(bgMusic.muted ? 'muted' : 'playing');
    return;
  }
  started.then(() => setMusicState(bgMusic.muted ? 'muted' : 'playing')).catch(() => {
    // Browsers block sound until the page has been interacted with.
    setMusicState('blocked');
    armMusicGesture();
  });
}

// One-shot: start the music on the first real interaction anywhere on the page.
function armMusicGesture() {
  if (musicGestureArmed) return;
  musicGestureArmed = true;
  const events = ['pointerdown', 'keydown'];
  const start = event => {
    // Let the player's own button handle its own clicks.
    if (musicPlayer?.contains(event.target)) return;
    events.forEach(name => document.removeEventListener(name, start));
    musicGestureArmed = false;
    playMusic();
  };
  events.forEach(name => document.addEventListener(name, start, { passive: true }));
}

if (bgMusic && musicPlayer) {
  bgMusic.volume = 0.45;
  bgMusic.addEventListener('ended', () => loadTrack(musicTrackIndex + 1, true));
  bgMusic.addEventListener('pause', () => {
    if (!switchingTrack && musicPlayer.dataset.state === 'playing') setMusicState('paused');
  });
  musicNext?.addEventListener('click', () => loadTrack(musicTrackIndex + 1, true));
  musicToggle?.addEventListener('click', () => {
    if (musicPlayer.dataset.state === 'playing') {
      bgMusic.muted = true;
      setMusicState('muted');
    } else {
      playMusic();
    }
  });
  loadTrack(0, true);
}
