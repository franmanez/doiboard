# Usar una imagen de Node.js 18 como base
FROM node:18

# Establecer el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copiar el archivo package.json y package-lock.json al directorio de trabajo
COPY package*.json ./

# Instalar las dependencias de la aplicación
RUN npm install

# Copiar el resto de los archivos de la aplicación al directorio de trabajo
COPY . .

# Compilar la aplicación (esto puede variar según cómo configures tu proyecto Vue)
RUN npm run build

# Exponer el puerto en el que se ejecutará la aplicación (generalmente el puerto 80)
EXPOSE 80

# Comando para iniciar la aplicación (esto también puede variar según tu configuración)
CMD [ "npm", "run", "start" ]
