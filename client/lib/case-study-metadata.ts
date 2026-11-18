import type { Metadata } from "next";

type CaseStudy = { id: string; thumbnail: { alt: string } };

// Page metadata for a case study, with its project card as the link-preview image.
// A page's own openGraph replaces the site-wide one, so the image has to be set here.
// The preview is a 1200×630 JPEG of the card (public/projects/<id>/preview.jpg): the size link
// previews expect, in a format LinkedIn, Facebook and X all show.
export function caseStudyMetadata(title: string, description: string, project: CaseStudy): Metadata {
  const image = { url: `/projects/${project.id}/preview.jpg`, width: 1200, height: 630, alt: project.thumbnail.alt };

  return {
    title,
    description,
    openGraph: { type: "article", title, description, images: [image] },
    twitter: { card: "summary_large_image", title, description, images: [image] },
  };
}
