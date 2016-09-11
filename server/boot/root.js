const reactRoutes = [
  '/',
  '/chart'
];

export default function rootScript(app) {
  const router = app.loopback.Router();
  reactRoutes.forEach(route => {
    router.get(route, renderHome);
  });

  function renderHome(req, res) {
    return res.render('index', { title: 'Advance Redux' });
  }

  app.use(router);
}
