## Stage 1 (production base)
# This gets our prod dependencies installed and out of the way
FROM node:16.16.0-alpine3.16 as base

# Opening port 8080
EXPOSE 8080

ARG TZ='Europe/London'
ENV DEFAULT_TZ ${TZ}

# Installing \
  # tini for graceful shutdown
  # curl for curling
  # tzdata to make it timezone aware
  # extra step Removing /var/cache/apk/* what is the harm? Nothing
RUN apk add --no-cache \
    tini \
    curl \
    tzdata \
    && cp /usr/share/zoneinfo/${DEFAULT_TZ} /etc/localtime \
    && apk del tzdata \
    && rm -rf \
    /var/cache/apk/*

# Set NODE_ENV
ENV NODE_ENV=production

# Create app directory
WORKDIR /app

COPY package*.json ./

# we use npm ci here so only the package-lock.json file is used
# --only=production be more literal even though it is not necessar as we're setting ENV NODE_ENV=production
RUN npm config list \
  && npm ci --only=production \
  && npm cache clean --force

ENTRYPOINT ["/sbin/tini","--"]

## Stage 2 (development)
# we don't COPY in this stage because for dev you'll bind-mount anyway
# this saves time when building locally for dev via docker-compose
FROM base as dev

ENV NODE_ENV=development

# install all non-prod packages
RUN npm config list \
  && npm install

ENV PATH /app/node_modules/.bin:$PATH

CMD ["nodemon"]

## Stage 3 (copy in source)
# This gets our source code into builder for use in next two stages
# It gets its own stage so we don't have to copy twice
# this stage starts from the first one and skips the last two
# In this stage we transpile typescript and will create www or dist (destination) folder
FROM dev as build
# Bundle app source

COPY . .

# transpiling typescript
RUN tsc

## Stage 4 (testing)
# use this in automated CI
# it has prod and dev npm dependencies
# In 18.09 or older builder, this will always run
# In BuildKit, this will be skipped by default
FROM build as test

# run unit tests as part of build
RUN npm test

# run linters as part of build
# dev dependencies are already installed in dev stage
# RUN eslint .
# run integration testing with docker-compose later
# CMD ["npm", "run", "int-test"]

## Stage 5 (security scanning and audit)
FROM test as audit

RUN npm audit || exit 0

# aqua microscanner, which needs a token for API access
# note this isn't super secret, so we'll use an ARG here
# https://github.com/aquasecurity/microscanner

ARG MICROSCANNER_TOKEN

RUN apk add --no-cache ca-certificates && update-ca-certificates

ADD https://get.aquasec.com/microscanner .

RUN chmod +x microscanner

RUN ./microscanner $MICROSCANNER_TOKEN --continue-on-failure

## Stage 6 (default, production)
# this will run by default if you don't include a target
# it has prod-only dependencies
# In BuildKit, this is skipped for dev and test stages
FROM base as prod

COPY --from=build /app/www/ ./www

# Change ownership of WORKING DIRECTORY
RUN chown -R node:node /app

# Change user from root to node
USER node

# --interval=DURATION (default: 30s)
# --timeout=DURATION (default: 30s)
# --start-period=DURATION (default: 0s)
# --retries=N (default: 3)

HEALTHCHECK --interval=1m --timeout=10s --start-period=30s --retries=3 CMD curl -f http://localhost:8080/healthz || exit 1

CMD ["node", "./www/server.js"]