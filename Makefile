.PHONY: css

CSSMIN=./node_modules/.bin/ycssmin
TARGET=css/styles.min.css

css:
	$(CSSMIN) bower_components/normalize-css/normalize.css > $(TARGET)
	$(CSSMIN) bower_components/suit-button/button.css >> $(TARGET)
	$(CSSMIN) css/main.css >> $(TARGET)

clean:
	rm css/*.min.css