FROM node:10.15.3-alpine

COPY . /app
WORKDIR /app

RUN npm install

EXPOSE 3000

ENTRYPOINT ["node", "index.js"]
