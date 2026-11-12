import { operatingModel } from "@/content/operating-model";

export function OperatingModel() {
  return (
    <div>
      <ol className="grid gap-4 lg:grid-cols-3">
        {operatingModel.phases.map((p, i) => {
          const isCurrent = i === operatingModel.current;
          return (
            <li
              key={p.name}
              data-reveal
              style={{ ["--i" as string]: i }}
              className={`relative rounded-[1.75rem] p-6 sm:p-7 ${isCurrent ? "bg-aubergine text-cream" : "border-2 border-aubergine/20 bg-cream"}`}
            >
              <p className={`eyebrow ${isCurrent ? "text-mango" : "text-plum"}`}>
                Phase {i + 1}
                {isCurrent ? " · where we start" : " · later"}
              </p>
              <h3 className="mt-2 font-display text-2xl font-bold">{p.name}</h3>
              <p className={`mt-3 ${isCurrent ? "text-lilac" : "text-plum"}`}>{p.body}</p>
            </li>
          );
        })}
      </ol>
      <p className="mt-6 max-w-3xl text-plum">{operatingModel.conditions}</p>
    </div>
  );
}
