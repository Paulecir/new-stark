FROM node:18-alpine

WORKDIR /usr/src/app
COPY . .
RUN yarn
RUN yarn build


