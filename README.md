# Mac Key Grip Engineering Portfolio

A lightweight engineering portfolio for **Chinunka Chabala** and **Mac Key Grip Engineering**, presenting selected work across HVAC, mechanical and plumbing services, CAD design, data analysis, and supply-chain modelling.

## Portfolio areas

- HVAC load estimation, equipment selection, ductwork, and ventilation layouts
- Water-supply and sewer reticulation design
- Fuel-station tank, pipework, offloading, and dispensing layouts
- Mechanical CAD modelling and construction documentation
- Excel dashboards, scenario analysis, and data cleaning
- EV battery and vehicle-assembly supply-chain modelling for Zambia

## View locally

No build step or dependencies are required.

```bash
git clone https://github.com/chinunkachabala93-tech/Grip-repo.git
cd Grip-repo
python -m http.server 8000
```

Then open `http://localhost:8000`.

## Publish with GitHub Pages

In the repository, open **Settings → Pages**, select **Deploy from a branch**, choose `main` and `/ (root)`, then save. GitHub will publish the portfolio from `index.html`.

## Structure

```text
Grip-repo/
├── index.html          # Portfolio content and page structure
├── styles.css          # Responsive visual system
├── script.js           # Navigation and project filtering
├── sitemap.xml         # Preferred public URL for search engines
├── robots.txt          # Crawler access and sitemap discovery
├── .nojekyll           # Serve the static site without Jekyll processing
├── assets/
│   ├── brand/          # Original MKG logo assets
│   ├── projects/       # Your future project media
│   ├── reference/      # Temporary licensed reference images
│   └── README.md       # Guide for adding project media
├── CREDITS.md          # Reference-image sources and licences
├── LICENSE
└── README.md
```

## Add project drawings

1. Export drawings or renders as optimized `.webp`, `.jpg`, or `.png` files.
2. Place them in `assets/projects/<project-name>/`.
3. Replace the matching project card's placeholder in `index.html` with an image:

```html
<img src="assets/projects/hvac/example.webp" alt="HVAC layout showing duct and equipment arrangement">
```

Remove client names, drawing numbers, coordinates, signatures, and commercially sensitive information before publishing.

You can also upload images directly on GitHub: open the target `assets/projects/...` folder, choose **Add file → Upload files**, select the image, and commit it to `main`. Then add its path to the relevant project card in `index.html`.

## Design principles

- Static, accessible, and mobile-friendly
- Honest project descriptions without invented performance claims
- Easy to extend without a framework
- Printable project overview

## Contact

- **Profile:** [Chinunka Chabala on GitHub](https://github.com/chinunkachabala93-tech)
- **Location:** Lusaka, Zambia

## License

Code is available under the [MIT License](LICENSE). Project drawings and client deliverables added later may require separate usage terms.

## Google indexing

The public site is configured for `https://mackeygrip.github.io/` with canonical metadata, structured business data, `robots.txt`, and an XML sitemap. After publishing:

1. Add the URL-prefix property `https://mackeygrip.github.io/` in Google Search Console.
2. Verify ownership using Google's HTML-file method by adding the supplied verification file to the repository root.
3. Submit `https://mackeygrip.github.io/sitemap.xml` in the Sitemaps report.
4. Inspect the homepage URL and request indexing.
