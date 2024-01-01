FROM node:18.16.2-alpine as build

WORKDIR /app

ENV PATH /app/node_modules/.bin:$PATH

COPY package*.json ./

RUN yarn

COPY . ./

RUN yarn build

FROM nginx:stable-alpine

COPY --from=build /app/dist /usr/share/nginx/port80

COPY ./default.conf /etc/nginx/conf.d/default.conf

EXPOSE 80 81

CMD ["nginx","-g","daemon off;"]