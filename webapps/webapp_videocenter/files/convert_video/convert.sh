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

#src_filepath=S01E02.avi
#dst_filepath=S01E02.mp4
#ffmpeg -i $src_filepath -map 0:v:0 -map 0:a:1 -vcodec libx264 -vf scale=640:480 -acodec copy $dst_filepath

#src_filepath="/mnt/terra/video/films/G/Game_of_Thrones/s01/s01e01_Winter is Coming.avi"
#echo $src_filepath
#dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/s01e01_Winter_is_Coming.mp4
#ffmpeg -i "${src_filepath}" -vcodec libx264 -acodec mp3 ${dst_filepath}

#src_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/srt/s01e01_en.srt
#dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/vtt/s01e01_en.vtt
#ffmpeg -i $src_filepath $dst_filepath

#src_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/srt/s01e01_ru.srt
#dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/vtt/s01e01_ru.vtt
#ffmpeg -i $src_filepath $dst_filepath


src_filepath="/mnt/terra/video/films/G/Game_of_Thrones/s01/s01e03_Lord Snow.avi"
dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/s01e03_Lord_Snow.mp4
ffmpeg -i "${src_filepath}" -vcodec libx264 -acodec mp3 ${dst_filepath}

src_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/Subtitles/s01e03_en.srt
dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/Subtitles/vtt/s01e03_en.vtt
ffmpeg -i $src_filepath $dst_filepath

src_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/Subtitles/s01e03_ru.srt
dst_filepath=/mnt/terra/video/films/G/Game_of_Thrones/s01/Subtitles/vtt/s01e03_ru.vtt
ffmpeg -i $src_filepath $dst_filepath
