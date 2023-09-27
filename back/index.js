import 'dotenv/config';
import app from './src/app';

const PORT = process.env.SERVER_PORT;
const server = app.listen(PORT, () => {
  console.log(`🚀::Server connection |  http://localhost:${PORT}`);
});

app.io.attach(server);
