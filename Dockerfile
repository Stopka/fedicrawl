FROM node:16-bullseye AS build
ENV POSTGRES_URL='postgresql://fedisearch:passwd@postgres:5432/fedisearch?schema=public' \
    SEED_NODE_DOMAIN='mastodon.social'
WORKDIR /srv
COPY application/package*.json ./
COPY application/prisma ./prisma/
RUN npm install
COPY application/. .
RUN npm run build

FROM build AS dev
CMD npm run dev

FROM node:16-bullseye AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -u 1001 -g 1001 nextjs
WORKDIR /srv
USER nextjs
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/prisma ./prisma
COPY --from=build /srv/package*.json ./
COPY --from=build /srv/dist ./dist
CMD npm run start:deploy
