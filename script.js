const playerContainer = document.getElementById('all-players-container');
const newPlayerFormContainer = document.getElementById('new-player-form');

// Add your cohort name to the cohortName variable below, replacing the 'COHORT-NAME' placeholder
const cohortName = '2308-acc-pt-web-pt-b';
// Use the APIURL variable for fetch requests
const APIURL = `https://fsa-puppy-bowl.herokuapp.com/api/${cohortName}/`;

let state = {
    players: []
};
/**
 * It fetches all players from the API and returns them
 * @returns An array of objects.
 */
const fetchAllPlayers = async () => {
    try {
        const response = await fetch(`${APIURL}/players`);
        const result = await response.json();
        state.players = result.data.players;
        return state.players
    } catch (err) {
        console.error('Uh oh, trouble fetching players!', err);
    }
};

const fetchSinglePlayer = async (playerId) => {
    try {
        const response = await fetch(`https://fsa-puppy-bowl.herokuapp.com/api/2308-acc-pt-web-pt-b/players/${playerId}`);
        const result = await response.json();
        state.currentPlayer = result.data
        console.log('Current player:', state.currentPlayer);
    } catch (err) {
        console.error(`Oh no, trouble fetching player #${playerId}!`, err);
    }
};

const addNewPlayer = async (playerObj) => {
    try {
        const response = await fetch(
            'https://fsa-puppy-bowl.herokuapp.com/api/2308-acc-pt-web-pt-b/players',
            {
                method: 'POST', 
                headers: {
                    'Content-Type': 'application/json', 
                },
                body: JSON.stringify(playerObj)
            }
        );

        const result = await response.json();
        state.players.push(newPlayer);
        console.log('New player added', newPlayer);
    } catch (err) {
        console.error('Oops, something went wrong with adding that player!', err);
    }
};

const removePlayer = async (playerId) => {
    try {
        const response = await fetch(
            `https://fsa-puppy-bowl.herokuapp.com/api/2308-acc-pt-web-pt-b/players/${playerId}`, 
            {
                method: 'DELETE',
            }
        );

        const result = await response.json();
        console.log(`Player #${playerId} removed:`, result);
    } catch (err) {
        console.error(
            `Whoops, trouble removing player #${playerId} from the roster!`,
            err
        );
    }
};

/**
 * It takes an array of player objects, loops through them, and creates a string of HTML for each
 * player, then adds that string to a larger string of HTML that represents all the players. 
 * 
 * Then it takes that larger string of HTML and adds it to the DOM. 
 * 
 * It also adds event listeners to the buttons in each player card. 
 * 
 * The event listeners are for the "See details" and "Remove from roster" buttons. 
 * 
 * The "See details" button calls the `fetchSinglePlayer` function, which makes a fetch request to the
 * API to get the details for a single player. 
 * 
 * The "Remove from roster" button calls the `removePlayer` function, which makes a fetch request to
 * the API to remove a player from the roster. 
 * 
 * The `fetchSinglePlayer` and `removePlayer` functions are defined in the
 * @param playerList - an array of player objects
 * @returns the playerContainerHTML variable.
 */
const renderAllPlayers = (playerList) => {
    try {
        if (!Array.isArray(playerList)) {
            return; 
        }

        let playerHTMLString = playerList.map(player => `
            <div class="player-card">
                <img src="${player.imageUrl}" alt="Image of ${player.name}" style="width:100px; height:auto;">
                <h3>${player.name}</h3>
                <p>Breed: ${player.breed}</p>
                <p>Status: ${player.status}</p>
                <p>ID: ${player.id}</p>
                <button onclick="removePlayer(${player.id})">Remove Player</button>
                <button onclick="fetchSinglePlayer(${player.id})">View Details</button>
            </div>
        `).join('');

        playerContainer.innerHTML = playerHTMLString; 
    } catch (err) {
        console.error('Uh oh, trouble rendering players!', err);
    }
};

/**
 * It renders a form to the DOM, and when the form is submitted, it adds a new player to the database,
 * fetches all players from the database, and renders them to the DOM.
 */
const renderNewPlayerForm = () => {
    try {
        
    } catch (err) {
        console.error('Uh oh, trouble rendering the new player form!', err);
    }
}

const init = async () => {
    await fetchAllPlayers();
    renderAllPlayers(state.players);

    renderNewPlayerForm();
}

init();