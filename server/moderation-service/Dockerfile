FROM node:alpine

WORKDIR /app

# Just for document purposes
EXPOSE 4003

COPY package.json .

RUN npm i --global pnpm@latest

RUN pnpm i

RUN pnpm approve-builds --all

COPY . .

CMD [ "pnpm", "dev" ]