#Develoment

Pasos para levantar la app en desarrollo

1. Levantar la base de datos

```
docker compose up -d
```

2. Renombrar el .env.template a env. y remplazar las variables de entorno
3. Luego correr el siguiente comando para instalar las dependencias:

   ```
   npm install
   ```

   ```
   npm run dev
   ```
4. Ejecutar estos comandos de prisma:
5. ```
   npx prisma migrate dev
   ```
6. Ejecutar el Seed para [crear la base de datos local](http://localhost:3000/api/seed)

#Prisma comand

```
npx prisma init
```

```
npx prisma migrate dev

```

```
npx prisma generate
```

#Prod

#Stage

## Nota

usuario: test1@google.com
contraseña: 123456
