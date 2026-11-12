/**
 * The phased operating model. Update `current` as the foundation moves through phases.
 */
export const operatingModel = {
  current: 0,
  phases: [
    {
      name: "Partner-led launch",
      body: "We support defined projects through verified NGOs, community organisations and specialist institutions. Partners deliver day to day; we assess needs, approve budgets, monitor spending and verify delivery.",
    },
    {
      name: "Combined delivery",
      body: "Partner-led projects continue while we introduce selected programmes of our own, with our own coordinators and monitoring.",
    },
    {
      name: "Established model",
      body: "We run programmes directly where we have the capacity, and keep partners wherever they bring stronger local access or specialist skills.",
    },
  ],
  conditions:
    "We will only run our own programmes once we have an approved plan, committed funding, responsible staff, suitable facilities and working financial and monitoring controls.",
};
