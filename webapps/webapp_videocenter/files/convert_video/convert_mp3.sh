#!/bin/sh

#mkvinfo S05E01.mkv
#mkvextract tracks S05E02.mkv 4:test1.srt
#mencoder S05E01_.mkv -oac mp3lame -ovc copy -o S05E01.avi


#src_filepath=S01E01.avi
#dst_filepath=S01E01.mp4

#mkvmerge -i $src_filepath
#Файл 'S01E01.avi': контейнер: AVI
#ID дорожки 0: video (MPEG-4p2)
#ID дорожки 1: audio (AC3/EAC3)
#ID дорожки 2: audio (AC3/EAC3)

#http://ffmpeg.org/ffmpeg.html#Advanced-options
#ffmpeg -i $src_filepath -map 0:v:0 -map 0:a:1 -vcodec libx264 -vf scale=640:480 -acodec copy $dst_filepath

#src_filepath=S01E01.mp4
#dst_filepath=S01E01_mp3.mp4
#ffmpeg -i $src_filepath -vcodec copy -acodec mp3 $dst_filepath
#mv S01E01.mp4 S01E01_ac3.mp4
#mv S01E01_mp3.mp4 S01E01.mp4

#src_filepath=S01E02.mp4
#dst_filepath=S01E02_mp3.mp4
#ffmpeg -i $src_filepath -vcodec copy -acodec mp3 $dst_filepath


#src_filepath=/mnt/terra/video/videoclips/A/The-Adicts-Steamroller.flv
#dst_filepath=/mnt/terra/video/videoclips/A/The-Adicts-Steamroller.mp4
#ffmpeg -i $src_filepath -vcodec copy -acodec mp3 $dst_filepath

src_filepath=/mnt/terra/video/films/I/Idiocracy/Idiocracy.avi
dst_filepath=/mnt/terra/video/films/I/Idiocracy/Idiocracy.mp4
ffmpeg -i $src_filepath -vcodec copy -acodec mp3 $dst_filepath


