# Image Assets Directory & Photography Guide

This directory holds local photography and static graphics for the store.

## Recommended Aspect Ratios and Dimensions

1. **Hero Photography**
   - Aspect ratio: 16:9 or 21:9 ultra-wide
   - Resolution: 2400 × 1350px (minimum 1920 × 1080px)
   - Format: WebP or AVIF (quality 80)
   - Style: Sunlit architectural interiors, earthy sand/charcoal tones, warm golden hour natural light.

2. **Product Cards & Gallery Main**
   - Aspect ratio: 4:5 vertical crop (standard editorial)
   - Resolution: 1200 × 1500px (retina ready)
   - Format: WebP
   - Angles needed:
     - 01: Profile 3/4 stance
     - 02: Macro joinery detail (mortise & tenon)
     - 03: Grain macro / timber texture
     - 04: Lifestyle context / in residence

3. **Collection & Journal Cards**
   - Aspect ratio: 4:3 horizontal crop
   - Resolution: 1200 × 900px
   - Format: WebP

4. **Remote Image Configuration**
   - Remote domains are configured in `next.config.js` under `images.remotePatterns`.
   - Currently supports `lh3.googleusercontent.com` where high-res studio reference photography is hosted.
   - When deploying with Supabase Storage, AWS S3, or Cloudinary, add the respective hostname to `next.config.js`.
