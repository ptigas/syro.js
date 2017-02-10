(function(window) {
    function intFromBytes(x, big_endian) {
        var val = 0;
        for (var i = 0; i < x.length; ++i) {
            if (big_endian) {
                val += x[i];
            } else {
                val += x[x.length - i - 1];
            }

            if (i < x.length - 1) {
                val = val << 8;
            }
        }
        return val;
    }

    function uint8ArrayToArrayBuffer(buffer) {
        var output = new ArrayBuffer(buffer.byteLength);
        for (var i = 0; i < buffer.byteLength; ++i) {
            output[i] = buffer[i];
        }
        return output;
    }

    var Syrialize = function(audio, num, callback) {
        syro = Module.cwrap(
            'syrializer', 'number', ['number', 'number', 'number', 'number']
        );

        var reader = new FileReader();

        reader.onload = function() {
            data = new Uint8Array(reader.result);

            console.log("data=", data);
            var nDataBytes = data.length * data.BYTES_PER_ELEMENT;
            var dataPtr = Module._malloc(nDataBytes);

            HEAPU8.set(data, dataPtr);

            var size_dest_bytes = 4; // 32 unsigned is 4 bytes;
            var size_dest_ptr = Module._malloc(size_dest_bytes);

            var syralizedData = syro(dataPtr, size_dest_ptr, nDataBytes, num);

            var len = intFromBytes(HEAPU8.subarray(size_dest_ptr, size_dest_ptr + 4), false);

            var res = new Uint8Array(HEAPU8.subarray(syralizedData, syralizedData + len));

            this.audio = new Blob(new Array(res.buffer), {
                type: blob.type
            });

            callback(this.audio);
        };

        reader.readAsArrayBuffer(blob);
    }

    window.Syrialize = Syrialize;
})(window);
