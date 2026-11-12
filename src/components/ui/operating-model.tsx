import { howWeWork } from "@/content/operating-model";

const tones = ["bg-mango text-aubergine", "bg-hibiscus text-white", "bg-leaf text-white"];

export function HowWeWork({ headingId }: { headingId: string }) {
  return (
    <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
      <div>
        <h2 id={headingId} className="display-md">{howWeWork.heading}</h2>
        <p className="mt-5 max-w-xl text-lg">{howWeWork.body}</p>
      </div>
      <ul className="grid gap-4 sm:grid-cols-3 lg:grid-cols-1">
        {howWeWork.roles.map((r, i) => (
          <li key={r.title} data-reveal style={{ ["--i" as string]: i }} className={`grain rounded-[1.75rem] p-6 ${tones[i]}`}>
            <h3 className="font-display text-2xl font-bold">{r.title}</h3>
            <p className="mt-2">{r.body}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
