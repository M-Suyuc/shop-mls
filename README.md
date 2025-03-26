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

y si haces algun cambio a los modelos de prisma

```sh
npx prisma migrate dev --name user-address(Nombre de la migracion)
```

6. Ir a la carpeta de interfaces para ver como funciona las interfaces
7. Ejecutar Seed

```sh
npm run seed
```

8. Correr el proyecto

```sh
npm run dev
```

## Comandos de Prisma ORM usando PostgreSQL

```sh
 npm install prisma --save-dev
 npx prisma init --datasource-provider PostgreSQL
 npx prisma migrate dev --name ProductCAtegory(Nombre de la migracion)
```

#### Comandos utiles a futuro

```sh
npx prisma db pull (All tener una DB y quieras pasarte a prisma ORM o crear modelos en base a lo que tengas en la DB)

```
