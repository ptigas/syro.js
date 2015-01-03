EMCC=emcc
SYROJS=build/syro.js
INCLUDES=volcasample
SOURCES=src/korg_syro_emscripten.c\
		src/post_syro.js

all: $(SOURCES)
	$(EMCC) -I$(INCLUDES) src/korg_syro_emscripten.c -s NO_EXIT_RUNTIME=1 -s EXPORTED_FUNCTIONS="['syrializer']" -O1 --post-js src/post_syro.js --closure 1 -o $(SYROJS)
