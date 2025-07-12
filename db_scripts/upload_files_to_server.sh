
#
sudo chown -R ubuntu:ubuntu /var/www/proyecto-unah/

#
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/public/views/biblioteca/bibliotecaAdmin.html ubuntu@3.147.72.235:/var/www/proyecto-unah/public/views/biblioteca/


#
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/public/api/visualizarPdf.php ubuntu@3.147.72.235:/var/www/proyecto-unah/public/api/

#/home/velasquez/Descargas/proyecto-unah-main/public/assets/js
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/public/assets/js/biblioteca.js ubuntu@3.147.72.235:/var/www/proyecto-unah/public/assets/js/
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/public/assets/js/resultadosBusquedaBiblioteca.js ubuntu@3.147.72.235:/var/www/proyecto-unah/public/assets/js/


#/home/velasquez/Descargas/proyecto-unah-main/classes/services/biblioteca
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/classes/services/biblioteca/*.php ubuntu@3.147.72.235:/var/www/proyecto-unah/classes/services/biblioteca/


#/home/velasquez/Descargas/proyecto-unah-main/classes/
sudo scp -i /home/velasquez/Descargas/UNAH-CLAVES.pem -r /home/velasquez/Descargas/proyecto-unah-main/classes/upload ubuntu@3.147.72.235:/var/www/proyecto-unah/classes/

