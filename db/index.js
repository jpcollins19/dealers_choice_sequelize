const Sequelize = require(`sequelize`);
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://localhost/nba_db`
);

const { STRING, UUID, UUIDV4 } = Sequelize;

const Team = db.define(`teams`, {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  location: {
    type: STRING,
    allowNull: false,
  },
  record: {
    type: STRING,
    allowNull: false,
  },
});

const Player = db.define(`players`, {
  id: {
    type: UUID,
    primaryKey: true,
    defaultValue: UUIDV4,
  },
  name: {
    type: STRING,
    allowNull: false,
  },
  hometown: {
    type: STRING,
    allowNull: false,
  },
  college: {
    type: STRING,
    allowNull: false,
  },
  height: {
    type: STRING,
    allowNull: false,
  },
});

const teamObjInfo = {
  Lakers: {
    location: `Los Angeles, CA`,
    record: `8-6`,
  },
  Bulls: {
    location: `Chicago, IL`,
    record: `9-4`,
  },
  Celtics: {
    location: `Boston, MA`,
    record: `6-7`,
  },
};

const playerObjInfo = {
  "Anthony Davis": {
    hometown: `Chicago, IL`,
    college: `Kentucky`,
    height: `6-10`,
  },
  "Lebron James": {
    hometown: `Akron, OH`,
    college: `n/a`,
    height: `6-9`,
  },
  "Zach Levine": {
    hometown: `Renton, Washington`,
    college: `UCLA`,
    height: `6-5`,
  },
  "Jayson Tatum": {
    hometown: `St. Louis, MO`,
    college: `Duke`,
    height: `6-8`,
  },
  "Demar DeRozen": {
    hometown: `Compton, CA`,
    college: `USC`,
    height: `6-6`,
  },
};

const teamNames = Object.keys(teamObjInfo);
const playerNames = Object.keys(playerObjInfo);

Player.belongsTo(Team);
Team.hasMany(Player);

const syncAndSeed = async () => {
  await db.sync({ force: true });

  const [lakers, bulls, celtics] = await Promise.all(
    teamNames.map((name) =>
      Team.create({
        name,
        location: teamObjInfo[name].location,
        record: teamObjInfo[name].record,
      })
    )
  );

  const [anthonyDavis, lebronJames, zachLevine, jaysonTatum, demarDeRozen] =
    await Promise.all(
      playerNames.map((name) =>
        Player.create({
          name,
          hometown: playerObjInfo[name].hometown,
          college: playerObjInfo[name].college,
          height: playerObjInfo[name].height,
        })
      )
    );

  anthonyDavis.teamId = lakers.id;
  lebronJames.teamId = lakers.id;
  zachLevine.teamId = bulls.id;
  demarDeRozen.teamId = bulls.id;
  jaysonTatum.teamId = celtics.id;

  await Promise.all([
    anthonyDavis.save(),
    lebronJames.save(),
    zachLevine.save(),
    demarDeRozen.save(),
    jaysonTatum.save(),
  ]);
};

module.exports = {
  syncAndSeed,
  models: { Team, Player },
  db,
};
