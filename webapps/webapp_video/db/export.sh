#https://sqlite.org/cli.html

#sqlite3 video.sqlite .dump > video.sql
#!/bin/bash

# sqlite3 video.sqlite <<!
# .headers on
# .mode csv
# .output out.csv
# select * from node;
# !

dbName="video.sqlite"

#"csv", "column", "html", "insert", "line", "list", "quote", "tabs", and "tcl".
format="csv"

tableName="node"
fields="nid, vid, type, title, created"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="node_type"
fields="type, name, orig_type"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="taxonomy_term_hierarchy"
fields="tid, parent"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="taxonomy_index"
fields="nid, tid"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="taxonomy_term_data"
fields="tid, vid, name"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="menu_links"
fields="menu_name, mlid, plid, link_path, router_path, link_title, options, module, hidden, external, has_children, expanded,weight, depth, customized, p1, p2, p3, p4, p5, p6, p7, p8, p9, updated"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="book"
fields="mlid, nid, bid"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_body_video"
fields="entity_id, body_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_body"
fields="entity_id, body_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_filename"
fields="entity_id, field_filename_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_subfolder"
fields="entity_id, field_subfolder_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_img_cover"
fields="entity_id, field_img_cover_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_roles"
fields="entity_id, field_roles_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_year"
fields="entity_id, field_year_value"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!

tableName="field_data_field_taxonomy"
fields="entity_id, field_taxonomy_tid"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!


tableName="field_data_field_taxonomy_alpha"
fields="entity_id, field_taxonomy_alpha_tid"
echo "- export table ${tableName}"
sqlite3 ${dbName} <<!
.headers on
.mode ${format}
.output ${tableName}.csv
select ${fields} from ${tableName};
!
