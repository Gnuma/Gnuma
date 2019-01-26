<!DOCTYPE html>
<!--
To change this license header, choose License Headers in Project Properties.
To change this template file, choose Tools | Templates
and open the template in the editor.
-->
<html>
    <?php
    session_start();
    ?>
    <head>
        <meta charset="UTF-8">
        <title>Prenotazioni</title>
        <script>
            function change(e) {
                if (e.target.name === "insert")
                    document.getElementById("form").act.value = "insert";
                else if (e.target.name === "delete")
                    document.getElementById("form").act.value = "delete";
                else
                    console.log("Errore!");
            }
        </script>
    </head>
    <body>
        <form method = "POST" id = "form">
            <label>Nome:</label>
            <input type="text" name="name"/>
            <label>Cognome:</label>
            <input type="text" name="surname"/>
            <label>Posti:</label>
            <input type="text" name="spots" />
            <input type="reset" value="Cancella"/>
            <input type="hidden" name = "act" value="insert" />
            <input type="submit" name="insert" value="Invio" onClick="change(event)"/>
            <input type="submit" name="delete" value="Cancella prenotazione" onClick="change(event)"/>
        </form>
        <?php
        if ($_SERVER['REQUEST_METHOD'] == "POST") {
            switch($_POST['act']){
                case "insert":
                    if ($_POST['spots'] > 4 || $_POST['spots'] < 1) {
                        echo "Numero di posti inseriti non valido";
                        die();
                    }
                    $sum = 0;
                    foreach($_SESSION as $key => $value) {
                        $sum += $value;
                    }
                    if(isset($_SESSION[$_POST['name']." ".$_POST['surname']])){
                        $sum += $_POST['spots']-$_SESSION[$_POST['name']." ".$_POST['surname']];
                        if (($sum + $_POST['spots']) > 20) {
                            echo "Hai cercato di moficare il numero di posti per una prenotazione.<br/>Tuttavia il numero di posti richiesti non è disponibile!";
                            die();
                        }
                        $_SESSION[$_POST['name']." ".$_POST['surname']] = $_POST['spots'];
                    }else{
                        if (($sum + $_POST['spots']) > 20) {
                            echo "Posti non disponibili!";
                            die();
                        }
                        $_SESSION[$_POST['name']." ".$_POST['surname']] = $_POST['spots'];
                    }
                    foreach($_SESSION as $key => $value){
                        echo $key." ".$value."<br/>";
                    }
                    break;
                case "delete":
                    if(isset($_SESSION[$_POST['name']." ".$_SESSION['surname']])){
                        unset($_SESSION[$_POST['name']." ".$_POST['surname']]);
                    }else{
                        echo "Impossibile cancellare la prenotazione!";
                    }
                    foreach($_SESSION as $key => $value){
                        echo $key." ".$value."<br/>";
                    }
            }
        }
        ?>
    </body>
</html>
