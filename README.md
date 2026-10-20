# Naqvi Softworks Website

A premium five-page software company website built with only HTML, CSS, and vanilla JavaScript.

## Pages
- index.html
- services.html
- about.html
- portfolio.html
- contact.html

## Structure
- css/style.css
- js/script.js
- logo.png

## Configuration
Edit the `SITE_CONFIG` object in `js/script.js` to add live project demo and video URLs later.

```js
const SITE_CONFIG = {
  whatsapp: "923107577184",
  email: "mailto:naqvisoftworks@gmail.com",
  projects: {
    gym: { demoUrl: "", videoUrl: "" },
    zarai: { demoUrl: "", videoUrl: "" }
  }
};
```

## Local preview
Open the site in a browser or run a local static server:

```bash
python -m http.server 8000
```

Then visit http://localhost:8000/
