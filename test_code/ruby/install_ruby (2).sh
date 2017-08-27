apt-get install ruby 
	apt-get install ruby1.9.1
ruby -v

apt-get install rubygems
gem -v
gem list

apt-get install rails
	gem install rails -v «>=3.2.3″ —no-ri —no-rdoc
rails -v

# integrate apache + rails
(+apt-get install libapache2-mod-ruby)
- apt-get install libapache2-mod-passenger
OR

- gem install passenger
(gem uninstall passenger)
 (ln -s /var/lib/gems/1.8/bin/passenger /usr/bin/passenger)
/var/lib/gems/1.8/bin/passenger-install-apache2-module



# install Redmine
apt-get install redmine
ln -s /usr/share/redmine/public/ /var/www/redmine
chown -R www-data:www-data /var/www/redmine

# create vhost
a2ensite redmine
mcedit /etc/apache2/sites-avalable/redmine
