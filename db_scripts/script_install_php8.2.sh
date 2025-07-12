#!/bin/bash

# Script: install_php8.2.sh
# Autor: Tu nombre
# Descripción: Instala PHP 8.2 en Ubuntu junto con extensiones comunes.

echo "==========================="
echo "  Instalación de PHP 8.2"
echo "==========================="

# [1] Actualizar lista de paquetes disponibles
echo "[1/5] Actualizando paquetes..."
sudo apt update   # Descarga la lista de paquetes actualizada desde los repositorios configurados

# [2] Instalar software-properties-common si no está
echo "[2/5] Instalando software-properties-common..."
sudo apt install -y software-properties-common  #  Herramienta para manejar repositorios PPA fácilmente

# [3] Agregar el PPA de Ondřej Surý que contiene PHP 8.2
echo "[3/5] Agregando repositorio PPA de PHP..."
sudo add-apt-repository ppa:ondrej/php -y  #  Añade repositorio de PHP mantenido por Ondřej Surý

# [4] Actualizar lista de paquetes nuevamente después de agregar el PPA
echo "[4/5] Actualizando paquetes después de agregar el PPA..."
sudo apt update   #  Vuelve a descargar la lista de paquetes, ahora incluyendo el nuevo repositorio PHP

# [5] Instalar PHP 8.2 y extensiones comunes
echo "[5/5] Instalando PHP 8.2 y extensiones recomendadas..."
sudo apt install -y php8.2 php8.2-cli php8.2-fpm php8.2-mysql php8.2-curl php8.2-xml php8.2-mbstring php8.2-zip
#  Instala PHP 8.2, el intérprete CLI, FastCGI (para Nginx), y extensiones comunes:
#     - php8.2-mysql: conexión a MySQL/MariaDB
#     - php8.2-curl: peticiones HTTP
#     - php8.2-xml: manejo de XML
#     - php8.2-mbstring: soporte multibyte (UTF-8)
#     - php8.2-zip: compresión y lectura de archivos zip

# [6] Verificar versión de PHP instalada
echo "==========================="
echo " PHP instalado:"
php -v  #  Muestra la versión de PHP para confirmar la instalación
echo "==========================="

echo "Instalación completada."
