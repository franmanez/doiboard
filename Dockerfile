# Utilizar una imagen ligera de Nginx como base
FROM nginx:alpine

# Eliminar la configuración de Nginx existente
RUN rm -rf /usr/share/nginx/html/*

# Copiar los archivos optimizados de la carpeta dist al directorio de Nginx
COPY dist/ /usr/share/nginx/html

# Puerto en el que escucha Nginx por defecto
EXPOSE 80

# Comando para iniciar Nginx
CMD ["nginx", "-g", "daemon off;"]
