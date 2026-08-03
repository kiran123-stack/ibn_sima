# DESIGN.MD
# PART 1 — GLOBAL DESIGN SYSTEM
Version 1.0

---

# DESIGN PHILOSOPHY

This website should never feel like a traditional medical website. It should feel like a premium digital experience where every section naturally leads to the next. The user should never feel like they are jumping between unrelated blocks. Every section is visually connected through spacing, motion, color, typography, and image composition.

The design language is inspired by:

• Tripora → Storytelling, immersive scrolling, large compositions, emotional pacing.
• Aquvion → Premium enterprise layout, clean typography, generous whitespace.
• Lumea → Elegant GSAP motion, premium image treatment, modern interaction.

Do NOT copy these websites. Use them only as inspiration for rhythm, hierarchy, and motion.

The website must communicate:

Professional.
Premium.
Calm.
Human.
Trustworthy.
International.

Never corporate.
Never template.
Never flashy.
Never overloaded.

---

# VISUAL PERSONALITY

Think of the website like a luxury healthcare concierge.

Every section should breathe.

Users should feel calm.

Nothing should shout.

Everything should guide.

Animations should support the story, never become the story.

---

# DESIGN RHYTHM

The website follows this emotional flow.

Arrival

↓

Trust

↓

Authority

↓

Explanation

↓

Proof

↓

Confidence

↓

Action

Every section must naturally answer the next question in the visitor's mind.

Never feel random.

---

# GRID SYSTEM

Desktop Container

Maximum Width

1440px

Content Width

1280px

Reading Width

720px

Large Image Width

560px

Small Image Width

420px

Side Padding Desktop

80px

Side Padding Laptop

64px

Side Padding Tablet

40px

Side Padding Mobile

24px

Never allow content to stretch edge to edge.

Everything lives inside the same container.

Every section aligns to the exact same invisible grid.

---

# SPACING SYSTEM

Never use random spacing.

Only use this spacing scale.

8
16
24
32
40
48
64
80
96
120
144
192

Large Section

Padding Top

192px

Padding Bottom

192px

Normal Section

144px

Compact Section

96px

Hero

0px

Footer

120px

Never create custom spacing.

Everything follows this system.

---

# LAYOUT SYSTEM

Every section must follow one of these layouts.

Layout A

Text Left

Image Right

60 / 40

---

Layout B

Image Left

Text Right

40 / 60

---

Layout C

Centered

Maximum Width

900px

---

Layout D

Cards Grid

3 Columns

Desktop

2 Columns

Tablet

1 Column

Mobile

---

Layout E

Timeline

Alternating Blocks

Desktop

Single Column

Mobile

---

Rotate layouts.

Never repeat the same layout more than twice.

The website should gently alternate visual weight.

---

# BACKGROUND SYSTEM

The background should slowly evolve while scrolling.

Never alternate between completely different colors.

Instead create rhythm.

Example

Section 1

White

↓

Section 2

Very Light Grey

↓

Section 3

White

↓

Section 4

Soft Tint

↓

Section 5

White

↓

Section 6

Gradient Overlay

↓

Footer

Dark

The transition between backgrounds should feel invisible.

Never use hard breaks.

---

# COLOR SYSTEM

Primary

#097C87

Used for

Primary Buttons

Links

Icons

Accent Lines

Highlights

---

Secondary

#23CED9

Used for

Hover States

Cards

Interactive Elements

Gradients

---

Accent

#FCA47C

Used ONLY for

Small Highlight

Badge

Arrow

Notification

Icon Circle

Never use as large background.

---

Soft Highlight

#F9D779

Used for

Feature Background

Statistics

Soft Sections

Never use for text.

---

Surface

#A1CCA6

Used for

Cards

Illustrations

Background Layers

Not full page.

---

Neutrals

White

#FFFFFF

Light

#F8F9FA

Border

#E5E7EB

Text

#1A1A1A

Paragraph

#5B5B5B

Muted

#8A8A8A

---

# TYPOGRAPHY

Heading Font

Modern Sans

Very clean

Slightly condensed

Body

Readable

Friendly

No rounded fonts.

No decorative fonts.

---

H1

Maximum Width

780px

Maximum

3 Lines

Line Height

95%

Letter Spacing

-0.04em

---

H2

Maximum Width

640px

Maximum

2 Lines

---

Paragraph

Maximum Width

620px

Maximum

3–4 Lines

Never allow long walls of text.

---

Eyebrow Text

Uppercase

Small

Letter spacing

0.18em

Primary Color

Medium Weight

---

# IMAGE SYSTEM

Images are one of the most important design elements.

Never randomly place images.

Every image should feel professionally art directed.

Rules

Images always align to the same vertical grid.

Images never float randomly.

Images never touch text.

Minimum gap

64px

Image corners point toward content.

Faces always look toward text.

Never toward page edge.

Never crop eyes.

Never crop hands.

Avoid awkward body crops.

Medical equipment should never be cut in half.

Every image must have breathing room.

Images should feel premium.

Never use stock-photo layouts.

---

Hero Image

Occupies

58%

of hero width.

Extends slightly beyond content.

Bottom aligned.

Never centered.

---

Section Images

Rounded

32px

Soft shadow

Very subtle

No thick borders.

---

Cards Images

Aspect Ratio

4:5

---

Gallery

Aspect Ratio

3:2

---

Hospital Images

16:10

---

Icons

Contained inside

48x48

Soft colored background.

Never outline icons.

---

# BORDER RADIUS

Buttons

18px

Cards

28px

Images

32px

Large Containers

36px

Badges

999px

Keep radius consistent.

---

# SHADOW SYSTEM

Never use heavy shadows.

Only soft elevation.

Cards

0 20px 60px rgba(0,0,0,.06)

Hover

0 28px 80px rgba(0,0,0,.09)

Buttons

Very subtle.

Images

Almost invisible.

The website should feel light.

---

# BUTTON DESIGN

Height

56px

Horizontal Padding

32px

Rounded

18px

Gap Between Icon

12px

Primary Button

Filled

Primary Color

White Text

Secondary Button

Outline

Primary Border

White Background

Hover

Lift

4px

Shadow increases

Background slightly brighter

Duration

0.35s

Never animate color only.

Always combine

Lift

+

Shadow

+

Color

---

# CARD DESIGN

Every card shares the same DNA.

Padding

32px

Radius

28px

Soft Shadow

White Background

Hover

Translate Y

-8px

Scale

1.02

Shadow increases

Duration

0.45s

Cards should feel alive.

---

# SECTION CONNECTION

Never hard cut between sections.

The next section should begin appearing before the previous one emotionally finishes.

Images can overlap backgrounds.

Backgrounds can softly blend.

Spacing remains consistent.

The eye should naturally continue downward.

Think like reading a story.

Not browsing boxes.

---

# ANIMATION PHILOSOPHY

Animation should never exist to impress.

Animation exists to guide attention.

Every movement should answer

"What should the user look at next?"

Never animate everything.

Animate only the important thing.

---

# GSAP SYSTEM

Use

Lenis

+

GSAP

+

ScrollTrigger

Only.

No AOS.

No CSS reveal libraries.

No bounce animations.

Allowed Easings

Power2.out

Power3.out

Power4.out

Expo.out

Never Elastic.

Never Bounce.

Never Back.

---

Animation Timing

Fast

0.6s

Normal

0.9s

Premium

1.2s

Large

1.6s

---

Heading Reveal

Opacity

0 → 1

Y

48 → 0

Duration

1.2s

---

Paragraph

Starts

140ms later

---

Buttons

220ms later

---

Image

320ms later

---

Cards

80ms stagger

---

# SCROLL EXPERIENCE

Lenis smooth scroll.

Sections slightly overlap visually.

Images translate slower than text.

Large visuals have subtle parallax.

Nothing should move excessively.

Scrolling should feel expensive.

---

# MICRO INTERACTIONS

Buttons

Lift

Cards

Lift

Images

Slow zoom

Icons

Rotate 6°

Arrow

Translate 6px

Navigation

Soft blur

Logo

Tiny scale

Links

Underline grows from left.

Never flashy.

---

# RESPONSIVE PHILOSOPHY

Never redesign.

Only rearrange.

Desktop

3 Columns

↓

Tablet

2 Columns

↓

Mobile

1 Column

Spacing scales down.

Design language stays identical.

---

# DEVELOPER RULES

If a component is not explicitly defined,

reuse the previous component.

Never invent a new button.

Never invent a new card.

Never invent a new shadow.

Never invent spacing.

Never invent border radius.

Every new section must feel like it already belonged to the website.

The user should never notice where one page ends and another begins.

The entire experience should feel like one carefully choreographed journey rather than a collection of independent sections.

End of Global Design System.

```md
# PAGE 01 — HOME PAGE
Reference Inspiration

Hero Experience → Tripora
Navigation → Aquvion
Cards → Aquvion
Scrolling Rhythm → Tripora
Premium Motion → Lumea

The homepage is the emotional foundation of the website.

Its only objective is to make a visitor think

"I trust these people enough to continue."

Never overload the homepage.

Every section has one purpose.

The homepage should feel like a conversation.

It should slowly answer questions instead of throwing information immediately.

---

# PAGE STRUCTURE

Navigation

↓

Hero

↓

Trust Strip

↓

About Preview

↓

Why Choose Us

↓

Medical Specialties Preview

↓

Journey Timeline

↓

Hospital & Doctor Preview

↓

Testimonials

↓

Countries We Serve

↓

FAQ Preview

↓

Final CTA

↓

Footer

Never change this order.

---

# NAVIGATION

Height

88px

Floating navigation.

Not attached to browser edge.

Top Margin

24px

Left Right Margin

40px

Width

calc(100% - 80px)

Maximum Width

1360px

Centered.

Background

rgba(255,255,255,.78)

Blur

20px

Border

1px solid rgba(255,255,255,.45)

Radius

999px

Shadow

Very Soft

Logo

Left

Navigation

Center

CTA Button

Right

Navigation Items

Maximum 6.

Gap

40px

Hover

Underline grows left to right.

Logo

Never larger than

170px

CTA Button

Height

48px

Padding

28px

Never use hamburger until tablet.

Navigation appears from top.

Y

-60

to

0

Opacity

0

to

1

Duration

1.2s

---

# HERO SECTION

Height

100vh

Minimum Height

850px

Maximum

980px

Never shorter.

Background

White

Very soft gradient from top right.

Hero Layout

Left

42%

Right

58%

The hero is NOT centered.

Everything aligns to content grid.

---

LEFT SIDE

Eyebrow

Small.

Uppercase.

Primary Color.

Gap

24px

↓

Heading

Maximum Width

620px

Maximum

3 lines.

↓

Paragraph

Maximum Width

560px

Maximum

3 lines.

↓

CTA Row

Primary Button

Secondary Button

Gap

20px

↓

Small Trust Row

Hospital Count

Countries

Years Experience

Shown as inline items.

Small icons.

Gap

32px

Never use big counters.

---

RIGHT SIDE

Large premium medical image.

Image should extend outside container by approximately 60px.

Bottom aligned.

Never vertically centered.

The doctor should look toward the heading.

Never toward page edge.

Image Height

Approximately

760px

Width

Auto

Rounded

40px

Soft Shadow

Background behind image

Large organic blob.

Using

#23CED9

Opacity

8%

Second blob

#F9D779

Opacity

10%

Very blurred.

These blobs slowly move on scroll.

---

HERO DECORATION

Very subtle.

Never clutter.

One thin curved line connecting left content to image.

Small floating medical cross.

Tiny dotted pattern.

Opacity below 8%.

---

HERO ANIMATION

Page Load

Navigation

↓

Eyebrow

↓

Heading

↓

Paragraph

↓

Buttons

↓

Trust Row

↓

Hero Image

Everything staggered.

Heading

Power4.out

Image

Slides

80px

Right → Left

Scale

1.08

→

1

Duration

1.5s

Blob

Very slow floating animation.

Never stop.

Duration

12s

Loop.

---

SCROLL TO NEXT

Bottom center.

Small arrow.

Animated.

Moves

8px

up and down.

Very subtle.

---

TRUST STRIP

Immediately below hero.

Negative margin

-60px

Appears attached to hero.

Container Width

1180px

Centered.

Height

120px

White.

Radius

32px

Shadow

Soft.

Layout

5 Equal Columns

Hospital Network

Countries

Patient Support

Medical Coordination

24/7 Assistance

Icons

Top

Text

Bottom

Hover

Card lifts

4px

No counters.

No huge numbers.

---

ABOUT PREVIEW

Background

White

Padding

192px

Layout

Image Left

40%

Text Right

60%

Image

Large portrait.

Rounded

36px

One small floating image overlapping lower corner.

Like editorial magazine layout.

Never perfectly symmetrical.

Image Height

620px

Text Width

560px

Button

Aligned with text.

Animation

Image reveals using clip-path.

Text fades upward.

Image begins revealing before text finishes.

---

WHY CHOOSE US

Background

Very Light Grey

Cards

3 Columns

Desktop

2

Tablet

1

Mobile

Each Card

White

Padding

36px

Radius

30px

Icon

Top Left

Large.

Headline

Below.

Description

Below.

Cards alternate slight vertical offsets.

Middle card

24px lower.

Creates visual rhythm.

Hover

Lift

10px

Icon rotates

5°

Shadow increases.

---

MEDICAL SPECIALTIES PREVIEW

Background

White

Section Width

1280px

Heading centered.

Cards

Horizontal.

4 visible.

Image Top.

Title Bottom.

Aspect Ratio

4:5

Rounded

32px

Hover

Image zoom

1.08

Card lifts

8px

When scrolling

Cards appear one after another.

80ms stagger.

CTA below

Centered.

---

PATIENT JOURNEY

Background

Soft gradient.

White

↓

Very Light Blue

Vertical Timeline.

Line begins invisible.

Draws itself while scrolling.

Each step

Alternates

Left

Right

Desktop

Single column

Mobile.

Timeline Dot

Primary Color.

Grows when active.

Cards

White.

Rounded

28px

Padding

32px

Never use arrows.

Connection line is enough.

---

HOSPITAL PREVIEW

Background

White

Heading

Left

Button

Right

Horizontal scrolling cards.

Desktop

3.2 cards visible.

Cards snap while scrolling.

Large Image

Top.

Hospital Name

Bottom.

Tiny badge.

Never too much information.

Scroll controlled using GSAP.

Not browser scrollbar.

---

TESTIMONIALS

Background

Very Light Grey

Large quotation mark.

Opacity

5%

Behind content.

Centered.

One featured testimonial.

Large image.

Customer card.

Quotation.

Navigation arrows.

Cards fade.

Never slide aggressively.

Very calm.

---

COUNTRIES

Background

White

Three equal cards.

Iraq

UAE

India

Each card

Uses subtle outline map.

Small flag.

Soft gradient.

Hover

Map scales.

Card lifts.

Tiny glow.

---

FAQ PREVIEW

Background

White

Centered.

Width

900px

Accordion.

One open.

Others closed.

Animation

Height auto.

Opacity fade.

Arrow rotates

180°

Gap

20px

Between items.

---

FINAL CTA

This is the emotional ending.

Full width.

Background

Primary Color

Soft gradient.

Padding

160px

Rounded Top Corners

64px

Large heading.

Centered.

One primary button.

Very large whitespace.

No image.

Very subtle animated particles.

Opacity below

5%.

CTA fades in while previous section still visible.

Creates visual continuity.

---

FOOTER

Dark background.

Padding

120px

Rounded top

48px

Four columns.

Logo larger than other pages.

Social icons

Bottom.

Hover

Translate

4px

Never colorful.

Use monochrome icons.

---

SCROLL STORY

Hero moves slower than scroll.

Trust strip slightly parallax.

About image translates upward.

Cards stagger.

Timeline draws itself.

Hospital cards slide horizontally.

Testimonials fade.

CTA expands slightly.

Footer appears naturally.

Every section starts before previous completely disappears.

Never hard cuts.

---

HOME PAGE DESIGN RULES

Never place two white card sections consecutively without changing background tone.

Never repeat identical layouts more than twice.

Every image must face inward toward content.

Alternate image position throughout the page to create rhythm.

Maintain a consistent vertical spacing of 144–192px between major sections.

Every hover interaction should feel subtle and premium.

Avoid unnecessary animations; each motion must direct attention or reinforce hierarchy.

The homepage should leave the user with the feeling that they have been guided through a story, not a landing page.
```
```md
# PAGE 02 — ABOUT

Purpose

Build trust by showing the company behind the service, not just the services.

Reference

Layout → Tripora

Typography → Aquvion

Image Treatment → Lumea

---

# PAGE STRUCTURE

Hero (Short)

↓

Our Story

↓

Mission & Vision

↓

Core Values

↓

Global Presence

↓

Why We Started

↓

CTA

---

# HERO

Height

55vh

Left aligned content.

Background remains white.

Large breadcrumb above heading.

Small supporting illustration on right (30% width).

---

# OUR STORY

Layout

40 / 60

Large portrait image left.

Text right.

Image slightly overlaps next section by 40px.

Use one floating accent card on image.

Animation

Image reveals with clip-path.

Text fades up.

---

# MISSION & VISION

Two equal cards.

50 / 50

Large icon on top.

Minimal text.

Background

Very light grey.

Cards hover 6px.

---

# CORE VALUES

4 Cards

Desktop

2x2 Grid

Tablet

2 Columns

Mobile

1 Column

Each card

Icon

Title

Description

White background.

No images.

Cards stagger on scroll.

---

# GLOBAL PRESENCE

Interactive map style section.

Center map illustration.

Country markers animate in.

Three floating location cards.

Do not use Google Maps.

Keep it clean.

---

# WHY WE STARTED

Editorial layout.

Large image right.

Text left.

Background

White.

Image extends outside container by 50px.

Quote block below text with accent color border.

---

# CTA

Full width.

Primary background.

Centered heading.

Single CTA button.

Very minimal.

---

# PAGE DIFFERENCE FROM HOME

• Hero reduced to 55vh.
• No trust strip.
• More editorial layouts.
• Less cards, more storytelling.
• Image-driven page.
• Softer animations.
• No horizontal scrolling.
• End with simple CTA.
```
# PAGE 03 — WHY CHOOSE IBN SINA

Purpose

Increase confidence before users explore treatments.

Reference

Layout → Aquvion
Section Flow → Tripora

---

# PAGE STRUCTURE

Hero

↓

Why Different

↓

Comparison Section

↓

Support Timeline

↓

Trust Metrics

↓

CTA

---

# HERO

Same as About Page.

Replace illustration with premium healthcare support image.

---

# WHY DIFFERENT

Layout

3 Feature Blocks

Instead of cards, use alternating split layout.

Block 1

Image Left

Text Right

Block 2

Image Right

Text Left

Block 3

Image Left

Text Right

Large whitespace between blocks.

Images use portrait ratio (4:5).

Animation

Same image reveal as Home.

---

# COMPARISON SECTION

Two-column comparison.

Left

Traditional Medical Travel

Right

IBN Sina Experience

Both inside premium cards.

Center vertical divider.

Hover highlights only the active side.

Desktop

2 Columns

Mobile

Stack vertically.

---

# SUPPORT TIMELINE

Do NOT use Home timeline.

Instead use horizontal process cards.

Desktop

5 equal cards connected by one thin animated line.

Tablet

Horizontal scroll.

Mobile

Vertical stack.

Cards activate one by one while scrolling.

---

# TRUST METRICS

Replace Home trust strip.

Use 4 large statistic cards.

2 × 2 grid.

Large number.

Small supporting text.

Soft gradient background.

Counter animation starts only once.

---

# CTA

Same as Home.
# PAGE 05 — WHY INDIA

Purpose

Build confidence in India as the treatment destination before users decide to contact.

Reference

Layout → Tripora

Typography → Aquvion

Visual Style → Lumea

---

# PAGE STRUCTURE

Hero

↓

Reasons Grid

↓

Healthcare Standards

↓

Hospital Experience

↓

Interactive India Map

↓

Final CTA

---

# HERO

Same as About Page.

Use premium aerial city/hospital image.

---

# REASONS GRID

Desktop

2 × 3 Grid

Tablet

2 Columns

Mobile

1 Column

Cards use icon-first layout.

Alternate background tint every second card.

Hover same as Home cards.

---

# HEALTHCARE STANDARDS

Use Home About split layout.

Large image.

Content opposite.

Image slightly overlaps section.

Replace normal image with premium hospital interior.

---

# HOSPITAL EXPERIENCE

Editorial layout.

Full-width background image.

Floating glass content card.

Content card aligned left.

Image remains fixed while scrolling (subtle parallax).

---

# INDIA MAP

Full-width section.

Large illustrated India map.

Hospital locations animate one after another.

Small floating city cards connected using thin curved lines.

Desktop

Map centered.

Mobile

Map on top.

Cards below.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• More visual than text.
• Uses map as hero element of page.
• One full-width image section.
• No timeline.
• No testimonials.
• Strong destination storytelling.


# PAGE 05 — WHY INDIA

Purpose

Convince visitors that India is the right destination while reinforcing that IBN Sina helps them choose the right hospital.

Reference

Layout → Tripora
Cards → Aquvion

---

# PAGE STRUCTURE

Hero

↓

Reasons Grid (6 reasons from PDF)

↓

Hospital Selection Section

↓

CTA

---

# HERO

Same as About Page.

Background image shows modern Indian hospital skyline.

---

# REASONS GRID

6 reasons exactly as defined in PDF.

Desktop

3 × 2 Grid.

Tablet

2 Columns.

Mobile

1 Column.

Each reason is an icon card.

Cards connected using a subtle vertical reading rhythm.

Alternate every second card with a soft tinted background.

No images inside cards.

Hover same as Home.

---

# HOSPITAL SELECTION

Split layout.

Left

Content.

Right

Large premium hospital image.

Image overlaps section by 60px.

Use same split layout from Home About section.

At bottom add one highlighted quote box.

This section visually separates itself using a very light background tint.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Only 2 major content sections.
• Card-driven page.
• No timeline.
• No sliders.
• No testimonials.
• Ends immediately with CTA.

# PAGE 06 — MEDICAL TOURISM PROCESS

Purpose

Make the journey feel simple, transparent and stress-free.

Reference

Story Flow → Tripora

Cards → Aquvion

Motion → Lumea

Source Sections

01 Start Conversation

02 Share Medical Records

03 Case Review

04 Specialist Coordination

05 Medical Opinion

06 Treatment Planning

07 Prepare for India

08 Arrive in India

09 Treatment

10 Follow-Up :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

10-Step Journey

↓

Closing Statement

↓

CTA

---

# HERO

Same as About Page.

Use airport + hospital journey style visual instead of doctor portrait.

Small floating travel elements (passport, airplane route, medical file) connected with thin curved line.

---

# 10-STEP JOURNEY

This is the hero section of the page.

Do NOT use cards in a simple grid.

Design as a premium vertical journey.

Desktop

Timeline centered.

Cards alternate

Left

↓

Right

↓

Left

↓

Right

↓

Continue until Step 10.

Tablet

Timeline remains center.

Cards slightly narrower.

Mobile

Single vertical timeline.

Cards stacked.

---

# TIMELINE DESIGN

Thin primary color line.

Animated while scrolling.

Each step connected with numbered circle.

Circle fills when section becomes active.

Each card slightly overlaps timeline.

---

# STEP CARD

Image/Icon Area

20%

Content Area

80%

Large step number.

Soft icon.

Small connector arrow toward next step.

Cards alternate background tint every second step.

Odd

White

Even

Very light grey.

Hover

Lift only.

No rotation.

---

# VISUAL CONNECTORS

Instead of straight lines between cards,

use soft curved SVG path.

Animation

Path draws itself as user scrolls.

The next step fades in before previous leaves viewport.

Journey should feel continuous.

---

# CLOSING STATEMENT

Full-width centered block.

Maximum width

900px.

Background

Very light tint.

Rounded container.

Large reassuring illustration on one side.

No cards.

No statistics.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Long storytelling page.
• One continuous scroll experience.
• Timeline is the main visual element.
• Minimal images.
• Focus on guiding users through the exact 10-step process from the content document.

# PAGE 07 — PATIENT SERVICES

Purpose

Show everything IBN Sina manages around the treatment journey, making the visitor feel supported before, during, and after treatment.

Reference

Layout → Aquvion

Story Flow → Tripora

Motion → Lumea

Source Sections

Before Treatment

During Your Stay

After Treatment :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Before Treatment

↓

During Your Stay

↓

After Treatment

↓

Support Promise

↓

CTA

---

# HERO

Same as About Page.

Replace doctor image with a premium patient coordinator helping an international family.

---

# BEFORE TREATMENT

Large horizontal split section.

Left

Large illustration/image.

Right

Service list.

Instead of cards, each service appears as a checklist item inside one premium container.

Image occupies 45%.

Content 55%.

---

# DURING YOUR STAY

Reverse previous layout.

Image Right.

Content Left.

Background changes to very light grey.

Image should feel warmer and more human.

Floating small support cards overlap image.

---

# AFTER TREATMENT

Return to original layout.

Image Left.

Content Right.

Same layout as first section.

Instead of repeating card style, use numbered service list with vertical connector line.

---

# SUPPORT PROMISE

Full-width premium card.

Centered.

Three small support pillars arranged horizontally.

Desktop

3 Columns.

Tablet

2 Columns.

Mobile

1 Column.

Background

Primary color at very low opacity.

Rounded

40px.

No icons larger than 40px.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Three large alternating split layouts only.
• No grids.
• No timeline.
• No sliders.
• Focus on human support rather than medical treatment.
• Every section alternates image position to create rhythm.
• Floating support cards appear only in the middle section to avoid repetition.

# PAGE 08 — MEDICAL SECOND OPINION

Purpose

Reduce hesitation by making the second opinion process feel simple, trustworthy, and professional.

Reference

Layout → Tripora

Cards → Aquvion

Interaction → Lumea

Source Sections

Introduction

↓

Process

↓

Important Notice :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Introduction

↓

5-Step Process

↓

Important Notice

↓

CTA

---

# HERO

Same as About Page.

Replace image with doctor reviewing digital medical reports.

Background uses subtle medical document pattern (very low opacity).

---

# INTRODUCTION

Split layout.

40 / 60.

Large image on left.

Content on right.

Image overlaps section below by 40px.

Small floating medical report card.

---

# 5-STEP PROCESS

This is the primary section.

Instead of timeline, create a horizontal connected process.

Desktop

5 equal cards.

Tablet

Horizontal scroll with snap.

Mobile

Vertical stack.

Cards connected with one curved animated SVG line.

Each card contains

Large step number.

Minimal icon.

Short description.

Cards animate one after another while scrolling.

---

# IMPORTANT NOTICE

Premium highlighted information block.

Maximum Width

1000px.

Centered.

Background

Very light amber tint.

Thin left accent border using Accent Color.

Include small shield icon.

No image.

No cards.

This section should immediately draw attention without feeling alarming.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Only one image section.
• Main focus is the connected 5-step process.
• Important Notice becomes the visual highlight.
• No statistics.
• No testimonials.
• No FAQ.
• Ends directly with CTA.

# PAGE 09 — COUNTRIES WE SERVE

Purpose

Show that IBN Sina operates across Iraq, UAE, and India, making the international healthcare journey feel seamless.

Reference

Layout → Tripora

Cards → Aquvion

Motion → Lumea

Source Sections

Iraq

↓

UAE

↓

India

↓

Healthcare Connection Diagram :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Three Country Sections

↓

Healthcare Connection

↓

CTA

---

# HERO

Same as About Page.

Use premium world map illustration with travel route.

---

# THREE COUNTRY SECTIONS

Instead of three identical cards, make each country its own horizontal storytelling block.

Desktop

Alternating Split Layout

Section 1

Image Left

Content Right

Section 2

Content Left

Image Right

Section 3

Image Left

Content Right

Tablet

Same layout with reduced image width.

Mobile

Stack image above content.

Each country uses its own subtle accent color overlay.

Iraq

Warm Sand Tint

UAE

Soft Cyan Tint

India

Light Green Tint

Do not change overall brand colors.

Only use subtle overlays.

Each image should represent local culture without feeling like tourism photography.

---

# HEALTHCARE CONNECTION

This is the hero section of the page.

Instead of showing

Iraq

↓

IBN Sina

↓

India

as plain text,

design it as a connected journey.

Desktop

Three premium circular nodes.

Country

↓

IBN Sina

↓

India

Connected using one animated curved SVG path.

The path draws itself while scrolling.

Center node (IBN Sina)

Largest circle.

Primary color.

Outer nodes

Smaller.

White cards.

Soft shadow.

Hover

Circle slightly enlarges.

Connection line glows subtly.

Mobile

Vertical journey.

Country

↓

IBN Sina

↓

India

Connected using one vertical animated line.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• No grids.
• Three editorial country sections.
• Main visual is the international connection diagram.
• Very little animation.
• Focus on international trust and journey rather than medical information.
• Ends directly with CTA.

# PAGE 10 — HOSPITALS & DOCTORS

Purpose

Help visitors understand that IBN Sina helps them find the right hospital and specialist—not promote one hospital over another.

Reference

Layout → Aquvion

Storytelling → Tripora

Motion → Lumea

Source Sections

The Right Doctor Matters

↓

Hospital & Specialist Categories

↓

Patient-First Selection Message :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Hospital Categories

↓

Specialist Categories

↓

Patient-First Philosophy

↓

CTA

---

# HERO

Same as About Page.

Replace hero image with premium hospital consultation scene.

---

# HOSPITAL CATEGORIES

Do NOT display hospital logos.

Use premium category cards instead.

Desktop

2 × 3 Grid.

Tablet

2 Columns.

Mobile

1 Column.

Each card contains

• Large hospital image
• Small category icon
• Content

Images occupy approximately 65% of card height.

Cards should feel like premium destinations rather than service cards.

---

# SPECIALIST CATEGORIES

Editorial layout.

Large image on one side.

Specialty list on opposite side.

Instead of plain bullet points,

display each specialty as a small horizontal chip.

Desktop

Wrap naturally.

Mobile

Stack vertically.

Hover

Chip slightly fills with Primary color.

---

# PATIENT-FIRST PHILOSOPHY

This becomes the emotional ending.

Large centered premium container.

Maximum Width

1000px.

Background

Very light grey.

Large quotation mark in background.

Very low opacity.

Center aligned.

One highlighted sentence receives Accent Color underline.

No illustrations.

No icons.

Minimal design.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Premium hospital category cards instead of service cards.
• Specialist chips instead of icon lists.
• Strong editorial ending.
• No timeline.
• No statistics.
• No testimonials.
• Cleanest page in the website.


# PAGE 11 — FAQ

Purpose

Answer common concerns while reducing friction before the user contacts IBN Sina.

Reference

Layout → Aquvion

Interaction → Lumea

Source Sections

All FAQs from the content document. :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Quick Help Navigation

↓

FAQ Categories

↓

Still Have Questions

↓

CTA

---

# HERO

Same as About Page.

Replace image with patient coordinator answering a family.

---

# QUICK HELP NAVIGATION

Sticky horizontal filter bar.

Desktop

Centered.

Tablet

Horizontal scroll.

Mobile

Horizontal chips.

Each category displayed as rounded pills.

Active pill

Primary background.

Inactive

Light grey.

Smooth sliding indicator.

---

# FAQ CATEGORIES

Do NOT show all FAQs in one long accordion.

Group FAQs into categories.

Desktop

Two-column layout.

Left

Sticky category navigation.

Right

Accordion content.

Tablet & Mobile

Single column.

Accordion only.

Accordion Design

• White premium cards.
• Radius same as Global Design.
• 20px gap between items.
• One item open by default.
• Opening one automatically closes the previous one.
• Height animation with smooth easing.
• Arrow rotates 180°.
• Thin divider appears during expansion.

---

# STILL HAVE QUESTIONS

Centered support card.

Maximum Width

900px.

Soft primary tint background.

One illustration.

One secondary button leading to Contact.

No extra information.

Keep plenty of whitespace.

---

# CTA

Same as Home.

---

# PAGE DIFFERENCE

• Only page with sticky FAQ navigation.
• Uses categorized accordion instead of one long list.
• No large images except Hero.
• No timelines.
• No statistics.
• Focus entirely on readability and quick answers.

# PAGE 12 — CONTACT

Purpose

This page should remove every remaining barrier before the visitor submits an enquiry. It should feel personal, premium, and reassuring rather than like a typical contact form.

Reference

Layout → Tripora

Form Design → Aquvion

Motion → Lumea

Source Sections

Introduction

↓

Contact Form

↓

Medical Report Upload

↓

Coordinator CTA :contentReference[oaicite:0]{index=0}

---

# PAGE STRUCTURE

Hero

↓

Contact Options

↓

Medical Enquiry Form

↓

Medical Report Upload

↓

Coordinator Card

↓

Map & Office Presence

↓

Final CTA

---

# HERO

Same as About Page.

Hero image shows a patient coordinator welcoming an international family.

Keep the hero calm and spacious.

---

# CONTACT OPTIONS

Place three premium cards horizontally.

Desktop

3 Columns

Tablet

2 Columns

Mobile

1 Column

Each card represents one communication method.

Cards are equal height.

Large icon at top.

Primary action button inside each card.

Cards lift slightly on hover.

---

# MEDICAL ENQUIRY FORM

This is the primary section.

Desktop

45 / 55 Split Layout.

Left

Introduction.

Process reminder.

Trust indicators.

Right

Large premium form.

The form container should feel like a floating card.

Padding

48px

Radius

36px

Soft shadow.

Every input has generous spacing.

Input Height

60px

Textarea

180px

Labels remain outside the input.

Never use floating labels.

Required fields marked with small accent dot.

---

# MEDICAL REPORT UPLOAD

Instead of a standard upload field,

create a premium upload area.

Large dashed rounded container.

Centered upload illustration.

Supported file icons displayed below.

Drag & Drop animation.

Border glows slightly while dragging files.

Upload success displays a small completed card.

---

# COORDINATOR CARD

Full-width premium card.

Coordinator photo on left.

Content on right.

Desktop

35 / 65

Mobile

Photo above content.

Background uses very soft primary tint.

Include one quick contact button.

This section should feel warm and human.

---

# MAP & OFFICE PRESENCE

Do not use an embedded Google Map.

Instead,

use a custom illustrated regional map showing

Iraq

↓

UAE

↓

India

with IBN Sina offices highlighted.

Below the map,

display office location cards.

Desktop

3 Columns

Tablet

2 Columns

Mobile

1 Column

Cards remain minimal.

---

# FINAL CTA

Same as Home.

---

# PAGE DIFFERENCE

• Largest form on the website.
• Premium drag-and-drop upload experience.
• Human-focused coordinator section.
• Custom illustrated regional map instead of Google Maps.
• Contact methods shown before the form.
• Ends with one strong CTA and clean footer.


# Images
[https://unsplash.com/photos/premium-doctor-consultation-natural-light] - Home Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/patient-coordinator-warm-editorial-portrait] - Home Page, About Preview[cite: 1, 2]

[https://unsplash.com/photos/modern-hospital-exterior-bright-daylight] - Home Page, Medical Specialties Card 1[cite: 1, 2]

[https://unsplash.com/photos/luxury-recovery-room-wood-interiors] - Home Page, Medical Specialties Card 2[cite: 1, 2]

[https://unsplash.com/photos/international-family-bright-hospital-lobby] - Home Page, Medical Specialties Card 3[cite: 1, 2]

[https://unsplash.com/photos/teal-beige-comfortable-consultation-room] - Home Page, Medical Specialties Card 4[cite: 1, 2]

[https://unsplash.com/photos/aerial-view-premium-healthcare-facility] - Home Page, Hospital & Doctor Preview[cite: 1, 2]

[https://unsplash.com/photos/smiling-middle-eastern-patient-premium-lounge] - Home Page, Testimonials[cite: 1, 2]

[https://unsplash.com/photos/coordinator-desk-light-wood-teal-accents] - About Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/warm-handshake-coordinator-family-natural-light] - About Page, Our Story (Main Image)[cite: 1, 2]

[https://unsplash.com/photos/close-up-smiling-eyes-warm-expression] - About Page, Our Story (Floating Card)[cite: 1, 2]

[https://unsplash.com/photos/soft-sunlight-modern-hospital-windows] - About Page, Mission & Vision[cite: 1, 2]

[https://unsplash.com/photos/editorial-shot-founders-bright-modern-office] - About Page, Why We Started[cite: 1, 2]

[https://unsplash.com/photos/premium-healthcare-staff-guiding-guest] - Why Choose IBN Sina Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/concierge-welcome-desk-luxury-hospitality] - Why Choose IBN Sina Page, Why Different Block 1[cite: 1, 2]

[https://unsplash.com/photos/patient-relaxing-tea-beige-teal-suite] - Why Choose IBN Sina Page, Why Different Block 2[cite: 1, 2]

[https://unsplash.com/photos/doctor-international-patient-calm-conversation] - Why Choose IBN Sina Page, Why Different Block 3[cite: 1, 2]

[https://unsplash.com/photos/bright-minimal-consultation-room-sunlight] - Medical Treatments Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/doctor-gently-holding-patient-hand-warm-light] - Medical Treatments Page, Cardiology Card[cite: 1, 2]

[https://unsplash.com/photos/peaceful-garden-view-modern-hospital-room] - Medical Treatments Page, Oncology Card[cite: 1, 2]

[https://unsplash.com/photos/high-end-medical-office-wood-paneling] - Medical Treatments Page, Neurology Card[cite: 1, 2]

[https://unsplash.com/photos/patient-walking-confidently-bright-corridor] - Medical Treatments Page, Orthopaedics Card[cite: 1, 2]

[https://unsplash.com/photos/premium-aerial-indian-hospital-skyline-bright] - Why India Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/luxury-hospital-interior-glass-walls-plants] - Why India Page, Healthcare Standards[cite: 1, 2]

[https://unsplash.com/photos/five-star-hotel-style-hospital-reception] - Why India Page, Hospital Experience[cite: 1, 2]

[https://unsplash.com/photos/subtle-bright-architectural-details-hospital] - Why India Page, Map Section Background[cite: 1, 2]

[https://unsplash.com/photos/airport-greeting-chauffeur-coordinator-warm-smile] - Medical Tourism Process Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/international-family-arriving-premium-entrance] - Medical Tourism Process Page, Step 08 (Arrive in India)[cite: 1, 2]

[https://unsplash.com/photos/reassuring-illustration-continuous-support-journey] - Medical Tourism Process Page, Closing Statement[cite: 1, 2]

[https://unsplash.com/photos/premium-coordinator-assisting-family-documents] - Patient Services Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/modern-home-family-looking-tablet-calmly] - Patient Services Page, Before Treatment[cite: 1, 2]

[https://unsplash.com/photos/warm-human-moment-coordinator-patient-luxury-suite] - Patient Services Page, During Your Stay[cite: 1, 2]

[https://unsplash.com/photos/patient-walking-out-glass-doors-smiling-daylight] - Patient Services Page, After Treatment[cite: 1, 2]

[https://unsplash.com/photos/doctor-bright-clean-office-reviewing-tablet] - Medical Second Opinion Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/patient-looking-relieved-phone-sunny-window] - Medical Second Opinion Page, Introduction[cite: 1, 2]

[https://unsplash.com/photos/premium-world-map-route-graphic-bright-clean] - Countries We Serve Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/warm-sand-tint-middle-eastern-family-happy] - Countries We Serve Page, Iraq Section[cite: 1, 2]

[https://unsplash.com/photos/soft-cyan-tint-modern-uae-architecture-traveler] - Countries We Serve Page, UAE Section[cite: 1, 2]

[https://unsplash.com/photos/light-green-tint-serene-modern-hospital-courtyard] - Countries We Serve Page, India Section[cite: 1, 2]

[https://unsplash.com/photos/premium-hospital-consultation-doctor-patient-smiling] - Hospitals & Doctors Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/luxury-private-room-hotel-suite-style] - Hospitals & Doctors Page, Hospital Category 1[cite: 1, 2]

[https://unsplash.com/photos/spacious-clutter-free-lobby-natural-wood] - Hospitals & Doctors Page, Hospital Category 2[cite: 1, 2]

[https://unsplash.com/photos/premium-diagnostic-center-hallway-bright-welcoming] - Hospitals & Doctors Page, Hospital Category 3[cite: 1, 2]

[https://unsplash.com/photos/exterior-state-of-the-art-medical-building-sunny] - Hospitals & Doctors Page, Hospital Category 4[cite: 1, 2]

[https://unsplash.com/photos/editorial-shot-diverse-medical-team-bright-boardroom] - Hospitals & Doctors Page, Specialist Categories[cite: 1, 2]

[https://unsplash.com/photos/coordinator-happily-answering-questions-bright-space] - FAQ Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/calm-support-representative-smiling-soft-tint] - FAQ Page, Still Have Questions[cite: 1, 2]

[https://unsplash.com/photos/coordinator-welcoming-international-family-bright-reception] - Contact Page, Hero Section[cite: 1, 2]

[https://unsplash.com/photos/hands-holding-coffee-cup-next-to-tablet-relaxed] - Contact Page, Form Introduction[cite: 1, 2]

[https://unsplash.com/photos/warm-professional-headshot-coordinator-teal-suit] - Contact Page, Coordinator Card[cite: 1, 2]