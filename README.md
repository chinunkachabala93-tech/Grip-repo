# Mac Key Grip Engineering Portfolio

A polished, responsive engineering portfolio for **Chinunka Chabala** and **Mac Key Grip Engineering**, presenting capability across HVAC, mechanical and plumbing services, CAD design, data analysis, and supply-chain modelling.

## Portfolio areas

The drawing portfolio now contains **10 original PNG sheets across 5 project sets**:

| Project set | Sheets |
| --- | --- |
| 13 Miles building and site services | HVAC, internal water, sewer, external water, mechanical site |
| Ovacado Estate | Water/fire site plan; tank/filtration/pump details |
| Chililabombwe | Fuel-station mechanical site and details |
| Apartments | HVAC layout and schedules |
| Office | HVAC layout, schedules and details |

Each project page has a sheet selector, zoom controls, native touch/keyboard scrolling, source-image downloads and selected detail views. The original drawing credits are preserved. These are portfolio exports, not independently verified installation records.

- HVAC load estimation, equipment selection, ductwork, and ventilation layouts
- Water-supply and sewer reticulation design
- Fuel-station tank, pipework, offloading, and dispensing layouts
- Mechanical CAD modelling and construction documentation
- Excel dashboards, scenario analysis, and data cleaning
- EV battery and vehicle-assembly supply-chain modelling for Zambia

## Presentation artwork

The portfolio includes **13 polished visuals**: five project covers, two presentation boards, one annotated layout, three social graphics and two clearly labelled AI-generated concept illustrations. Open `visuals.html` to browse and download them. The original CAD exports and logo remain unchanged.

PNG files are ready to share; SVG files retain editable presentation text and framing around embedded raster drawings. WebP copies serve the website efficiently. See [the visual asset guide](assets/visuals/README.md) for dimensions, source records and rebuilding instructions.

For the complete visual and SEO update, use [VISUAL-PUBLISHING.md](VISUAL-PUBLISHING.md). This replaces the earlier SEO-only ZIP instructions.

## View locally

No build step or dependencies are required.

```bash
git clone https://github.com/mackeygrip/mackeygrip.github.io.git
cd mackeygrip.github.io
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
├── drawings.css        # Drawing cards, project pages and viewer styles
├── drawings.js         # Sheet selection, zoom and source-download links
├── projects/           # Five static drawing project pages
├── sitemap.xml         # Preferred public URL for search engines
├── robots.txt          # Crawler access and sitemap discovery
├── .nojekyll           # Serve the static site without Jekyll processing
├── assets/
│   ├── brand/          # Original MKG logo assets
│   ├── projects/       # Ten original CAD drawing exports
│   ├── visuals/        # Covers, boards, social graphics and concepts
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

## Activate contact channels

Open `script.js` and add the official links inside the `contactChannels` object. Use a full public profile URL for Instagram, Facebook and TikTok, `mailto:name@example.com` for email, and international number format for WhatsApp:

```js
whatsapp: { url: 'https://wa.me/260XXXXXXXXX', label: '+260 ...' },
email: { url: 'mailto:name@example.com', label: 'name@example.com' }
```

Channels without a URL remain visible but safely inactive, so no contact detail is invented.

You can also upload images directly on GitHub: open the target `assets/projects/...` folder, choose **Add file → Upload files**, select the image, and commit it to `main`. Then add its path to the relevant project card in `index.html`.

## Design principles

- Corporate industrial visual system, accessible and mobile-friendly
- Honest project descriptions without invented performance claims
- Easy to extend without a framework
- Printable project overview

## Contact

- **Website:** [mackeygrip.github.io](https://mackeygrip.github.io/)
- **Location:** Lusaka, Zambia

## License

Code is available under the [MIT License](LICENSE). Supplied project drawings retain their original ownership and are excluded from the code licence.

## Google indexing

The dedicated service pages in `services/` explain HVAC/air-conditioning design and mechanical/plumbing MEP coordination. They link to the real drawing portfolio and are listed in the sitemap. See [SEO-PUBLISHING.md](SEO-PUBLISHING.md) for the update commands and Search Console follow-up.

The public site is configured for `https://mackeygrip.github.io/` with canonical metadata, structured business data, `robots.txt`, and an XML sitemap. After publishing:

1. Add the URL-prefix property `https://mackeygrip.github.io/` in Google Search Console.
2. Verify ownership using Google's HTML-file method by adding the supplied verification file to the repository root.
3. Submit `https://mackeygrip.github.io/sitemap.xml` in the Sitemaps report.
4. Inspect the homepage URL and request indexing.
