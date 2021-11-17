const app = require(`express`).Router();
const {
  db,
  models: { Team, Player },
} = require(`../db`);
const home = require(`../views/home.js`);
const playerRoute = require(`../views/players.js`);

module.exports = app;

app.post(`/`, async (req, res, next) => {
  try {
    const team = await Team.create(req.body);
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
});

app.post(`/:id`, async (req, res, next) => {
  try {
    const player = await Player.create(req.body);
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
});

app.delete(`/:id`, async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id);
    await team.destroy();
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
});

app.delete(`/:id`, async (req, res, next) => {
  try {
    const player = await Player.findByPk(req.params.id);
    await player.destroy();
    res.redirect(`/`);
  } catch (err) {
    next(err);
  }
});

app.get(`/`, async (req, res, next) => {
  try {
    const teams = await Team.findAll({
      include: [Player],
    });

    res.send(home(teams));
  } catch (err) {
    next(err);
  }
});

app.get(`/:id`, async (req, res, next) => {
  try {
    const team = await Team.findByPk(req.params.id);
    const players = await Player.findAll({
      include: [Team],
    });

    res.send(playerRoute(players, team));
  } catch (err) {
    next(err);
  }
});
