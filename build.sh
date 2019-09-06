#!/usr/bin/env bash

# Automated build script. Intended for continuous integration use.

set -ex

yarn install


rm -rf checkstyle-*.xml coverage-js htdocs/*.min.* junit.xml

yarn -s test || true

yarn -s pkglint || true

yarn -s lint --format node_modules/eslint-formatter-checkstyle-* \
     > checkstyle-eslint.xml || true

yarn -s build

exit 0
