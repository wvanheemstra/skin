<?php
    header('Content-Type: application/json');
    readfile("../api/" . $_GET['api']);
?>