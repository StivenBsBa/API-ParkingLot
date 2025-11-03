# Usa una imagen base oficial de Node.js (versión LTS Alpine para un tamaño menor)
FROM node:18-alpine

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /usr/src/app

# Copia los archivos de definición de paquetes y dependencias
COPY package*.json ./

# Instala las dependencias del proyecto
# Usamos --only=production para no instalar devDependencies como nodemon
RUN npm install --only=production

# Copia el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Expone el puerto en el que correrá la aplicación
EXPOSE 3000

# El comando para iniciar la aplicación cuando el contenedor se inicie
CMD [ "node", "index.js" ]
