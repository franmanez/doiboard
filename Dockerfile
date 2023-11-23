# Etapa 1: Construir la aplicación Vue.js
FROM node:18 as build-stage

WORKDIR /app

COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build

# Etapa 2: Configurar Nginx y copiar la versión compilada de la aplicación
FROM nginx:alpine

# Eliminar la configuración de Nginx existente
RUN rm -rf /usr/share/nginx/html/*

COPY --from=build-stage /app/dist /usr/share/nginx/html

COPY nginx-default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
