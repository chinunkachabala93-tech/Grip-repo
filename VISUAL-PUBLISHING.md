# Publish the visual portfolio and service-page update

Use **Mac-Key-Grip-Visual-Portfolio-Update.zip** instead of the earlier SEO-only ZIP. This complete site package includes the new artwork, gallery, five project pages, two SEO service pages, original logo, original CAD exports and existing contact channels.

Upload the ZIP to the root of your `mackeygrip.github.io` repository in Codespaces. Run:

```bash
git switch main &&
git pull --ff-only origin main &&
unzip -o Mac-Key-Grip-Visual-Portfolio-Update.zip &&
git add index.html styles.css script.js drawings.css drawings.js services.css visuals.css visuals.html services projects assets tools README.md CREDITS.md SEO-PUBLISHING.md VISUAL-PUBLISHING.md sitemap.xml robots.txt .nojekyll &&
git commit -m "Publish polished CAD visuals and service pages" &&
git push origin main
```

The archive contains site files directly at its root. It does not delete files absent from the archive, so existing Google verification files remain in place. The commands stop if Git reports a problem; resolve that before continuing.

After GitHub Pages finishes deploying, check:

- https://mackeygrip.github.io/
- https://mackeygrip.github.io/visuals.html
- https://mackeygrip.github.io/projects/apartments-hvac.html
- https://mackeygrip.github.io/services/hvac-air-conditioning-design-zambia.html

On the gallery, open a cover, download a PNG and an SVG, and follow a link to the original CAD viewer. Keep the concept labels visible wherever you reuse the generated illustrations.

The sitemap remains https://mackeygrip.github.io/sitemap.xml and now contains nine pages. See SEO-PUBLISHING.md for the existing Search Console follow-up.

## Reuse the artwork

The separate **Mac-Key-Grip-Portfolio-Visuals.zip** contains the image collection and its guide. Share PNGs from `social/` on social media. Edit presentation titles and framing using the SVGs, or regenerate the set using `tools/build-portfolio-visuals.cjs` in the complete site package. SVGs contain raster drawing excerpts, not editable CAD geometry.
