#find /var/www/sites/gravura -type f -name '*.html' | while read i; do sed "s/http:\\/\\/mycomp\\/transcend\\/0_sites\\//\\//g" "$i" >tmp; mv tmp "$i"; done
find /var/www/sites/gravura -type f -name '*.html' | while read i; do sed "s/http:\\/\\/mycomp\\//\\//g" "$i" >tmp; mv tmp "$i"; done

