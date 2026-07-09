import type { ImageAssetRecord } from "@badjoke-lab/yukue-schemas/common";
import type { ValidationIssue } from "./types.js";

export function validateImageGate(images: ImageAssetRecord[]): ValidationIssue[] {
  const issues: ValidationIssue[] = [];
  const approved = images.filter((image) => image.review_status === "approved");
  const primaryByEntity = new Map<string, ImageAssetRecord[]>();

  for (const image of approved) {
    if (image.is_primary) {
      const group = primaryByEntity.get(image.entity_id) ?? [];
      group.push(image);
      primaryByEntity.set(image.entity_id, group);
    }

    if (image.rights_review_status !== "approved") {
      issues.push({
        severity: "error",
        code: "IMAGE_RIGHTS_NOT_APPROVED",
        message: `Approved image ${image.id} does not have approved rights review.`,
        recordId: image.id,
        path: "rights_review_status",
      });
    }

    if (!image.commercial_use_allowed) {
      issues.push({
        severity: "error",
        code: "IMAGE_COMMERCIAL_USE_NOT_ALLOWED",
        message: `Approved image ${image.id} is not cleared for commercial use.`,
        recordId: image.id,
        path: "commercial_use_allowed",
      });
    }

    if (!image.asset_path && !image.public_url) {
      issues.push({
        severity: "error",
        code: "IMAGE_ASSET_UNREACHABLE",
        message: `Approved image ${image.id} has neither asset_path nor public_url.`,
        recordId: image.id,
        path: "asset_path",
      });
    }

    if (image.alt_text_ja.trim().length === 0) {
      issues.push({
        severity: "error",
        code: "IMAGE_ALT_TEXT_MISSING",
        message: `Approved image ${image.id} has empty alt text.`,
        recordId: image.id,
        path: "alt_text_ja",
      });
    }

    if (image.attribution_required && image.credit_text.trim().length === 0) {
      issues.push({
        severity: "error",
        code: "IMAGE_REQUIRED_CREDIT_MISSING",
        message: `Approved image ${image.id} requires attribution but has no credit text.`,
        recordId: image.id,
        path: "credit_text",
      });
    }

    if (image.license_type === "unknown") {
      issues.push({
        severity: "error",
        code: "IMAGE_LICENSE_UNKNOWN",
        message: `Approved image ${image.id} has unknown license type.`,
        recordId: image.id,
        path: "license_type",
      });
    }
  }

  for (const [entityId, primaryImages] of primaryByEntity) {
    if (primaryImages.length > 1) {
      issues.push({
        severity: "error",
        code: "MULTIPLE_PRIMARY_IMAGES",
        message: `Entity ${entityId} has ${primaryImages.length} approved primary images.`,
        recordId: entityId,
        path: "images",
      });
    }
  }

  return issues;
}
