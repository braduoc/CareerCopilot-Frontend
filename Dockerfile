# Dockerfile de DESARROLLO (hot reload). No es para producción:
# para eso se usaría un build multi-stage con `next build` + `next start`.
FROM node:20-alpine

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install

COPY . .

EXPOSE 3000
CMD ["npm", "run", "dev", "--", "-H", "0.0.0.0", "-p", "3000"]
