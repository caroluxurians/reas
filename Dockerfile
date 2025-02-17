FROM node:lts AS build
WORKDIR /app
COPY frontend/ ./
RUN npm ci
RUN npm run build

FROM node:lts
WORKDIR /app
COPY backend/ /app
RUN npm i
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["node", "app.js"]
