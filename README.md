# flight-visibility [![Build Status](https://secure.travis-ci.org/brettstimmerman/flight-visibility.png)](http://travis-ci.org/brettstimmerman/flight-visibility)

A [Flight](https://github.com/twitter/flight) component for the
[Page Visibility API](https://developer.mozilla.org/en-US/docs/Web/Guide/User_experience/Using_the_Page_Visibility_API).


## Installation

```bash
bower install --save flight-visibility
```

## Example

```js
define(['flight-visibility'], function (Visibility) {

  $(document).on('visibility-supported', function () {
    console.log('Page visibility is supported.');
  });

  $(document).on('visibility-unsupported', function () {
    console.log('Page visibility is not supported.');
  });

  $(document).on('visibility-visible', function () {
    console.log('The page is visible.');
  });

  $(document).on('visibility-hidden', function () {
    console.log('The page is hidden.');
  });

  $(document).on('visibility-prerender', function () {
    console.log('The page is pre-rendering.');
  });

  $(document).on('visibility-change', function (e, state) {
    console.log('State:', state);
  });

  Visibility.attachTo(document);

});
```

## Known Issues

An open [Chromium issue](https://code.google.com/p/chromium/issues/detail?id=117082)
prevents minimized windows from becoming hidden on OS X.

## Development

Development of this component requires [Bower](http://bower.io), and preferably
[Karma](http://karma-runner.github.io) to be globally installed:

```bash
npm install -g bower karma
```

Then install the Node.js and client-side dependencies by running the following
commands in the repo's root directory.

```bash
npm install
bower install
```

To continuously run the tests in Chrome and Firefox during development, just run:

```bash
karma start
```

## Contributing to this project

Anyone and everyone is welcome to contribute. Please take a moment to
review the [guidelines for contributing](CONTRIBUTING.md).

* [Bug reports](CONTRIBUTING.md#bugs)
* [Feature requests](CONTRIBUTING.md#features)
* [Pull requests](CONTRIBUTING.md#pull-requests)
