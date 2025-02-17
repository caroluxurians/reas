FROM node:lts AS build
WORKDIR /app
COPY frontend/ /app
RUN npm install
RUN npm run build

FROM node:lts
WORKDIR /app
COPY backend/ /app
RUN npm install
COPY --from=build /app/dist /app/dist
EXPOSE 3000
CMD ["node", "app.js"]
