module.exports = (arr) => {
  return `
        <html>  
          <head>
            <title>NBA</title>
            <link rel='stylesheet' href='/public/css.css' />
          </head>
          <body>
            <div id='header'>
              <h1>NBA Teams & Player Info</h1>
            </div>
            <form method='POST' class='submit-container'>
                <input class='center' name='name' placeholder='enter team'/>
                <input class='center' name='location' placeholder='enter location'/>
                <input class='center' name='record' placeholder='enter record'/>
                <button>Add Team</button>
            </form>
            <div id='team-info-container'>
              ${arr
                .map(
                  (team) => `
                <div class='single-team-container'>
                  <h1>${team.name}</h1>
                  <div class='single-team-info-container'>Location: ${team.location}</div>
                  <div class='single-team-info-container'>Record: ${team.record}</div>
                  <div class='single-team-info-container'>
                    <a href='/${team.id}'>Players</a>
                  </div>
                  <form class='delete-team' method='POST' action='${team.id}?_method=DELETE'>
                    <button>Delete Team</button>
                  </form>
                </div>`
                )
                .join("")}
            </div>
          </body>
        </html>`;
};
