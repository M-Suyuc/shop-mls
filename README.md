# Descripcion

## Intalacion

## Correr en dev

1. Clonar el directorio
2. crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependecias `npm install`
4. Levantar la base de datos `docker compose up -d`
5. Correr las miraciones de Prisma `npx prisma migrate dev`
6. Ejecutar Seed `npm run seed`
7. Correr el proyecto `npm run dev`

## Correr en prod
