#!/usr/bin/python
# -*- coding: utf-8 -*-
print "Content-type:text/html"
print ""
print "<html>"
print "<head>"
print "<meta charset='utf-8'/>"
print "</head>"

print "<body>"
print "<h2>Test SQLite</h2>"
import sqlite as db
c = db.connect(database="tvprogram")
cu = c.cursor()
"""
try:
	cu.execute("""
#		CREATE TABLE tv (
#		tvdate DATE,
#		tvweekday INTEGER,
#		tvchannel VARCHAR(30),
#		tvtime1 TIME,
#		tvtime2 TIME,
#		prname VARCHAR(150),
#		prgenre VARCHAR(40)
#	);
""")
except db.DatabaseError, x:
	print "Ошибка: ", x
c.commit()
"""
"""
try:
	cu.execute("""
#	CREATE TABLE wd (
#	weekday INTEGER,
#	wdname VARCHAR(11)
#	);
""")
except db.DatabaseError, x:
	print "Ошибка: ", x

c.commit()
"""
#INSERT
#weekdays = ["Воскресенье", "Понедельник", "Вторник", "Среда","Четверг", "Пятница", "Суббота", "Воскресенье"]
#cu.execute("""DELETE FROM wd;""")
#cu.executemany("""INSERT INTO wd VALUES (%s, %s);""",enumerate(weekdays))
#c.commit()

#SELECT
cu.execute("SELECT weekday, wdname FROM wd ORDER BY weekday;")
for i, n in cu.fetchall():
	print i, n + "<br>";

c.close()
print "</body>"
print "</html>"


