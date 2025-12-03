# Image Organization and Usage Guide

## Directory Structure

### Conditions (11 images)
Medical conditions and symptoms:
- `acne.jpg` - Acne treatment visuals
- `acupuncture-knee-pain-halifax.jpeg` - Acupuncture for knee pain
- `eczema2.jpg` - Eczema condition examples
- `knee-injury1.jpg` - Knee injury illustrations
- `low-back-pain.jpeg` - Lower back pain visuals
- `migraine.jpeg` - Migraine/headache imagery
- `prolozone-knee-pain.jpeg` - Prolozone therapy for knee pain
- `tmj-pain-woman-holding-jaw.jpeg` - TMJ dysfunction imagery (OPTIMIZED)  
- `woman-fibromyalgia-pain.jpeg` - Fibromyalgia pain illustration (OPTIMIZED)
- `woman-pain-in-bed.jpeg` - General pain/discomfort imagery (OPTIMIZED)

### Treatments (6 images)
Medical treatments and therapies:
- `chelation-edta-lead.jpg` - Chelation therapy visuals
- `glutathione-iv.jpeg` - Glutathione IV therapy
- `IV-Chelation.jpg` - IV chelation treatment (OPTIMIZED)
- `IV-nutrient-therapy.jpeg` - IV nutrient therapy
- `Iv-therapy-treatment.jpeg` - General IV therapy
- `microcurrent-therapy.jpg` - Microcurrent therapy equipment

### Nutrition (7 images)
Food, supplements, and nutritional therapy:
- `bread.jpg` - Bread/grain products
- `clinical-nutrition-1.jpeg` - Clinical nutrition imagery
- `haddock.jpg` - Fish/protein sources
- `herbal-medicine-2.jpeg` - Herbal medicine preparations
- `nicotine-gum.png` - Smoking cessation aids
- `ozone-olive-oil.jpg` - Ozone therapy with olive oil
- `pour-oil.jpg` - Oil pouring/cooking imagery

### Anatomy (1 image)
Anatomical diagrams and medical illustrations:
- `TMJ-anatomical-diagram.jpeg` - TMJ joint anatomy diagram

### Charts (5 images)
Medical charts, graphs, and research visuals:
- `Fibromyalgia-pain-energy-graph-1.png` - Fibromyalgia pain/energy correlation
- `Fibromyalgia-quality-of-life-graph.png` - Quality of life improvements
- `harvard21.jpg` - Harvard research reference
- `methylation-mthfr-brain-mind.jpg` - MTHFR gene and methylation
- `vitamin-c-cancer-hydrogen-peroxide.png` - Vitamin C research chart

### General (4 images)
General purpose and background images:
- `hockey-player-performance.jpg` - Athletic performance imagery
- `home-background.webp` - Website background image
- `lead-paint.jpg` - Environmental health imagery
- `running-woman-athletic.jpeg` - Athletic/fitness imagery

## Optimization Summary

**Total Images:** 34
**Optimized Images:** 5 (saved ~1.6MB total)
**Average Size Reduction:** 85% for optimized images

### Optimized Files:
- `conditions/tmj-pain-woman-holding-jaw.jpeg`: 659K → 113K
- `conditions/woman-fibromyalgia-pain.jpeg`: 416K → 55K  
- `conditions/migraine.jpeg`: 413K → 65K
- `conditions/woman-pain-in-bed.jpeg`: 409K → 73K
- `treatments/IV-Chelation.jpg`: 408K → 123K

## Usage Guidelines

1. **File Paths:** All images are now accessible via `/images/{category}/{filename}`
2. **Responsive Images:** Consider using Astro's image optimization for different screen sizes
3. **Alt Text:** Ensure proper alt text for accessibility
4. **WebP Conversion:** Consider converting JPEGs to WebP for better compression
5. **Lazy Loading:** Implement lazy loading for images below the fold

## Legacy Path Mapping

For reference, original WordPress paths were:
`wp-content/uploads/{year}/{month}/{filename}` → `images/{category}/{filename}`