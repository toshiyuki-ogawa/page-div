
php_sources = $(wildcard *.php)


syntax-check: $(php_sources)
	for f in $^ ; do \
		php -l $$f; \
		last_err=$$?; \
		test $$last_err = 0 || exit $$last_err; \
	done

.PHONY: syntax-check

# vi: se ts=4 sw=4 noet:
