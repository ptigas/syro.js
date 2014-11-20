all: korg_syro_emscripten.c
	emcc korg_syro_emscripten.c -s NO_EXIT_RUNTIME=1 -s EXPORTED_FUNCTIONS="['syrializer']" -O3 --post-js post_syro.js --closure 1 -o syro.js

clean:
	rm	syro.js.*