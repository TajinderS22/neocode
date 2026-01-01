FROM node:22

WORKDIR /app

COPY package*.json ./


RUN npm install

COPY ./ ./

RUN mkdir -p /home/user
ENV HOME=/home

RUN npm run build

EXPOSE 8000


CMD [ "npm", "run", "start" ]