
docs_defaults = ui/public/index-1.md \
	ui/public/index-2.md

# copy true type font
docroot/fonts/NotoSansJP-Regular.ttf: ui/fonts/NotoSansJP-Regular.ttf
	mkdir -p $(@D)
	cp $< $@

# copy true tyep font
docroot-fonts: docroot/fonts/NotoSansJP-Regular.ttf

.PHONY: docroot-fonts

docroot-assets:
	rm -r -f $(@D)/assets
	mkdir -p $(@D)

.PHONY: docroot-assets

# copy page division appllication entry
docroot/index.html: ui-dist-index-html docroot-assets
	cp ui/dist/index.html $@
	cp ui/dist/*.svg $(@D)
	cp -r ui/dist/assets $(@D)


# copy domain message
docroot-domain-message: dist-i18n-json
	rm -f -r docroot/domain-message 
	mkdir -p docroot/domain-message 
	cp -r ui/dist-i18n/* docroot/domain-message 

.PHONY: docroot-domain-message

docroot-docs:
	rm -f -r docroot/docs
	mkdir -p docroot/docs/defaults
	cp -r ui/docs-i18n/* docroot/docs
	cp $(docs_defaults) docroot/docs/defaults

.PHONY: docroot-docs


# create ui applicaiton
ui-dist-index-html:
	$(MAKE) -C ui dist/index.html

.PHONY: ui-dist-index-html


# create i18n json files
dist-i18n-json:
	$(MAKE) -C ui dist-i18n-json

.PHONY: dist-i18n-json

# deploy image
deploy-img: docroot/index.html \
	docroot-domain-message \
	docroot-fonts \
	docroot-docs \
	deploy-srv

.PHONY: deploy-img

# syntax check for server module
srv-syntax-check:
	$(MAKE) -C srv syntax-check

.PHONY: srv-syntax-check

# deploy server module	
deploy-srv: srv-syntax-check
	rm -f src/*.php
	cp srv/*.php docroot
	cp srv/.htaccess docroot

.PHONY: deploy-srv

# vi: se ts=4 sw=4 noet: 
