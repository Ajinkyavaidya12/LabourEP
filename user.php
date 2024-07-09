<?php
// Include the database connection file
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "khushi1";

// Create connection
$conn = mysqli_connect($servername, $username, $password, $dbname);

// Check connection
if (!$conn) {
    die("Connection failed: " . mysqli_connect_error());
}

// Create users table if it doesn't exist
$sql_create_table = "CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    fullname VARCHAR(255) NOT NULL,
    mobile VARCHAR(20) NOT NULL,
    address VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
)";

if (mysqli_query($conn, $sql_create_table)) {
    echo "Table created successfully.<br>";
} else {
    echo "Error creating table: " . mysqli_error($conn) . "<br>";
}

// Retrieve form data
$fullname = $_POST['fullname'] ?? ''; // Define key for full name
$mobile = $_POST['phone'] ?? ''; // Define key for phone
$address = $_POST['address'] ?? ''; // Define key for address
$password = $_POST['password'] ?? ''; // Define key for password

// Hash the password
$hashed_password = password_hash($password, PASSWORD_DEFAULT);

// SQL query to insert data into the users table
$sql = "INSERT INTO users (fullname, mobile, address, password) VALUES ('$fullname', '$mobile', '$address', '$hashed_password')";

// Execute the query
if (mysqli_query($conn, $sql)) {
    // If the record is inserted successfully, redirect to home.html
    header("Location: home.html");
    exit; // Terminate script execution after redirection
} else {
    echo "Error: " . $sql . "<br>" . mysqli_error($conn);
}

// Close the database connection
mysqli_close($conn);
?>
