
# copy true type font
docroot/fonts/NotoSansJP-Regular.ttf: ui/fonts/NotoSansJP-Regular.ttf
	mkdir -p $(@D)
	cp $< $@

# copy true tyep font
docroot-fonts: docroot/fonts/NotoSansJP-Regular.ttf

.PHONY: docroot-fonts

# copy page division appllication entry
docroot/page-div.html: ui/dist/index.html ui-dist-index-html
	rm -r -f $(@D)/assets
	cp $< $@
	cp -r $(<D)/assets $(@D)

# copy domain message
docroot-domain-message: dist-i18n-json
	rm -f -r docroot/domain-message 
	mkdir -p docroot/domain-message 
	cp -r ui/dist-i18n/* docroot/domain-message 

.PHONY: docroot-domain-message

# create ui applicaiton
ui-dist-index-html:
	$(MAKE) -C ui dist/index.html

.PHONY: ui-dist-index-html

# create i18n json files
dist-i18n-json:
	$(MAKE) -C ui dist-i18n-json

.PHONY: dist-i18n-json

# deploy image
deploy-img: docroot/page-div.html \
	docroot-domain-message \
	docroot-fonts \
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

.PHONY: deploy-srv

# vi: se ts=4 sw=4 noet: 
