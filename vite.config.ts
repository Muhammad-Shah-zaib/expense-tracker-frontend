import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from "vite-plugin-pwa";

export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: "autoUpdate",
      includeAssets: ["favicon.svg", "robots.txt"],
      workbox: {
        maximumFileSizeToCacheInBytes: 5000000, // 5 MB, adjust as needed
      },
      manifest: {
        name: "Vizufi: Expense Tracker",
        short_name: "Vizufi",
        description:
          "Vizufi is a simple and easy to use expense tracker app, where you can visualize your expenses and income, add your transactions, and manage your budget.",
        theme_color: "#ffffff",
        display: "standalone", // important for full-screen app behavior
        icons: [
          {
            src: "/pwa-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "/pwa-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
      },
    }),
  ],
});
