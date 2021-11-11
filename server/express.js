import express from 'express';

const app = express();

app.use(express.static('assets', { extensions: ['html'] }));

app.get('/hello', (request, response) => {
  response.json({ hello: 'world' });
});

export default app;
