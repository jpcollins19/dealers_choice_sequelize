module.exports = (arr, teamObj) => {
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
          <a class='center home-link' href='/'>Home</a>
          <h1 class='center'>Player Info for the ${teamObj.name}:</h1>
          <form method='POST' class='submit-container'>
                <input class='center' name='name' placeholder='enter name'/>
                <input class='center' name='hometown' placeholder='enter hometown'/>
                <input class='center' name='college' placeholder='enter college'/>
                <input class='center' name='height' placeholder='enter height'/>
                <input class='center hide' name='teamId' value='${teamObj.id}'/>
                <button>Add Player</button>
            </form>
          <div id='player-info-container'>
            ${arr
              .map((player) =>
                player.teamId === teamObj.id
                  ? `
            <div class='single-player-container'>
                <h1>${player.name}</h1>
                <div class='single-player-info-container'>Hometown: ${player.hometown}</div>
                <div class='single-player-info-container'>College: ${player.college}</div>
                <div class='single-player-info-container'>Height: ${player.height}</div>
                <form class='delete-team' method='POST' action='${player.id}?_method=DELETE'>
                  <button>Delete Player</button>
                </form>
            </div>
                `
                  : ""
              )
              .join("")}
          </div>
      </body>
    </html>`;
};
