FROM node:18.13-alpine3.17

USER node

WORKDIR /var/www

ARG NODE_ENV
ARG NPM_TOKEN
ARG HUSKY_SKIP_INSTALL=true

# COPY package.json package-lock.json ./
COPY package*.json ./


#CMD ["npm", "install"]

RUN if test "$NODE_ENV" = 'development'; \
then \
    npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" \
    && npm install --no-update-notifier \
    && npm config set "//registry.npmjs.org/:_authToken" "" \
    && npm cache clean --force 2> /dev/null \
; fi

# After building the application, remove the `devDependencies`
# for when NODE_ENV is "production" using a production mode install,
# leaving only the packages needed for production.

ADD --chown=node:node ./ /var/www/

RUN if test "$NODE_ENV" != 'development'; \
then \
    npm config set "//registry.npmjs.org/:_authToken" "${NPM_TOKEN}" \
    && NODE_ENV=development npm install \
    && npm run build --no-update-notifier \
    && npm prune \
    && npm config set "//registry.npmjs.org/:_authToken" "" \
    && npm cache clean --force 2> /dev/null \
; fi

EXPOSE 8080

ENTRYPOINT ["npm", "run"]

CMD ["start"]
