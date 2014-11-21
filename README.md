syro.js
=======

This is a javascript library for Korg Volca Sample, which uses SYRO SDK. More details about the sdk you can check here https://github.com/korginc/volcasample .

Usage
---

Include `build\syro.js` to your project. You can apply the function below on an [audio context](https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API) get a downloadable wav file to sing for your volca.

```
function serializeData(audio, file)
    {
      bufferToWav(audio, function(blob) {
        Syrialize(blob, function(a) {
          Recorder.forceDownload(a, 'syro.wav');
        });
      });  
    }
```

Build
---
You need to install [emscripten](https://github.com/kripken/emscripten).

Then, you should be able to run `make` and build the minified `*.js` files in `build` folder.
