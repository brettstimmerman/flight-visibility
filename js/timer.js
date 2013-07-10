define(function () {
  var handle;
  var value = 0;

  function resume() {
    handle = setInterval(update, 1000);
  }

  function pause() {
    clearInterval(handle);
  }

  function update() {
    value += 1;

    $('.timer').html(value);
  }

  return {
    pause: pause,
    resume: resume,
    start: resume
  };
});
