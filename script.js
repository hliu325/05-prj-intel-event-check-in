const form = document.getElementById("checkInForm");
const nameInput = document.getElementById("attendeeName");
const teamSelect = document.getElementById("teamSelect");
const container = document.querySelector(".container");

const greeting = document.getElementById("greeting");
const attendeeCount = document.getElementById("attendeeCount");
const progressBar = document.getElementById("progressBar");

// Track Attendance:
let count = 0;
const maxCount = 50;
let celebrationShown = false;

// Create a celebration message area (extra credit).
const celebrationMessage = document.createElement("p");
celebrationMessage.id = "celebrationMessage";
celebrationMessage.style.display = "none";
celebrationMessage.style.marginBottom = "15px";
celebrationMessage.style.padding = "14px 18px";
celebrationMessage.style.borderRadius = "8px";
celebrationMessage.style.backgroundColor = "#e8f4fc";
celebrationMessage.style.border = "2px solid #00aeef";
celebrationMessage.style.color = "#003c71";
container.insertBefore(celebrationMessage, form);

// Create a small attendee list inside each team card (extra credit).
const waterCard = document.querySelector(".team-card.water");
const zeroCard = document.querySelector(".team-card.zero");
const powerCard = document.querySelector(".team-card.power");

function createTeamList(card) {
  const list = document.createElement("ul");
  list.className = "team-attendee-list";
  card.appendChild(list);
  return list;
}

const teamLists = {
  water: createTeamList(waterCard),
  zero: createTeamList(zeroCard),
  power: createTeamList(powerCard),
};

function getWinningTeamName() {
  const waterCount = parseInt(
    document.getElementById("waterCount").textContent,
  );
  const zeroCount = parseInt(document.getElementById("zeroCount").textContent);
  const powerCount = parseInt(
    document.getElementById("powerCount").textContent,
  );

  const maxTeamCount = Math.max(waterCount, zeroCount, powerCount);
  const winners = [];

  if (waterCount === maxTeamCount) {
    winners.push("Team Water Wise");
  }

  if (zeroCount === maxTeamCount) {
    winners.push("Team Net Zero");
  }

  if (powerCount === maxTeamCount) {
    winners.push("Team Renewables");
  }

  if (winners.length === 1) {
    return winners[0];
  }

  return `Tie between ${winners.join(" and ")}`;
}

// Handle submission of form:
form.addEventListener("submit", function (event) {
  event.preventDefault();

  // Stop new check-ins once the goal is reached.
  if (count >= maxCount) {
    greeting.textContent = "✅ Check-in goal reached. No more spots left.";
    greeting.style.display = "block";
    return;
  }

  // Get form values:
  const name = nameInput.value;
  const team = teamSelect.value;
  const teamName = teamSelect.selectedOptions[0].text;

  count = count + 1;
  attendeeCount.textContent = count;
  console.log(name, team, teamName);

  // Update the progress bar toward the goal.
  const percentage = Math.round((count / maxCount) * 100);
  progressBar.style.width = `${percentage}%`;

  // Update the selected team's count.
  const teamCounter = document.getElementById(`${team}Count`);
  teamCounter.textContent = parseInt(teamCounter.textContent) + 1;

  // display welcome message;
  const message = `🎉 Welcome, ${name} from ${teamName}!`;
  greeting.textContent = message;
  greeting.style.display = "block";
  console.log(message);

  // Add the attendee to the team's list.
  const listItem = document.createElement("li");
  listItem.textContent = name;
  teamLists[team].appendChild(listItem);

  // Celebrate when the attendance goal is reached.
  if (count >= maxCount && celebrationShown === false) {
    const winningTeamName = getWinningTeamName();
    celebrationMessage.textContent = `🎉 Goal reached! Winning team: ${winningTeamName}`;
    celebrationMessage.style.display = "block";
    celebrationShown = true;
  }

  // Reset the form for the next attendee.
  form.reset();
});
