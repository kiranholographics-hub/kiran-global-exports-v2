# Kiran Global Exports Hero video assets

The homepage Hero uses the included real cinematic MP4 assets:

- `kiran-hero-desktop.mp4` — 1280×720, 8 seconds, H.264
- `kiran-hero-mobile.mp4` — 540×960 portrait crop, 8 seconds, H.264

The React component selects the desktop asset above 767px and the portrait mobile asset at or below 767px. Both videos are muted, autoplaying, looping, inline, and rendered with `object-fit: cover`. The poster fallback lives at `../images/hero/kiran-hero-poster.jpg`.
