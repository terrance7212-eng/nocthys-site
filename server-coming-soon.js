import express from 'express';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

const app = express();
const PORT = process.env.COMING_SOON_PORT || 3019;

app.use(express.static(path.join(__dirname, 'dist-coming-soon')));

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'dist-coming-soon', 'coming-soon.html'));
});

app.listen(PORT, () => {
  console.log(`NOCTHYS Coming Soon server running on port ${PORT}`);
});
