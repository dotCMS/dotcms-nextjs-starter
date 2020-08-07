FROM node:10.15.3-alpine
WORKDIR /app
COPY package.json .
RUN npm install
COPY . /app
EXPOSE 5000
ENTRYPOINT ["node", "server/server.js"]
