syro.js
=======

This is a javascript library for Korg Volca Sample, which uses SYRO SDK. You can play with it on http://ptigas.com/syrializer/.


Read about the sdk here https://github.com/korginc/volcasample.

Usage
---

Include [Recorderjs](https://github.com/mattdiamond/Recorderjs) and `build\syro.js` to your project. You can apply the functions below on an [audio context](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) to download a syro song for your volca sample.

```javascript
function serializeData(audio, file)
{
  bufferToWav(audio, function(blob) {
    Syrialize(blob, function(a) {
      Recorder.forceDownload(a, 'syro.wav');
    });
  });  
}
```

where `bufferToWav` is a little helper
```javascript
function bufferToWav(buffer, callback)
{
  var worker = new Worker('[path to Recorderjs]/recorderWorker.js');

  // initialize the new worker
  worker.postMessage({
    command: 'init',
    config: {sampleRate: 44100}
  });

  // callback for `exportWAV`
  worker.onmessage = function( e ) {
    blob = e.data;
    callback(blob);
    // this is would be your WAV blob
  };

  // send the channel data from our buffer to the worker
  worker.postMessage({
    command: 'record',
    buffer: [
      buffer.getChannelData(0),
      buffer.getChannelData(buffer.numberOfChannels-1)
    ]
  });

  // ask the worker for a WAV
  worker.postMessage({
    command: 'exportWAV',
    type: 'audio/wav'
  });
}
```

Build
---
First install [emscripten](https://github.com/kripken/emscripten).

Then, run `make` to build the minified `js` file. It should appear in `build` folder.
