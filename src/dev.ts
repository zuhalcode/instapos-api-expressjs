import app from "./app";
import { PORT } from "./libs/env";

async function init() {
  app.listen(PORT, () =>
    console.log(`Server running at http://localhost:${PORT}`),
  );
}

init();
