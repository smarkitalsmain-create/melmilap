export function PreviewBanner() {
  return (
    <div role="note" className="bg-cobalt px-4 py-2 text-center text-sm font-semibold text-white">
      Preview mode: unpublished drafts are visible and marked. Turn off CONTENT_PREVIEW before launch.
    </div>
  );
}

/** Inline marker for draft or unconfirmed content shown in preview mode. */
export function DraftMark({ children = "Draft: awaiting approval" }: { children?: React.ReactNode }) {
  return (
    <span className="mr-2 inline-block rounded-full border-2 border-dashed border-cobalt bg-white px-2.5 py-0.5 align-middle text-xs font-bold uppercase tracking-wider text-cobalt">
      {children}
    </span>
  );
}
