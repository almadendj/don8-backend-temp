   # Dockerfile
   FROM node:18-alpine AS builder
   WORKDIR /app

   # 1) install deps
   COPY package*.json ./
   RUN npm ci

   # 2) generate Prisma client
   COPY prisma ./prisma
   RUN npx prisma generate

   # 3) copy code and build
   COPY tsconfig*.json ./
   COPY src ./src
   RUN npm run build

   # 4) production image
   FROM node:18-alpine AS runner
   WORKDIR /app
   ENV NODE_ENV=production

   # copy built code + prod deps
   COPY --from=builder /app/node_modules ./node_modules
   COPY --from=builder /app/dist ./dist
   COPY --from=builder /app/prisma ./prisma

   # run migrations at release time
   ENV PORT=8080
   EXPOSE 8080

   CMD ["node", "dist/main.js"]

