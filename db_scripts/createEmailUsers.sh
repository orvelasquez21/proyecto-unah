##!/bin/bash
#
## Archivo JSON de entrada
#JSON_FILE="approvedApplicants.json"
#
## Dominio institucional
#DOMINIO="unah.hn"
#
## Verificar que jq esté instalado
#if ! command -v jq &> /dev/null; then
#    echo "jq no está instalado. Instálalo con: sudo apt install jq"
#    exit 1
#fi
#
## Iterar sobre cada estudiante en el JSON
#jq -c '.[]' "$JSON_FILE" | while read -r estudiante; do
#    nombre_completo=$(echo "$estudiante" | jq -r '.nombre_completo')
#    password=$(echo "$estudiante" | jq -r '.password')
#
#    # Separar el nombre completo en partes
#    read -ra partes <<< "$nombre_completo"
#    total=${#partes[@]}
#
#    username=""
#
#    if [[ $total -eq 4 ]]; then
#        # Caso con exactamente 4 partes
#        username+=${partes[0]:0:1}
#        username+=${partes[1]:0:1}
#        username+=${partes[2],,}
#        username+=${partes[3]:0:1}
#    elif [[ $total -gt 4 ]]; then
#        # Caso con más de 4 partes
#        # Primeras tres letras iniciales
#        username+=${partes[0]:0:1}
#        username+=${partes[1]:0:1}
#        username+=${partes[2]:0:1}
#        # Cuarto campo completo
#        username+=${partes[3],,}
#        # Quinta parte en adelante: primera letra de cada una
#        for (( i=4; i<$total; i++ )); do
#            username+=${partes[$i]:0:1}
#        done
#    else
#        echo "❌ Error: El nombre '$nombre_completo' no tiene el formato esperado (mínimo 4 partes)."
#        continue
#    fi
#
#    # Convertir a minúsculas
#    username=$(echo "$username" | tr '[:upper:]' '[:lower:]')
#
#    # Crear usuario de sistema
#    sudo adduser --disabled-password --gecos "$nombre_completo" "$username"
#
#    # Asignar la contraseña
#    echo "$username:$password" | sudo chpasswd
#
#    # Mostrar resultado
#    echo "✅#!/bin/bash
#
## Archivo JSON de entrada
#JSON_FILE="estudiantes.json"
#
## Dominio institucional
#DOMINIO="midominio.edu.hn"
#
## Verificar que jq esté instalado
#if ! command -v jq &> /dev/null; then
#    echo "jq no está instalado. Instálalo con: sudo apt install jq"
#    exit 1
#fi
#
## Iterar sobre cada estudiante en el JSON
#jq -c '.[]' "$JSON_FILE" | while read -r estudiante; do
#    nombre_completo=$(echo "$estudiante" | jq -r '.nombre_completo')
#    password=$(echo "$estudiante" | jq -r '.password')
#
#    # Separar el nombre completo en partes
#    read -ra partes <<< "$nombre_completo"
#    total=${#partes[@]}
#
#    username=""
#
#    if [[ $total -eq 4 ]]; then
#        # Caso con exactamente 4 partes
#        username+=${partes[0]:0:1}
#        username+=${partes[1]:0:1}
#        username+=${partes[2],,}
#        username+=${partes[3]:0:1}
#    elif [[ $total -gt 4 ]]; then
#        # Caso con más de 4 partes
#        # Primeras tres letras iniciales
#        username+=${partes[0]:0:1}
#        username+=${partes[1]:0:1}
#        username+=${partes[2]:0:1}
#        # Cuarto campo completo
#        username+=${partes[3],,}
#        # Quinta parte en adelante: primera letra de cada una
#        for (( i=4; i<$total; i++ )); do
#            username+=${partes[$i]:0:1}
#        done
#    else
#        echo "❌ Error: El nombre '$nombre_completo' no tiene el formato esperado (mínimo 4 partes)."
#        continue
#    fi
#
#    # Convertir a minúsculas
#    username=$(echo "$username" | tr '[:upper:]' '[:lower:]')
#
#    # Crear usuario de sistema
#    sudo adduser --disabled-password --gecos "$nombre_completo" "$username"
#
#    # Asignar la contraseña
#    echo "$username:$password" | sudo chpasswd
#
#    # Mostrar resultado
#    echo "✅ Usuario creado: $username@$DOMINIO"
#done
#
#echo "🎉 Todos los usuarios fueron creados correctamente."
# Usuario creado: $username@$DOMINIO"
#done
#
#echo "🎉 Todos los usuarios fueron creados correctamente."
#!/bin/bash

# Archivo JSON de entrada
JSON_FILE="approvedApplicants.json"

# Dominio institucional
DOMINIO="unah.hn"

# Verificar que jq esté instalado
if ! command -v jq &> /dev/null; then
    echo "jq no está instalado. Instálalo con: sudo apt install jq"
    exit 1
fi

# Iterar sobre cada estudiante en el JSON
jq -c '.[]' "$JSON_FILE" | while read -r estudiante; do

    # Extraer campos existentes
    primer_nombre=$(echo "$estudiante" | jq -r '.primer_nombre // empty')
    segundo_nombre=$(echo "$estudiante" | jq -r '.segundo_nombre // empty')
    tercer_nombre=$(echo "$estudiante" | jq -r '.tercer_nombre // empty')
    cuarto_nombre=$(echo "$estudiante" | jq -r '.cuarto_nombre // empty')
    quinto_nombre=$(echo "$estudiante" | jq -r '.quinto_nombre // empty')
    primer_apellido=$(echo "$estudiante" | jq -r '.primer_apellido // empty')
    segundo_apellido=$(echo "$estudiante" | jq -r '.segundo_apellido // empty')
    password=$(echo "$estudiante" | jq -r '.password')

    # Construir username según la cantidad de campos
    username=""

    if [[ -n "$primer_apellido" && -n "$segundo_apellido" ]]; then
        # Caso con nombres y apellidos separados (4 partes)
        username+=${primer_nombre:0:1}
        username+=${segundo_nombre:0:1}
        username+=${primer_apellido,,}
        username+=${segundo_apellido:0:1}
    elif [[ -n "$tercer_nombre" && -n "$cuarto_nombre" ]]; then
        # Caso con más de 4 partes (5 o más)
        username+=${primer_nombre:0:1}
        username+=${segundo_nombre:0:1}
        username+=${tercer_nombre:0:1}
        username+=${cuarto_nombre,,}

        # Si hay quinto nombre o más, agrega su primera letra
        if [[ -n "$quinto_nombre" ]]; then
            username+=${quinto_nombre:0:1}
        fi
    else
        echo "❌ Error: El registro no tiene los campos requeridos."
        continue
    fi

    # Convertir username a minúsculas
    username=$(echo "$username" | tr '[:upper:]' '[:lower:]')

    # Crear nombre completo para el campo GECOS
    nombre_completo="$primer_nombre $segundo_nombre $tercer_nombre $cuarto_nombre $quinto_nombre $primer_apellido $segundo_apellido"

    # Crear usuario de sistema
    sudo adduser --disabled-password --gecos "$nombre_completo" "$username"

    # Asignar la contraseña
    echo "$username:$password" | sudo chpasswd

    # Mostrar resultado
    echo "✅ Usuario creado: $username@$DOMINIO"
done

echo "🎉 Todos los usuarios fueron creados correctamente."

