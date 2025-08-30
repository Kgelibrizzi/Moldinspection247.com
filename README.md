# Geriskmanagement Hugo website Based on the [Megakit Hugo Template](https://github.com/CloudCannon/megakit-hugo-template)

View the website on: [geriskmanagement.com](https://geriskmanagement.com)

## Features

* Contact form
* Pre-built pages
* Pre-styled components
* Configurable footer

## Editing

## Site-wide Configurations 
### Site title
You can set the site title in two places: 

1. File `data/meta.yml`
```
 title: GE Risk Management
```
2. File `config.toml`
```
title = "GE Risk Management"
```
`data/company.yml` is the main setting with `config.toml` as the fallback value incase `data/company.yml` is missing.

### Site Logo
Go to `data/company.yml` file and update the following values:

```
logo_dark: /images/logo.svg
logo_light: /images/logo.svg
```
### Navbar contacts(at the top)
Go to `data/company.yml` file and update the following values:

```
support:
  phone: "954-782-0472"
  phone_2: "941-228-5525"
  email: Kenneth@GERiskManagement.com
```

### Google Analytics
Go to `data/company.yml` file and add the property Measurement ID(G-XXXXXXXXXX) to the following line:

```
google_analytics_key: G-XXXXXXXXXX
```

Leave blank if you don't want to use Google Analytics.

### Navbar(and footer) Socials Media Links
Go to `data/company.yml` file and update the following values:

```
facebook: ""
twitter: ""
github: ""
pinterest: ""
```

### Navbar Links
Go to `data/nav.yml` and update the `name` and `url` values with your new information.

```
menu_items:
  - _id: link
    name: Mold Testing
    url: /mold-testing/
    open_in_new_tab: false
```

To use a dropdown navbar menu item, switch the `name` with the `label` property and then add `sub_menu_items` as shown below:

```
menu_items:
  - _id: link
    url: /industrial-hygiene/
    label: Industrial Hygiene
    sub_menu_items:
      - _id: sub_menu_link
        name: Noise Monitoring
        url: /industrial-hygiene/noise-monitoring/
        open_in_new_tab: false
      - _id: sub_menu_link
        name: Silica Compliance
        url: /industrial-hygiene/silica-compliance/
        open_in_new_tab: false
```

### Footer
#### Services Links
You can update the services listed in the footer by updating  the `data/footer.yml` file:
```
  - heading: Services
    items:
      - name: "Industrial Hygiene"
        url: "/industrial-hygiene/"
        open_in_new_tab: false
      - name: "Mold Testing"
        url: "/mold-testing/"
        open_in_new_tab: false
```

These services links are the same ones that have been used to create the list in the services pages.

### Images
Images are saved in the `/static/` folder.

### Content
Content is available in the `/content/` folder.

## Home Page
The home page content is inside the `content/_index.md` file. 

### Page Meta Title
```
title: "Certified Industrial Hygienist"
```

### Page Meta Description

```
seo:
  page_description: "CIH-led exposure and compliance services for Florida & beyond"
```

The homepage content can be edited through the front matter content due to existing components. You can view the components code inside the `/component-library/components/` folder.

### Home Page Heading H1
```
content_blocks:
  - _bookshop_name: big-hero
    heading: Full-Service OSHA, IH & Environmental Health Consulting — CIH-Led Since 2009
```




## Services Main Page and Sub-pages

#### Page Meta Title
```
title: Expert Witness – CIH Expert Testimony & Case Support
```

#### Page Meta Description
```
seo:
  page_description: "Accurate, professional mold and IAQ evaluations by a certified CIH"
```

### Layout
```
layout: services
```

### Service Page Heading H1
The heading `<h1>` is the `title` in the `hero`. The the `sub-title` is the `preheading`.
```
hero:
  title: "South Florida Mold Testing & ERMI Sampling"
  preheading: >-
      Accurate, professional mold and IAQ evaluations by a certified CIH
  background_image: 
```

### Service Page CTA

You can overide the global CTA values by adding the following to the individual service page and use your desired values.
```
cta_mini:
  enabled: true
  preheading: "Proven. Credentialed. Field-Tested."
  heading: "Speak with an experienced Certified Industrial Hygienist about Mold Testing"
  button:
    url: "/contact/"
    text: "Contact Us"
```

### Service Page Content
Put you content below the closing front tag.
```
---
title: Example #frontmatter
---

Your markdown content should be added here

```

## Developing

Megakit was built with [Hugo](https://gohugo.io/) version `0.87.0`. The current site is built with Hugo version `0.147.9`, but should support newer versions as well.

Run the standalone executable `hugo` to serve the site locally:

~~~bash
hugo server
~~~

## Publishing

Publish the site using the command:

```bash
hugo && npx -y pagefind --site public
```