# Professional Portfolio

This portfolio site is built as a scalable static website using:

- `index.html` for the page structure
- `style.css` and `responsive.css` for layout and responsive styling
- `js/main.js` to load data and render sections dynamically
- `data/portfolio-data.json` to store content in a structured format

## How to upload this site to GitHub

If you have not initialized the repository yet, run these commands from the project root:

```bash
echo "# professional-portfolio" >> README.md
git init
ngit add .
git commit -m "Initial portfolio site"
git branch -M main
ngit remote add origin https://github.com/fritzgayas/professional-portfolio.git
git push -u origin main
```

If the repository is already initialized and you just need to push changes:

```bash
git add .
git commit -m "Add portfolio website"
git push origin main
```

## Local testing

To test the site locally, use a local web server, for example:

```bash
python -m http.server 8000
```

Then open `http://localhost:8000` in your browser.

## Deploying to GitHub Pages

1. Push the repo to GitHub on the `main` branch.
2. In GitHub repository Settings → Pages, set source to `main` branch and folder `/ (root)`.
3. Save and wait for the site to publish at `https://fritzgayas.github.io/professional-portfolio/`.
