<?php
$processed = false;

$parsed_uri = parse_url($_SERVER['REQUEST_URI']);
if (preg_match('/.+\.html$/', $parsed_uri['path'])) {
    $end_slash = strrpos($parsed_uri['path'], '/', -1);
    $index_html = implode('/', [
        $_SERVER['DOCUMENT_ROOT'],
        substr($parsed_uri['path'], 0, $end_slash + 1),
        'index.html'
    ]); 
    if (file_exists($index_html)) {
        header('Content-Length: ' . filesize($index_html));
        http_response_code(200);
        readfile($index_html);
    } else {
        http_response_code(404);
    } 
    $processed = true;
} else {
    $file_path = implode(
        '/',
        [ $_SERVER['DOCUMENT_ROOT'], $parsed_uri['path'] ]);

    if (!file_exists($file_path)) {
        http_response_code(404);
        $processed = true;
    }
}
return $processed;
// vi: se ts=4 sw=4 et:
