FROM node:14-alpine AS development

WORKDIR /usr/src/app

COPY package*.json ./
RUN npm  cache clear --force
RUN npm install --legacy-peer-deps

COPY . .

RUN npm start

FROM node:14-alpine AS production

ARG NODE_ENV=production
ENV NODE_ENV=${NODE_ENV}

WORKDIR /usr/src/app

COPY package.json ./

RUN npm  cache clear --force
RUN npm install --legacy-peer-deps

COPY . .


COPY --from=development /usr/src/app ./dist

CMD ["node", "index"]