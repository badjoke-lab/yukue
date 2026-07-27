import type { APIRoute, GetStaticPaths } from "astro";
import {
  findMatsuriEntityDetail,
  matsuriEntityDetails,
} from "../../../../data/matsuri-projection.js";
import { entityRouteKind } from "../../../../data/public-routes.js";

export const getStaticPaths = (() =>
  matsuriEntityDetails.flatMap((detail) => {
    const kind = entityRouteKind(detail.entity.entity_type);
    if (!kind || !detail.entity.slug) return [];
    return [
      {
        params: { kind, slug: detail.entity.slug },
        props: { entityId: detail.entity.id },
      },
    ];
  })) satisfies GetStaticPaths;

export const GET: APIRoute = ({ props }) => {
  const entityId = String(props.entityId ?? "");
  const detail = findMatsuriEntityDetail(entityId);
  if (!detail) {
    return new Response(JSON.stringify({ error: "record_not_found" }), {
      status: 404,
      headers: { "content-type": "application/json; charset=utf-8" },
    });
  }

  return new Response(
    JSON.stringify(
      {
        project_id: "yukue-series",
        site_id: "matsuri",
        record_type: "entity_detail",
        record: detail,
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
