# Mac Key Grip portfolio visuals

A charcoal, yellow and warm-paper presentation system using the original supplied logo.

| Folder | Artwork | Dimensions | Formats |
| --- | --- | --- | --- |
| covers/ | Five project covers | 1920 × 1200 | PNG, SVG; WebP at 1600 × 1000 |
| boards/ | HVAC board, water board, annotated HVAC layout | 2400 × 1600 | PNG, SVG; WebP at 1600 × 1067 |
| social/ | HVAC, water and fuel-infrastructure posts | 1080 × 1350 | PNG, SVG |
| concepts/ | HVAC ceiling and pumping/filtration illustrations | 1672 × 941 | PNG, WebP |

## Drawing work

Eleven artworks frame real drawing exports with presentation typography and selected detail crops. The embedded CAD linework is unchanged. Full original sheets remain in `assets/projects/` and the website project viewers, including original title blocks and credits.

The annotated HVAC board adds editorial numbered markers. These are presentation explanations, not equipment tags or construction instructions. Source PNGs are 1600 × 1280: larger output canvases do not recover missing fine-print detail. Higher-resolution exports can improve future versions without inventing drawing content.

SVG presentation text, framing and overlays are editable. The embedded drawings are raster images, not editable vector CAD geometry. Use PNG for sharing, WebP on the website and SVG to revise presentation styling.

## Concept imagery

The two concept illustrations were produced with the built-in image-generation tool. The HVAC image is a new illustrative scene. The water-treatment image uses the real drawing only as subject-matter reference. Neither is a site photograph, verified design or exact reconstruction. Keep the concept label and a clear caption when sharing.

`PROMPTS.json` records the exact generation prompts and reference use. `SOURCE-HASHES.json` records SHA-256 hashes of the ten unchanged drawing exports and unchanged original logo.

## Rebuild the CAD artwork

From the complete website repository, run:

```bash
node tools/build-portfolio-visuals.cjs
```

This optional generator requires Node.js and the `sharp` package. It resolves `sharp` from `CODEX_PRIMARY_RUNTIME_NODE_MODULES` when supplied, otherwise from the normal Node module path. It writes the eleven layouts and website copies, and converts the existing concept PNGs to WebP; it does not regenerate concept scenes. The website itself has no build dependencies.

Adjust crop rectangles, titles and presentation styling in the generator. Keep the source drawing PNGs and original logo intact. Preserve original ownership and attribution; publishing a portfolio excerpt does not establish sole authorship or a completed installation.
