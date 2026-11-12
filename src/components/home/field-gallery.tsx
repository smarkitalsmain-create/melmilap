import Image from "next/image";
import { BurstFrame } from "@/components/campaign/burst-frame";
import { DraftMark } from "@/components/layout/preview-banner";
import { getCause } from "@/content/causes";
import type { FieldPhoto } from "@/content/photos";
import { formatDate } from "@/lib/content";

const causeTone: Record<string, string> = {
  education: "bg-mango text-aubergine",
  "meals-nutrition": "bg-hibiscus text-white",
  "animal-welfare": "bg-leaf text-white",
  founder: "bg-aubergine text-cream",
  other: "bg-cobalt text-white",
};

function causeLabel(p: FieldPhoto) {
  if (p.cause === "founder") return "Founder";
  if (p.cause === "other") return "Community";
  return getCause(p.cause)?.name ?? "";
}

/** Factual caption: what, then who delivered it, Mel Milap's role, where and when. */
function captionLine(p: FieldPhoto) {
  return [
    p.caption,
    p.deliveredBy && `Delivered by ${p.deliveredBy}.`,
    p.melMilapRole && `Mel Milap’s role: ${p.melMilapRole}.`,
    [p.location, p.activityDate && formatDate(p.activityDate)].filter(Boolean).join(", "),
  ]
    .filter(Boolean)
    .join(" ");
}

function Tile({ photo, lead, span = "" }: { photo: FieldPhoto; lead: boolean; span?: string }) {
  const cleared = photo.status === "cleared" && photo.file;
  return (
    <figure className={`group flex flex-col ${lead ? "sm:col-span-2 lg:row-span-2" : span}`}>
      <div
        data-reveal="mask"
        className={`relative overflow-hidden rounded-[1.75rem] ${lead ? "aspect-[4/3] lg:aspect-auto lg:flex-1 lg:min-h-[28rem]" : span ? "aspect-[4/3] sm:aspect-[16/9]" : "aspect-[4/3]"} ${cleared ? "bg-paper" : "border-2 border-dashed border-cobalt bg-white"}`}
      >
        {cleared ? (
          <Image
            src={photo.file!}
            alt={photo.alt}
            fill
            sizes={lead ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"}
            className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
          />
        ) : (
          <div className="flex h-full flex-col justify-between gap-2 overflow-hidden p-4 text-xs leading-snug sm:text-[0.8rem]">
            <DraftMark>Held · not public</DraftMark>
            <p className="text-plum">{photo.alt}</p>
            <p className="font-semibold text-cobalt">{photo.holdReason}</p>
          </div>
        )}
        <span className={`absolute left-4 top-4 rounded-full px-3 py-1 text-xs font-bold uppercase tracking-wider ${causeTone[photo.cause]} ${cleared ? "" : "hidden"}`}>
          {causeLabel(photo)}
        </span>
      </div>
      <figcaption className="mt-3 text-[0.95rem] leading-snug">
        {captionLine(photo)}
        {photo.credit && <span className="block text-sm text-plum">Photo: {photo.credit}</span>}
      </figcaption>
    </figure>
  );
}

/** "In the field": lead image plus supporting tiles, revealed by the paper burst. */
export function FieldGallery({ photos }: { photos: FieldPhoto[] }) {
  if (photos.length === 0) return null;
  // The widest original leads; smaller originals stay as tiles (in register order, mixing causes) to keep quality.
  const lead = photos.reduce((a, b) => ((b.width ?? 0) > (a.width ?? 0) ? b : a));
  const rest = photos.filter((p) => p !== lead);
  // Widen the last tile when it would otherwise leave a gap in the grid.
  const lastSpan = [rest.length % 2 === 1 ? "sm:col-span-2" : "", rest.length % 4 === 3 ? "lg:col-span-2" : "lg:col-span-1"].join(" ");
  return (
    <section aria-labelledby="field-heading" className="grain overflow-hidden bg-cream py-20 lg:py-28">
      <div className="container-site">
        <BurstFrame palette={["#FFBD2E", "#D82A63", "#18845F"]}>
          <div className="px-1 py-6 sm:px-6 lg:px-10">
            <div className="mb-10 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
              <div>
                <p className="eyebrow text-hibiscus-ink">Photographs</p>
                <h2 id="field-heading" className="display-lg mt-3">In the field</h2>
              </div>
              <p className="max-w-md text-lg text-plum">Photographs from activities across our focus areas.</p>
            </div>
            <div className={`grid gap-6 sm:grid-cols-2 ${rest.length <= 2 ? "lg:grid-cols-3" : "lg:grid-cols-4"}`}>
              <Tile photo={lead} lead />
              {rest.map((p, i) => (
                <Tile key={p.id} photo={p} lead={false} span={i === rest.length - 1 ? lastSpan : ""} />
              ))}
            </div>
          </div>
        </BurstFrame>
      </div>
    </section>
  );
}
