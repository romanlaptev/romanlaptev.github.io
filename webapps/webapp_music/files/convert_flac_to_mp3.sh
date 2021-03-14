﻿#!/bin/sh
for flac in *.flac;
do
mpeg=`echo $flac | cut -f1 -d.`.mp3
flac -d -c "$flac" | lame --cbr -b 192 - "$mpeg"
done