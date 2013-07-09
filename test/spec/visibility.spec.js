'use strict';

describeComponent('lib/visibility', function () {

  // Event API wrappers.
  function createEvent(name) {
    var event;

    if (document.createEvent) {
      event = document.createEvent('Event');
      event.initEvent(name, true, true);
    } else {
      event = document.createEventObject();
      event.eventType = name;
    }

    event.eventName = name;

    return event;
  }

  function dispatch (name) {
    var event = createEvent(name);

    if (document.dispatchEvent) {
      document.dispatchEvent(event);
    } else {
      document.fire('on' + event.eventType, event);
    }
  }

  var supportedSpy = spyOnEvent(document, 'visibility-supported');
  var unsupportedSpy = spyOnEvent(document, 'visibility-unsupported');

  // Initialize the component and attach it to the DOM
  beforeEach(function () {
    setupComponent();

    document._mockHidden = false;
    document._mockVisibilityState = 'visible';
  });

  it('should be defined', function () {
    expect(this.component).toBeDefined();
  });

  it('should emit `visibility-visible` when the page becomes visible', function () {
    var eventSpy = spyOnEvent(document, 'visibility-visible');

    dispatch(this.component.getEventName());

    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should emit `visibility-hidden` when the page becomes hidden', function () {
    var eventSpy = spyOnEvent(document, 'visibility-hidden');

    document._mockHidden = true;
    document._mockVisibilityState = 'hidden';

    dispatch(this.component.getEventName());

    expect(eventSpy).toHaveBeenTriggeredOn(document);
  });

  it('should emit `visibility-change` when the visibility state changes', function () {
    var eventSpy = spyOnEvent(document, 'visibility-change');

    var testChange = function (options) {
      document._mockHidden = options.hidden;
      document._mockVisibilityState = options.state;

      dispatch(this.component.getEventName());

      var data = eventSpy.mostRecentCall.data;

      expect(eventSpy).toHaveBeenTriggeredOn(document);
      expect(data.event.type).toEqual(this.component.getEventName());
      expect(data.state).toEqual(document[this.component.getStateProperty()]);
    }.bind(this);

    testChange({ hidden: true, state: 'prerender'});
    testChange({ hidden: true, state: 'hidden' });
    testChange({ hidden: false, state: 'visible' });
  });

  it('should emit `visibility-supported` when the Page Visibility API is supported', function () {
    expect(supportedSpy).toHaveBeenTriggeredOn(document);
  });

  it('should emit `visibility-unsupported` when the Page Visibility API is not supported', function () {
    document._mockHidden = 'unsupported';
    setupComponent();
    expect(unsupportedSpy).toHaveBeenTriggeredOn(document);
  });
});
