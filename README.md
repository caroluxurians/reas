# Reas - testovací task

## Stack

- Frontend: v Reactu s použitím Vite šablony pro React a TypeScript
- Backend: Koa
- Databáze: MongoDB
- Vše běží v Dockeru

## Spuštění

Frontend s dev serverem je ve složce frontend:

- instalace: **npm install**
- spuštění: **npm run dev**
  Potom to běží na localhost:5173

Zbuildění a spuštění frontendu, backendu i databáze:

- **docker compose up --build -d**
- Web pak běží na portu 80

## Adresy

- / - přesměruje na /chci-nabídku, kde je formulář
- /lead - tady je PUT endpoint na přidání do kolekce
- /leads - tady ne GET posílající celou kolekci pro kontrolu
