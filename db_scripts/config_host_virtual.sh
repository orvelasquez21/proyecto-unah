

sudo chown -R www-data:www-data /var/www/proyecto-unah

sudo chmod -R 755 /var/www/proyecto-unah


sudo nano /etc/apache2/sites-available/proyecto-unah.conf

<VirtualHost *:80>
    ServerAdmin webmaster@localhost
    ServerName 3.147.72.235

    DocumentRoot /var/www/proyecto-unah/public

    <Directory /var/www/proyecto-unah/public>
        Options Indexes FollowSymLinks
        AllowOverride All
        Require all granted
    </Directory>

    ErrorLog ${APACHE_LOG_DIR}/proyecto-unah_error.log
    CustomLog ${APACHE_LOG_DIR}/proyecto-unah_access.log combined
</VirtualHost>


sudo a2ensite proyecto-unah.conf


#Desabilitamos el por defecto de /html/public al caul sirve apache2
sudo a2dissite 000-default.conf

#reiniciar el apache2 
sudo systemctl restart apache2


