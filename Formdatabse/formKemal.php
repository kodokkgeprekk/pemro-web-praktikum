<?php
date_default_timezone_set("Asia/Jakarta");

// Koneksi ke PostgreSQL
$host = "localhost";
$dbuser = "kemal_354";
$dbpass = "kemal";
$dbport = "5432";
$dbname = "tes1";

$conn = pg_connect("host=$host dbname=$dbname user=$dbuser password=$dbpass");

if (!$conn) {
    die("Koneksi gagal: " . pg_last_error());
}

$pesan = "";

// Proses jika form disubmit
if ($_SERVER["REQUEST_METHOD"] === "POST") {
    // Cek dan ambil data dari form
    $username = $_POST['username'] ?? null;
    $email = $_POST['email'] ?? null;
    $full_name = $_POST['full_name'] ?? null;

    if ($username && $email && $full_name) {
        // Insert ke database
        $query = "INSERT INTO users (username, email, full_name) VALUES ($1, $2, $3)";
        $result = pg_query_params($conn, $query, array($username, $email, $full_name));

        if ($result) {
            $pesan = "<p style='color:green;'>Data berhasil disimpan!</p>";
        } else {
            $pesan = "<p style='color:red;'>Gagal menyimpan data: " . pg_last_error($conn) . "</p>";
        }
    } else {
        $pesan = "<p style='color:red;'>Semua field harus diisi!</p>";
    }
}

pg_close($conn);
?>

<!DOCTYPE html>
<html>
<head>
    <meta charset="UTF-8">
    <title>Form Tambah User</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 20px; }
        form { max-width: 400px; margin: auto; }
        label { display: block; margin-top: 10px; }
        input[type="text"], input[type="email"] {
            width: 100%; padding: 8px; margin-top: 4px; box-sizing: border-box;
        }
        input[type="submit"] {
            margin-top: 15px; padding: 10px 15px;
            background-color: #28a745; color: white; border: none; cursor: pointer;
        }
        .message { text-align: center; margin-bottom: 20px; }
    </style>
</head>
<body>

<h2 style="text-align:center;">Tambah User Baru</h2>

<div class="message">
    <?= $pesan ?>
</div>

<form method="POST" action="form_kemal.php">
    <label for="username">username:</label>
    <input type="text" id="username" name="username" required>

    <label for="email">Email:</label>
    <input type="email" id="email" name="email" required>

    <label for="full_name">Nama Lengkap:</label>
    <input type="text" id="full_name" name="full_name" required>

    <input type="submit" value="Simpan">
</form>

</body>
</html>

//htdocs