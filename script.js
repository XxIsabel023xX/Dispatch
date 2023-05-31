 // Functie om meldingen op te slaan in de lokale opslag
 function saveDispatch(callerName, incidentType, description, location) {
    var dispatchData = localStorage.getItem("dispatchData");
    var dispatchArray = dispatchData ? JSON.parse(dispatchData) : [];

    dispatchArray.push({ callerName: callerName, incidentType: incidentType, description: description, location: location });

    localStorage.setItem("dispatchData", JSON.stringify(dispatchArray));
  }

  // Functie om meldingen op te halen en weer te geven vanuit de lokale opslag
  function loadDispatch() {
    var dispatchData = localStorage.getItem("dispatchData");
    var dispatchArray = dispatchData ? JSON.parse(dispatchData) : [];

    var table = document.getElementById("dispatchTable");

    for (var i = 0; i < dispatchArray.length; i++) {
      var newRow = table.insertRow(-1);

      var cell1 = newRow.insertCell(0);
      var cell2 = newRow.insertCell(1);
      var cell3 = newRow.insertCell(2);
      var cell4 = newRow.insertCell(3);

      cell1.innerHTML = dispatchArray[i].callerName;
      cell2.innerHTML = dispatchArray[i].incidentType;
      cell3.innerHTML = dispatchArray[i].description;
      cell4.innerHTML = dispatchArray[i].location;
    }
  }

  // Event listener voor het indienen van het formulier
  document.getElementById("dispatchForm").addEventListener("submit", function(event) {
    event.preventDefault();

    var callerName = document.getElementById("callerName").value;
    var incidentType = document.getElementById("incidentType").value;
    var description = document.getElementById("description").value;
    var location = document.getElementById("location").value;

    saveDispatch(callerName, incidentType, description, location);

    var table = document.getElementById("dispatchTable");
    var newRow = table.insertRow(-1);

    var cell1 = newRow.insertCell(0);
    var cell2 = newRow.insertCell(1);
    var cell3 = newRow.insertCell(2);
    var cell4 = newRow.insertCell(3);

    cell1.innerHTML = callerName;
    cell2.innerHTML = incidentType;
    cell3.innerHTML = description;
    cell4.innerHTML = location;

    document.getElementById("callerName").value = "";
    document.getElementById("incidentType").value = "";
    document.getElementById("description").value = "";
    document.getElementById("location").value = "";
  });

  // Event listener voor de resetknop
  document.getElementById("resetButton").addEventListener("click", function() {
    localStorage.removeItem("dispatchData");

    var table = document.getElementById("dispatchTable");
    while (table.rows.length > 1) {
      table.deleteRow(1);
    }
  });

  window.addEventListener("DOMContentLoaded", function() {
    loadDispatch();
  });