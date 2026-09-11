Maharana Wellness Blog — WordPress Theme
==========================================

This theme matches the colors, fonts, and header/footer design of
drmaharanas.com, built for blog.drmaharanas.com.

HOW TO INSTALL
--------------
1. In WordPress admin: Appearance > Themes > Add New > Upload Theme.
2. Choose this zip file and click "Install Now", then "Activate".

RECOMMENDED SETUP AFTER ACTIVATING
-----------------------------------
1. Logo: Appearance > Customize > Site Identity > Logo — upload the real
   clinic logo. Until you do, the theme uses the same logo image already
   hosted for drmaharanas.com, so it works out of the box.

2. Header/Footer menus (optional): Appearance > Menus.
   - Create a menu, add links to Home / About / Services / Diseases /
     Blog / Testimonials / Contact, and assign it to "Primary Menu".
   - Create a second menu for the footer's "Company" column and assign
     it to "Footer Menu".
   - If you skip this, the theme already shows working links back to
     drmaharanas.com for every section, so nothing is broken by default —
     menus just let you edit those links yourself later without a
     developer.

3. Contact details & social links: Appearance > Customize > Clinic
   Contact & Social — edit phone, email, hours, and the four social
   media URLs (Instagram/Facebook/LinkedIn/YouTube) without touching
   any code.

4. Comments: Settings > Discussion — turn comments on/off, require
   approval, etc. The theme's comment form and comment list are already
   styled to match the site.

5. Featured images: when writing a post, set a "Featured Image" in the
   right-hand sidebar — this is what shows as the big image at the top
   of the post and in the blog list.

WHAT'S INCLUDED
----------------
style.css     - all colors, fonts, and layout (theme header comment is
                required by WordPress — do not remove the comment block
                at the top)
functions.php - theme setup, menus, customizer fields, comment styling,
                social share links, reading-time calculation
header.php    - site header (logo, nav, "Book Appointment" button)
footer.php    - site footer (contact info, social icons, link columns,
                disclaimer bar)
index.php     - blog listing page and category/tag/search archives
single.php    - single post page — large featured image, ~700px reading
                width, author box, social share buttons, prev/next post
                links, and the comments section
comments.php  - the comment list + comment form template
page.php      - template for static WordPress Pages
404.php       - "not found" page
js/navigation.js - mobile menu open/close toggle

NOTES
-----
- This is a classic PHP theme (not a block/FSE theme), matching the
  file list you asked for (style.css, index.php, single.php, header.php,
  footer.php, functions.php) plus a few small supporting files WordPress
  itself expects (comments.php, page.php, 404.php, navigation.js) so
  nothing looks broken on pages other than single posts.
- Fonts (Merriweather + Lato) and all colors are loaded from Google
  Fonts and CSS variables at the top of style.css — matching
  drmaharanas.com exactly. To adjust any color, search style.css for
  the `:root { ... }` block near the top.
