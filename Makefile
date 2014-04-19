
all: scripts styles

scripts: vendor/
	php build/scripts.php

styles: vendor/
	php build/styles.php

clean:
	rm -Rf vendor

vendor:
	composer update
