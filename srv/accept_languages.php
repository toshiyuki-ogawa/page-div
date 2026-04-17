<?php
/**
 * iterate accept languages
 * @param accept_language accept language string representation.
 */
function iterate_languages($accept_language) {
    if ($accept_language) {
        $lang_and_values = array_map(function ($elem) {
            $lang_and_value = explode(';q=', $elem);
            if (count($lang_and_value) == 1) {
                $lang_and_value[] = 1;
            }
        }, explode(',', $accept_language));
        $priority_langs = [];
        array_walk($lang_and_values,
            function ($elem, $idx) use($priority_langs) {
                if (array_key_exists($elem[1], $priority_langs)) {
                    $priority_langs[(float) $elem[1]][] = $elem[0];
                } else {
                    $priority_langs[(float) $elem[1]] = [ $elem[0] ];
                }
            });
        krsort($lang_and_values, SORT_NUMERIC);
        array_walk($lang_and_values, function ($elem, $idx) {
            yield $elem;
        });
    }
}
// vi: se ts=4 sw=4 et:
