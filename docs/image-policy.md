# Image Policy

## Principle

The project uses real documentary images only.

Do not use:

- AI-generated images,
- generic festival illustrations,
- unrelated stock photography,
- fake representative images,
- placeholder images,
- images with unknown or incompatible rights.

## Zero-image behavior

If an Entity has no approved image:

- do not render a hero image block,
- do not render an empty gallery,
- do not render a placeholder thumbnail,
- do not substitute a generic image.

The page layout must remain complete and intentional without images.

## Multiple images

An Entity may have multiple Image Assets.

The model supports one Primary Image maximum, display order, caption, alt text, credit, credit URL, provider information, license information, rights review, Place, and taken date.

There is no fixed lifetime image-count limit.

## Public display gate

An image is eligible for Public Projection only when:

```text
content review approved
rights review approved
commercial use allowed
asset reachable
required attribution information present
```

Unknown-rights images are not published.

## Credit

Support:

```text
photographer_name
credit_text
credit_url
```

When a credit URL exists, the credit text or photographer name may link to the requested valid URL, such as a portfolio, organization page, project page, or Source page.

## Direct contributions

Directly provided images may be supported when permission terms are documented.

Internal permission records should track who granted permission, what was granted, and under what conditions.

## Gallery and lightbox

When multiple approved images exist, the UI may provide a Primary Image, thumbnail gallery, lightbox enlargement, previous/next navigation, close control, image count, caption, credit, license information, credit/provider link, keyboard navigation, and practical mobile swipe support.

## Alt text

Meaningful documentary images should have concise Japanese alt text describing visible content rather than repeating only the Entity name.

## Image presence and ranking

Image availability may be used as a filter or data-quality signal, but image-rich Entities should not automatically be ranked as more important.
