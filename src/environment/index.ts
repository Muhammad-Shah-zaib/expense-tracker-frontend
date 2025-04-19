// environment/index.ts
const isProd = import.meta.env.MODE === "production"; // (for Vite)
// const isProd = process.env.NODE_ENV === "production"; // (for CRA)

export * from `./${isProd ? "production" : "development"}`;
