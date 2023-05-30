FROM node:16

WORKDIR /app

COPY ./package.json ./
COPY ./yarn.lock ./

RUN yarn install

COPY . .
COPY .env .env

RUN yarn run build

EXPOSE 3000

CMD ["yarn", "start:prod"]
