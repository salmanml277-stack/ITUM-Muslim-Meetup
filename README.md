# ITUM-Muslim-Meetup
ITUM Muslim Students' Meet-up 2026

Static website (HTML, CSS, vanilla JS). No build tools, no backend, no API keys. Registration is handled by the real Google Form embedded in the page.

Structure
ITUM-Muslim-Meetup/
  index.html
  style.css
  script.js
  README.md
  assets/
    images/     (empty, reserved for your own photos)
    favicon/    (empty, favicon is currently inline in index.html)

Create the empty assets/images and assets/favicon folders yourself if you want them. The site works without them.

Preview locally
Open the folder in VS Code.
Install the Live Server extension, right-click index.html, choose Open with Live Server.
Opening index.html directly also works.
Configure (all in script.js, top CONFIG object)
eventStart / eventEnd — countdown times (Asia/Colombo, +05:30).
mapEmbedUrl, locationShareUrl, directionsUrl — replace these three with an exact meeting-point link when confirmed.

Form height: change --form-height at the top of style.css (default 1720px). The Google Form URL is in index.html (search for docs.google.com/forms, it appears twice: the iframe and the fallback link).

Deploy to GitHub Pages
Create a repository on github.com (e.g. itum-muslim-meetup).
In the VS Code terminal, inside the project folder:
git init
git add .
git commit -m "Initial site"
git branch -M main
git remote add origin https://github.com/YOUR-USERNAME/itum-muslim-meetup.git
git push -u origin main
On GitHub: Settings → Pages → Build and deployment. Source: Deploy from a branch. Branch: main, folder: / (root). Save.
Wait about 1–2 minutes. The site appears at https://YOUR-USERNAME.github.io/itum-muslim-meetup/.

All paths are relative (./style.css, ./script.js), so it works from the repository subpath.

Notes
No images are included, so none can be broken. The artwork is inline SVG. Add your own photography to assets/images/ and reference it with ./assets/images/name.jpg.
Fonts (Cormorant Garamond, Inter) load from Google Fonts. The site falls back to system fonts if offline.
No event programme, organiser or contact details are invented. Add them only when confirmed.
Testing status

Nothing has been run in a browser yet. Check manually: every nav link and CTA, mobile menu, countdown, map load, Open Location, Get Directions, form loads and submits (use a test entry and remove it from your sheet), 360px–1440px widths, reduced-motion setting.
