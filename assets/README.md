# Portfolio media

## Current drawing sets

The ten PNGs in `assets/projects/` are unchanged copies of the drawings supplied for this portfolio. Five HTML pages in `projects/` group them by project. The duplicate office upload is included only once.

Full-sheet viewers retain the source title blocks and credits. The crop windows on the homepage and project pages use CSS to display selected areas of the original image without changing the file or inventing technical content.

## Replacing a drawing

1. Export the approved drawing from CAD. A vector PDF is best for fine annotation; a high-resolution PNG is useful for the web preview.
2. For larger sheets, aim for a PNG around 3500–5000 pixels wide if it remains a manageable download. Inspect the smallest labels at full size.
3. Replace the relevant file in `assets/projects/`, retaining its name if the layout is unchanged.
4. If the pixel dimensions change, update the HTML image width/height, the crop coordinates and the `1600` source-width value in `drawings.css` (or introduce a per-image source-width variable).
5. Update the page description only with confirmed scope, role and project information.
6. If a PDF becomes available, add a separate link labelled “Download drawing PDF”; do not label a PNG as a PDF.

## Adding another sheet

Add its PNG to `assets/projects/`. On the relevant project page:

- Add an option to `#sheet-select` with the image path and download filename.
- Add a matching direct link in `.sheet-files` so the sheet remains accessible without JavaScript.
- Update the sheet count on the project page and its homepage card.
- Preserve original authorship and issue information; use only materials approved for public portfolio use.

## Detail windows

`.drawing-window` uses four inline custom properties: `--crop-x`, `--crop-y`, `--crop-width` and `--crop-height`. Coordinates refer to the original 1600 × 1280 image. These windows are presentation crops only. The full original remains accessible in the viewer.

Reference photography is credited separately in `CREDITS.md`. The original Mac Key Grip logo is unchanged.
