define(function (require) {

  'use strict';

  var defineComponent = require('flight/lib/component');

  return defineComponent(visibility);

  function visibility() {
    var _doc = document || {};

    this.getEventName = function () {
      return this.getVendorPrefix() + 'visibilitychange';
    };

    this.getHiddenProperty = function () {
      // Look for the mock property used for testing.
      if ('_mockHidden' in _doc) {
        return (_doc._mockHidden === 'unsupported') ? undefined : '_mockHidden';
      }

      // Look for the standard property.
      if ('hidden' in _doc) {
        return 'hidden';
      }

      // Look for a vendor-prefixed property.
      var prefixes = ['webkit', 'moz', 'ms', 'o'];
      var hiddenProperty;

      for (var i = 0, len = prefixes.length; i < len; ++i) {
        hiddenProperty = prefixes[i] + 'Hidden';

        if (hiddenProperty in _doc) {
          return hiddenProperty;
        }
      }

      // No property found. Assume Page Visibility is unsupported.
    };

    this.getVendorPrefix = function () {
      return this.getHiddenProperty().replace(/hidden/i, '');
    };

    this.getStateProperty = function () {
      var prefix = this.getVendorPrefix();
      return prefix ? prefix + 'VisibilityState' : 'visibilityState';
    };

    this.handleVisibilityChange = function (e) {
      var state = _doc[this.getStateProperty()];

      this.trigger('visibility-change', { event: e, state: state });
      this.trigger('visibility-' + state);
    };

    this.isSupported = function () {
      return !!this.getHiddenProperty();
    };

    this.after('initialize', function () {
      if (this.isSupported()) {
        this.trigger('visibility-supported');
        this.on(_doc, this.getEventName(), this.handleVisibilityChange);
        return;
      }

      this.trigger('visibility-unsupported');
    });
  }

});
