ARG VERSION=lts-alpine

FROM node:$VERSION

ARG NODE_ENV="development"

RUN mkdir -p ./client

WORKDIR /client

COPY . .

RUN npm i

RUN chown -R node:node /client/node_modules

EXPOSE 5000

CMD ["npm", "start"]
