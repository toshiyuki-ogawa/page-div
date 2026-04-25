
dist-18n-jsons = dist-i18n/ja/page-div.json \
	dist-i18n/ja/index.json

src-i18n-jsons = src-i18n/ja/page-div.po \
	src-i18n/ja/index.po


index_html_sources = $(wildcard src/*)

dist/index.html : index.html $(index_html_sources) 
	npm run build

$(dist-18n-jsons) &: $(src-i18n-jsons)
	npm run gen-i18n

dist-i18n-json : $(dist-18n-jsons)

.PHONY: dist-i18n-json

# vi: se ts=4 sw=4 noet: 
