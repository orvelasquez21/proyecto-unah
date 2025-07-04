#!/bin/bash

#!/bin/bash

# Script: install_mysql.sh
# Autor: Orlin Aguilar
# Descripción: Instala MySQL Server en Ubuntu y verifica el servicio.

echo "==========================="
echo "  Instalación de MySQL"
echo "==========================="

# Actualizar lista de paquetes
echo "[1/3] Actualizando paquetes..."
sudo apt update

# Instalar MySQL Server
echo "[2/3] Instalando MySQL Server..."
sudo apt install -y mysql-server

# Verificar estado del servicio MySQL
echo "[3/3] Verificando estado de MySQL..."
sudo systemctl status mysql

echo "==========================="
echo " Instalación completada. "
echo "==========================="

# Mensaje final
echo "Para entrar al cliente MySQL, usa: sudo mysql"

