#sqlite3 video.sqlite .dump > video.sql
#!/bin/bash

# sqlite3 video.sqlite <<!
# .headers on
# .mode csv
# .output out.csv
# select * from node;
# !

dbName="video.sqlite"

tableName="node"
fields="nid, vid, type, title, created"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode csv
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="node_type"
fields="type, name, orig_type"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode csv
.output ${tableName}.csv
select ${fields} from ${tableName};
!

