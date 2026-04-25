<?php

require_once './find_l10n_file.php';

$lang_list = $_SERVER['HTTP_ACCEPT_LANGUAGE'];
$doc_file = $_REQUEST['doc'];

if ($lang_list && $doc_file) {

    $file = find_l10n_file($lang_list, 
        implode('/', [ __DIR__, 'docs']), $doc_file);
    if (!$file) {
        $default_file = implode('/',
            [ __DIR__, 'docs', 'defaults', $doc_file ]);
        if (file_exists($default_file)) {
            $file = $default_file;
        }
    }
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
