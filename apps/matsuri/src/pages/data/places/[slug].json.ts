import type { APIRoute, GetStaticPaths } from "astro";
import {
  findMatsuriPlaceDetail,
  matsuriPlaceDetails,
} from "../../../data/place-view-models.js";

export const getStaticPaths = (() =>
  matsuriPlaceDetails.map((detail) => ({
    params: { slug: detail.slug },
    props: { slug: detail.slug },
  }))) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const slug = String(props.slug ?? "");
  const detail = findMatsuriPlaceDetail(slug);
  if (!detail) {
    return new Response(JSON.stringify({ error: "place_not_found" }), {
      status: 404,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  return new Response(
    JSON.stringify(
      {
        project_id: "yukue-series",
        site_id: "matsuri",
        record_type: "place_detail",
        record: {
          place: detail.rawPlace,
          related_records: detail.relatedRecords.map((item) => ({
            relation_label: item.label,
            name: item.targetName,
            href: item.href,
          })),
        },
      },
      null,
      2,
    ),
    {
      status: 200,
      headers: {
        "content-type": "application/json; charset=utf-8",
        "cache-control": "public, max-age=300",
      },
    },
  );
};
