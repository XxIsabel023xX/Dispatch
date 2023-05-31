// Array om de eenheden op te slaan
var units = [];

// Functie om een nieuwe eenheid toe te voegen
function addUnit(name, status, specialty) {
  var unit = {
    name: name,
    status: status,
    specialty: specialty
  };

  units.push(unit);
  saveUnits();
  renderUnits();
}

// Functie om de eenheden weer te geven
function renderUnits() {
  var unitSection = document.getElementById("unitSection");
  unitSection.innerHTML = "";

  units.forEach(function(unit, index) {
    var unitContainer = document.createElement("div");
    unitContainer.classList.add("unit");

    var unitName = document.createElement("h3");
    unitName.classList.add("unit-name");
    unitName.textContent = unit.name;

    var unitDetails = document.createElement("div");
    unitDetails.classList.add("unit-details");

    var unitStatus = document.createElement("p");
    unitStatus.classList.add("unit-status");
    unitStatus.textContent = "Status: " + getStatusLabel(unit.status);

    var unitSpecialty = document.createElement("p");
    unitSpecialty.classList.add("unit-specialty");
    unitSpecialty.textContent = "Specialiteit: " + unit.specialty;

    var unitStatusInput = document.createElement("select");
    unitStatusInput.id = "unitStatusInput";
    unitStatusInput.appendChild(createStatusOption("1", "Beschikbaar"));
    unitStatusInput.appendChild(createStatusOption("2", "Onderweg"));
    unitStatusInput.appendChild(createStatusOption("3", "Terplaatse"));
    unitStatusInput.appendChild(createStatusOption("4", "Niet beschikbaar"));
    unitStatusInput.appendChild(createStatusOption("5", "Training"));
    unitStatusInput.appendChild(createStatusOption("6", "Transport"));
    unitStatusInput.appendChild(createStatusOption("7", "Uit dienst"));
    unitStatusInput.value = unit.status;

    var updateStatusButton = document.createElement("button");
    updateStatusButton.textContent = "Status bijwerken";

    updateStatusButton.addEventListener("click", function() {
      unit.status = unitStatusInput.value;
      saveUnits();
      renderUnits();
    });

    var deleteUnitButton = document.createElement("button");
    deleteUnitButton.textContent = "Verwijder eenheid";

    deleteUnitButton.addEventListener("click", function() {
      units.splice(index, 1);
      saveUnits();
      renderUnits();
    });

    unitDetails.appendChild(unitStatus);
    unitDetails.appendChild(unitSpecialty);

    unitContainer.appendChild(unitName);
    unitContainer.appendChild(unitDetails);
    unitContainer.appendChild(unitStatusInput);
    unitContainer.appendChild(updateStatusButton);
    unitContainer.appendChild(deleteUnitButton);

    unitSection.appendChild(unitContainer);
  });
}

// Functie om een option element te maken voor de status dropdown
function createStatusOption(value, label) {
  var option = document.createElement("option");
  option.value = value;
  option.textContent = label;
  return option;
}

// Functie om de eenheden op te slaan in de lokale opslag
function saveUnits() {
  localStorage.setItem("units", JSON.stringify(units));
}

// Functie om de eenheden te herstellen vanuit de lokale opslag
function restoreUnits() {
  var savedUnits = localStorage.getItem("units");
  if (savedUnits) {
    units = JSON.parse(savedUnits);
    renderUnits();
  }
}

// Event listener voor de knop "Eenheid toevoegen"
document.getElementById("addUnitButton").addEventListener("click", function() {
  var unitName = document.getElementById("unitName").value;
  var unitStatus = document.getElementById("unitStatusInput").value;
  var unitSpecialty = document.getElementById("unitSpecialty").value;

  if (unitName.trim() !== "") {
    addUnit(unitName, unitStatus, unitSpecialty);

    document.getElementById("unitName").value = "";
    document.getElementById("unitStatusInput").value = "1";
    document.getElementById("unitSpecialty").value = "Noodhulp";
  }
});

// Functie om de label van de status op basis van de waarde te krijgen
function getStatusLabel(statusValue) {
  switch (statusValue) {
    case "1":
      return "Beschikbaar";
    case "2":
      return "Onderweg";
    case "3":
      return "Terplaatse";
    case "4":
      return "Niet beschikbaar";
    case "5":
      return "Training";
    case "6":
      return "Transport";
    case "7":
      return "Uit dienst";
    default:
      return "";
  }
}

// Herstel eenheden vanuit de lokale opslag bij het laden van de pagina
restoreUnits();

// Resetknop
var resetButton = document.createElement("button");
resetButton.textContent = "Reset Dispatch 2";
resetButton.addEventListener("click", function() {
  localStorage.removeItem("units");
  units = [];
  renderUnits();
});
document.body.appendChild(resetButton);

// Toegevoegde code voor het initialiseren van de kaart
var map = L.map('map').setView([51.505, -0.09], 13);

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  attribution: 'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
  maxZoom: 18,
}).addTo(map);

