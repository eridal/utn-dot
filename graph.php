<?php

if (array_key_exists('svg', $_POST)) {
    $data = base64_encode($_POST['svg']);
    echo "data:image/svg+xml;base64,$data";
}
