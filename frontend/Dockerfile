FROM node:23-alpine3.20

RUN npm install -g pnpm

RUN pnpm --version

WORKDIR /app
COPY package.json pnpm-lock.yaml ./

RUN pnpm install --frozen-lockfile

COPY . .

EXPOSE 3000

CMD ["npm", "run", "dev"]
