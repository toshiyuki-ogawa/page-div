<?php
require_once './find_message_file.php';

$lang_list = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
$message_file = $_REQUEST['message'];

if ($lang_list && $message_file) {

    $file = find_message_file($lang_list, 
        implode('/', [__DIR__, 'domain-message']), $message_file);
    if ($file) {
        header('Content-Length: ' . filesize($file));
        http_response_code(200);
        readfile($file);
    } else {
        http_response_code(404);
    }
} else {
    http_response_code(404);
}

// vi: se ts=4 sw=4 et:
