## Correr en dev

1. Clonar el directorio
2. crear una copia del `.env.template` y renombrarlo a `.env` y cambiar las variables de entorno
3. Instalar dependecias

```sh
npm install
```

4. Levantar la base de datos

```sh
docker compose up -d
```

5. Correr las miraciones de Prisma

```sh
npx prisma migrate dev
```

o dircetamente hacer un

```sh
npx prisma db push
```

6. Ir a la carpeta de interfaces como funciona las interfaces
7. Ejecutar Seed

```sh
npm run seed
```

8. Correr el proyecto

```sh
npm run dev
```
