FROM node:20-alpine AS build

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

#build html,css,js files
RUN npm run build -- --configuration production


FROM nginx:alpine

RUN rm -rf /usr/share/nginx/html/*

COPY --from=build /app/dist/event-planner/browser /usr/share/nginx/html

#my custom nginx
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80

ARG API_URL=backend-crt-20225061-dev.apps.rm1.0a51.p1.openshiftapps.com
ENV NG_BUILD_API_URL=$API_URL
CMD ["nginx", "-g", "daemon off;"]
