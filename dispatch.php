<!DOCTYPE html>
<html>
<head>
  <title>Dispatch Site</title>
  <style>
    /* CSS-styling hier */
  </style>
</head>
<body>
  <h1>Dispatch Site</h1>
  
  <?php
  // Database configuratie
  $servername = "localhost";
  $username = "jouw_gebruikersnaam";
  $password = "jouw_wachtwoord";
  $dbname = "jouw_database_naam";

  // Maak verbinding met de database
  $conn = new mysqli($servername, $username, $password, $dbname);
  
  // Controleer of de verbinding succesvol is
  if ($conn->connect_error) {
    die("Verbindingsfout: " . $conn->connect_error);
  }

  // Verwerk het formulier indien ingediend
  if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $callerName = $_POST["callerName"];
    $incidentType = $_POST["incidentType"];
    $description = $_POST["description"];
    
    // Voeg de melding toe aan de database
    $sql = "INSERT INTO meldingen (caller_name, incident_type, description) VALUES ('$callerName', '$incidentType', '$description')";
    if ($conn->query($sql) === TRUE) {
      echo "<p>Melding succesvol toegevoegd.</p>";
    } else {
      echo "<p>Fout bij het toevoegen van de melding: " . $conn->error . "</p>";
    }
  }
  
  // Haal meldingen op uit de database
  $sql = "SELECT * FROM meldingen";
  $result = $conn->query($sql);

  if ($result->num_rows > 0) {
    echo "<h2>Meldingen</h2>";
    echo "<table>";
    echo "<tr><th>Naam van melder</th><th>Type incident</th><th>Beschrijving</th></tr>";
    while ($row = $result->fetch_assoc()) {
      echo "<tr><td>".$row["caller_name"]."</td><td>".$row["incident_type"]."</td><td>".$row["description"]."</td></tr>";
    }
    echo "</table>";
  } else {
    echo "<p>Geen meldingen gevonden.</p>";
  }
  
  // Sluit de databaseverbinding
  $conn->close();
  ?>
  
  <form method="post">
    <label for="callerName">Naam van melder:</label><br>
    <input type="text" id="callerName" name="callerName" required><br>
    <label for="incidentType">Type incident:</label><br>
    <input type="text" id="incidentType" name="incidentType" required><br>
    <label for="description">Beschrijving:</label><br>
    <textarea id="description" name="description" required></textarea><br>
    <input type="submit" value="Melding maken">
  </form>
</body>
</html>
