# Use Node for building
FROM node:22 AS build

WORKDIR /app
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build

# Use Nginx to serve the frontend
FROM nginx:latest
COPY --from=build /app/dist /usr/share/nginx/html
# default port for nginx, just to inform, actual running port is set in docker-compose
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
