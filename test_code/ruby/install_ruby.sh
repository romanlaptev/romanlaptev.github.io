apt-get install ruby 
	apt-get install ruby1.9.1
ruby -v

apt-get install rubygems
gem -v
gem list

apt-get install rails
	gem install rails -v «>=3.2.3″ —no-ri —no-rdoc
rails -v

apt-get install libapache2-mod-ruby

# install Redmine
apt-get install redmine
ln -s /usr/share/redmine/public/ /var/www/redmine
chown -R www-data:www-data /var/www/redmine

# create vhost
a2ensite redmine
mcedit /etc/apache2/sites-avalable/redmine
