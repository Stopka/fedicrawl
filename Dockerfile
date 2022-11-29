FROM node:18-bullseye AS prebuild
ENV ELASTIC_URL='http://elastic:9200' \
    ELASTIC_USER='elastic' \
    ELASTIC_PASSWORD='' \
    SEED_NODE_DOMAIN='mastodon.social' \
    REATTEMPT_MINUTES='60' \
    REFRESH_HOURS='120' \
    WAIT_FOR_JOB_MINUTES='60' \
    DEFAULT_TIMEOUT_MILLISECONDS='10000' \
    SEED_TIMEOUT_MILLISECONDS=${DEFAULT_TIMEOUT_MILLISECONDS} \
    BANNED_DOMAINS='' \
    MAX_CRAWLING_DEPTH='' \
    CRAWLING_VERSION='0' \
    TZ='UTC'
FROM prebuild AS build
WORKDIR /srv
COPY application/package*.json ./
RUN yarn
COPY application/. .
RUN yarn build

FROM build AS dev
CMD npx tsc --watch

FROM prebuild AS prod
RUN groupadd -g 1001 nodejs
RUN useradd -m -u 1001 -g 1001 nextjs
WORKDIR /srv
USER nextjs
COPY --from=build /srv/node_modules ./node_modules
COPY --from=build /srv/package*.json ./
COPY --from=build /srv/dist ./dist
CMD npm run start:deploy
