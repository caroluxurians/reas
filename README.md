# Fiktivní kontaktní formulář pro realitní kancelář

## O projektu
Projekt se skládá z dvoufázového formuláře na frontendu, kde v první fázi uživatel vybere typ nemovitosti, kraj a okres a v druhé fázi zadá kontaktní údaje, které jsou validovány na frontendu a i poté na backendu.
Data jsou po odeslání uložena do databáze MongoDB a je připraven i GET endpoint vracející celou kolekci pro kontrolu.

## Stack
- Frontend: React s použitím Vite šablony pro React a TypeScript
- Backend: Koa
- Databáze: MongoDB
- Vše běží v Dockeru

## Spuštění
Frontend s dev serverem je ve složce frontend:

- instalace: `npm install`
- spuštění: `npm run dev`
Dev server pak běží na `localhost:5173`

Build a spuštění frontendu, backendu i databáze:

- `docker compose up --build -d`
- Frontend i API pak běží na `localhost` (port 80)

## Adresy
- `/` - přesměruje na `/chci-nabídku`
- `/chci-nabidku` - frontend (formulář)
- `/lead` - PUT endpoint na přidání do kolekce
- `/leads` - GET endpoint vracející celou kolekci pro kontrolu

## Ukázka
Aplikace je spuštěná na VPS: `http://89.221.218.21/`
