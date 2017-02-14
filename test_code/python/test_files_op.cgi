#!/usr/bin/python
# -*- coding: utf-8 -*-
import os
import sys
#import cgi
#import urllib


# ****************************************
# main
# ****************************************
print "Content-Type: text/html"
print


# обработка ошибки открытия файла
try:
    myfile = open("/opt/etc/init_nas.h","r")
except IOError, err:
    print "<br> :( <br>"
    print err.strerror



