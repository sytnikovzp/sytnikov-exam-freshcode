ARG VERSION=lts-alpine

FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir /server \
    && mkdir -p /public/images \
    && mkdir -p /var/www/html/images

RUN apk add --no-cache wget && \
    wget https://github.com/jwilder/dockerize/releases/download/v0.6.1/dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    tar -C /usr/local/bin -xzvf dockerize-alpine-linux-amd64-v0.6.1.tar.gz && \
    rm dockerize-alpine-linux-amd64-v0.6.1.tar.gz

WORKDIR /server

COPY . .

RUN npm i

RUN chown -R node:node /server/node_modules

EXPOSE 3000

# CMD sequelize db:migrate && sequelize db:seed:all && npm start
# CMD npm start

CMD ["dockerize", "-wait", "tcp://postgres_dev:5432", "-wait", "tcp://mongo_dev:27017", "-timeout", "30s", "npm", "start"]