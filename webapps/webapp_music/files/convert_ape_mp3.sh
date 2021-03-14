avconv -i 'Dunkelschon - Nemeton.ape' -id3v2_version 3 -codec:a libmp3lame -b 256k 'output.mp3'
sudo apt-get install mp3splt
mp3splt -a -c Dunkelschon\ -\ Nemeton.cue output.mp3
