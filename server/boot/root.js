export default function rootScript(app) {
  const router = app.loopback.Router();
  function renderHome(req, res) {
    return res.render('index', { title: 'Advance Redux' });
  }

  router.get('/', renderHome);
  app.use(router);
}
