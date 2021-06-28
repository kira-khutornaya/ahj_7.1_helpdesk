const http = require('http');
const Koa = require('koa');
const koaBody = require('koa-body');
const Router = require('koa-router');
const cors = require('koa2-cors');
const Helpdesk = require('./Helpdesk');

const app = new Koa();
const router = new Router();
const helpdesk = new Helpdesk();

app.use(koaBody({
  urlencoded: true,
  json: true,
  text: true,
}));

// CORS

app.use(cors({
  origin: '*',
  credentials: true,
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE'],
}));

router.get('/helpdesk', async (ctx) => {
  const { method } = ctx.request.query;

  if (method === 'allTickets') ctx.response.body = helpdesk.allTickets();

  if (method === 'ticketById') {
    const { id } = ctx.request.query;
    ctx.response.body = helpdesk.ticketById(id);
  }
});

router.post('/helpdesk', async (ctx) => {
  const { method } = ctx.request.query;
  if (method === 'createTicket') {
    const { title, description } = ctx.request.body;
    ctx.response.body = helpdesk.createTicket(title, description);
    ctx.response.status = 204;
  }
});

router.put('/helpdesk/:id', async (ctx) => {
  const id = +(ctx.params.id);
  const { title, description } = ctx.request.body;
  if (!title || !description) helpdesk.changeStatus(id);
  else helpdesk.editTicket(id, title, description);
  ctx.response.status = 204;
});

router.delete('/helpdesk/:id', async (ctx) => {
  const id = +(ctx.params.id);
  helpdesk.removeTicket(id);
  ctx.response.status = 204;
});

app.use(koaBody()).use(router.routes()).use(router.allowedMethods());

const port = process.env.PORT || 7070;
http.createServer(app.callback()).listen(port, () => console.log('server started...'));
