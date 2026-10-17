# Image Squeeze

A browser-only image resizer and compressor with before/after size comparison and downloadable output.

## Run
Open `projects/image-squeeze/index.html` in a modern browser. No build step or backend is required.

## Features
- Open a local image
- Resize by maximum width
- Compress to JPEG or WebP
- Compare estimated file sizes and download the result

## Privacy
Images are processed in the browser with Canvas and are not uploaded.

## Limitations
JPEG conversion uses a white background for transparent images; output quality and browser codec support can vary.
