////player:id route
// -- couldnt get the delete feature to work, didnt know how to add a 2nd app.delete with a destroy()
//    on the Player model (row 39 of the router/posts.js doc)
//
// --I needed to capture the teamId in order to add a new row to the Player model, the only way i
//   could figure out how to do that was to add a 5th input tag to capture the team.id (currently
//   displayed as an empty white square to the right of the 'enter height' intput tag), how could
//    i have done this better so the teamId is captured behind the scenes and not displayed
//    anywhere on the URL page?

const express = require(`express`);
const app = express();
const {
  syncAndSeed,
  db,
  models: { Team, Player },
} = require(`./db`);
const path = require(`path`);

app.use(express.urlencoded({ extended: false }));

app.use(require(`method-override`)(`_method`));

app.use(`/public`, express.static(path.join(__dirname, `/public`)));

app.use(`/`, require(`./router/posts`));

const init = async () => {
  try {
    await syncAndSeed();
    const port = process.env.PORT || 1117;
    app.listen(port, () => {
      console.log(`listening to port ${port}`);
    });
  } catch (err) {
    console.log(err);
  }
};

init();
