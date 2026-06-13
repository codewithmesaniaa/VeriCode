import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import { createServer as createViteServer } from "vite";
import apiRouter from "./backend/server.js";
import dotenv from "dotenv";

// Load local environmental variables
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function startServer() {
  const app = express();
  const PORT = parseInt(process.env.PORT || "3000", 10);

  // Mount backend API endpoints
  app.use("/api", apiRouter);

  // Manage Vite Middleware & Static Serving based on environment
  if (process.env.NODE_ENV !== "production") {
    console.log("Booting CodeSense AI Server in [DEVELOPMENT] mode...");
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    // Let Vite handle client requests
    app.use(vite.middlewares);
  } else {
    console.log("Booting CodeSense AI Server in [PRODUCTION] mode...");
    const distPath = path.join(process.cwd(), "dist");
    
    // Serve production bundle
    app.use(express.static(distPath));
    
    // Single Page Routing fallback
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  // Bind server listener to 0.0.0.0 and port 3000
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`===============================================`);
    console.log(`🚀 CodeSense AI is running at http://localhost:${PORT}`);
    console.log(`===============================================`);
  });
}

startServer().catch((err) => {
  console.error("Critical crash during server startup:", err);
});
