# Thanks to https://medium.com/ai2-blog/dockerizing-a-react-application-3563688a2378
FROM mhart/alpine-node:10.15.3

WORKDIR /app

RUN npm install -g serve forever

COPY package.json ./
COPY yarn.lock ./
RUN yarn

COPY . ./

RUN yarn build

EXPOSE 3333
EXPOSE 5000

CMD forever start server.js && serve -s build
