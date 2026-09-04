#!/bin/sh

#xdg-open "http://127.0.0.1:8092"
python3 -m http.server --protocol HTTP/1.1 --bind 127.0.0.1 8092
