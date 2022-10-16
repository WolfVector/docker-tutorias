FROM node

RUN mkdir -p /home/app

COPY ./web_project /home/app

WORKDIR /home/app

RUN npm install
RUN npm run build

CMD ["npm", "run", "start"]