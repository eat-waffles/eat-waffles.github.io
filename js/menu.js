const buttons = [
    { name: '2048', image: '/images/2408.png', link: '/Games/2048' },
    { name: 'Block Blast', image: '/images/Blast.png', link: '/Games/BlockBlast' },
    { name: 'Domions', image: '/images/Dominos.png', link: '/Games/Dominoes' },
    { name: 'Drift Boss', image: 'https://codehs.com/uploads/7f3758605f9ebce9c0eacd984e27fd6d', link: '/Games/DriftBoss' },
    { name: 'Drift Hunters', image: 'https://codehs.com/uploads/31a7a798b1ea657119eeb2fc0bfac610', link: '/Games/DriftHunters' },
    { name: 'Geometry Dash', image: '/images/Geometrydash.png', link: '/Games/GeometryDash' },
    { name: 'Geometry Dash Subzero', image: '/images/subzero.png', link: '/Games/GeometryDashSubzero' },
    { name: 'Geometry Dash Meltdown', image: '/images/meltdown.png', link: '/Games/GeometryDashMeltdown' },
    { name: 'OvO', image: '/images/ovo.png', link: '/Games/OvO' },
    { name: 'Retro Ping Pong', image: '/images/pong.png', link: '/Games/RetroPingPong' },
    { name: 'Rodha', image: '/images/rodha.png', link: '/Games/Rodha' },
    { name: 'Shortcut Race', image: '/images/shortcut-race.png', link: '/Games/ShortcutRace' },
    { name: 'Rolling Ball Game', image: '/images/ball.png', link: '/Games/Slope' },
    { name: 'Snow Rider 3d', image: '/images/snow-rider.png', link: '/Games/SnowRider3d' },
    { name: 'Spacebar Clicker', image: '/images/spacebar.png', link: '/Games/SpacebarClicker' },
    { name: 'Thorns And Balloons', image: '/images/thorns-and-balloons.png', link: '/Games/ThornsAndBalloons' },
    { name: 'Wheelie Bike', image: '/images/wheelie-bike.png', link: '/Games/WheelieBike' },
    { name: 'Planet Clicker', image: '/images/planet-clicker.png', link: '/Games/PlanetClicker' },
    { name: 'Sukia', image: '/images/sukia.png', link: '/Games/Sukia' },
    { name: 'Opposite Day', image: '/images/opposite-day.png', link: '/Games/OppositeDay' },
    { name: 'Slope Run', image: '/images/slope-run.png', link: '/Games/SlopeRun' },
    { name: 'Whopper Clicker', image: '/images/whopper-clicker.png', link: '/Games/WhopperClicker' },
    { name: 'Flappy Bird', image: '/images/flappy-bird.png', link: '/Games/FlappyBird' },
    { name: 'Swing Monkey', image: '/images/swing-monkey.png', link: '/Games/SwingMonkey' },
    { name: 'Mountian Bike Runner', image: '/images/mountian-bike-runner.png', link: '/Games/MountianBikeRunner' },
    { name: 'Freehand Skate', image: '/images/freehand-skate.png', link: '/Games/FreehandSkate' },
    { name: 'Falling Cubes', image: '/images/falling-cubes.png', link: '/Games/FallingCubes' },
    { name: '8 Ball Pool', image: '/images/8ballpool.png', link: '/Games/8BallPool' },
    { name: 'Are You Human?', image: '/images/are-you-human.png', link: '/Games/AreyouHuman' },
    { name: 'Ball Blast', image: '/images/ball-blast.png', link: '/Games/BallBlast' },
    { name: 'Basket Goal', image: '/images/basket-ball.png', link: '/Games/BasketGoal' },
    { name: 'Burger Time', image: '/images/burger-time.png', link: '/Games/BurgerTime' },
    { name: 'Candy Clicker', image: '/images/candy-clicker.png', link: '/Games/CandyClicker' },
    { name: 'Candy Clicker 2', image: '/images/candy-clicker2.png', link: '/Games/CandyClicker2' },
    { name: 'Capybara Clicker', image: '/images/capybara-clicker.png', link: '/Games/CapybaraClicker' },
    { name: 'Checkers', image: '/images/checkers.png', link: '/Games/Checkers' },
    { name: 'Cookie Clicker', image: '/images/cookie-clicker.png', link: '/Games/CookieClicker' },
    { name: 'Draw The Rest', image: '/images/drawtherest.png', link: '/Games/DrawTheRest' },
];

const buttonContainer = document.getElementById('buttonContainer');
const searchInput = document.getElementById('search');
const counterDisplay = document.getElementById('counterDisplay');
const sortOptions = document.getElementById('sortOptions'); // Sorting dropdown

// Variable to track whether click counts are visible
let showClickCounts = false;  // Set this to `false` so click counts are hidden by default

// Function to get the click count for a specific button from localStorage
function getClickCount(buttonName) {
    const count = localStorage.getItem(buttonName);
    return count ? parseInt(count) : 0;
}

// Function to set the click count for a specific button in localStorage
function setClickCount(buttonName, count) {
    localStorage.setItem(buttonName, count);
}

// Function to create each button
function createButton(button) {
    const a = document.createElement('a');
    a.className = 'menu-button';
    a.href = button.link;

    // Initialize the button's click count from localStorage
    let count = getClickCount(button.name);

    const img = document.createElement('img');
    img.src = button.image;
    a.appendChild(img);

    // Create the overlay with the game name
    const overlay = document.createElement('div');
    overlay.className = 'overlay';
    overlay.innerText = button.name; // Display the name of the game
    a.appendChild(overlay);

    // Create the pop-up for the click count
    const popUp = document.createElement('div');
    popUp.className = 'popup';
    popUp.innerText = `Clicked: ${count} clicks`; // Display the click count
    a.appendChild(popUp);

    // Update the click count and localStorage when the button is clicked
    a.addEventListener('click', () => {
        count++;
        setClickCount(button.name, count);

        // If click counts are visible, update the pop-up
        if (showClickCounts) {
            popUp.innerText = `Clicked: ${count} times`;
        }
    });

    // Hide or show the click count based on the toggle state
    if (!showClickCounts) {
        popUp.style.display = 'none'; // Hide click counts initially
    }

    return a;
}

// Function to render buttons and filter them by search input
function renderButtons(filter = '', sortBy = 'clickCount') {
    buttonContainer.innerHTML = ''; // Clear current buttons

    // Sort the buttons based on the selected sorting option
    let sortedButtons;

    if (sortBy === 'clickCount') {
        sortedButtons = buttons.sort((a, b) => {
            const countA = getClickCount(a.name);
            const countB = getClickCount(b.name);

            // First, sort by click count
            if (countB !== countA) {
                return countB - countA; // Sort in descending order of click count
            } else {
                // If the click counts are the same, sort alphabetically by name
                return a.name.localeCompare(b.name);
            }
        });
    } else if (sortBy === 'alphabetical') {
        sortedButtons = buttons.sort((a, b) => {
            return a.name.localeCompare(b.name); // Sort alphabetically by name
        });
    }

    const filteredButtons = sortedButtons.filter(button => button.name.toLowerCase().includes(filter.toLowerCase()));

    filteredButtons.forEach(button => {
        buttonContainer.appendChild(createButton(button));
    });

    // Update the counter display with the number of visible buttons
    counterDisplay.textContent = `${filteredButtons.length} Games Loaded`;
}

// Event listener for search input to filter buttons
searchInput.addEventListener('input', (e) => {
    renderButtons(e.target.value, sortOptions.value);
});

// Event listener for sort options dropdown to change sorting method
sortOptions.addEventListener('change', (e) => {
    renderButtons(searchInput.value, e.target.value);  // Re-render buttons based on selected sorting
});

// Initial render of buttons
renderButtons();
