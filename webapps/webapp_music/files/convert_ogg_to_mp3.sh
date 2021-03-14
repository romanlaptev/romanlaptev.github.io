#!/bin/sh
# m4a to mp3
# sudo apt-get install faad
#for i in *.m4a; 
#do
#faad "$i"
#x=`echo "$i"|sed -e 's/.m4a/.wav/'`
#y=`echo "$i"|sed -e 's/.m4a/.mp3/'`
#lame -h -b 192 "$x" "$y"
#rm "$x"
#done

#Debian8, install ffmpeg
#echo "deb http://www.deb-multimedia.org jessie main non-free" >> /etc/apt/sources.list
#echo "deb-src http://www.deb-multimedia.org jessie main non-free" >> /etc/apt/sources.list
#apt-get update
#apt-get install deb-multimedia-keyring
#apt-get update
#apt-get install ffmpeg

for i in *.ogg;
do
ffmpeg -i "$i" "$i".mp3
done
