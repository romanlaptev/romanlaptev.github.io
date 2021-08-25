#!/bin/sh

src_filepath=Subtitles/S01E01.RUS.srt
dst_filepath=Subtitles/S01E01.RUS.vtt
ffmpeg -i $src_filepath $dst_filepath


