FROM node:18-alpine as build
# Installing libvips-dev for sharp Compatibility
RUN apk update && apk add libc6-compat --no-cache build-base gcc autoconf automake zlib-dev libpng-dev vips-dev > /dev/null 2>&1
RUN apk update && apk add bash
ARG NODE_ENV=production
ARG STRAPI_HOSTNAME
ENV STRAPI_HOSTNAME=${STRAPI_HOSTNAME}
WORKDIR /opt/app
COPY ./package.json ./yarn.lock ./
ENV PATH /opt/app/node_modules/.bin:$PATH

COPY ./ .


# Build target dependencies #
#############################
FROM build AS dependencies
# Install prod dependencies
RUN yarn install --production=true --frozen-lockfile && \
    # Cache prod dependencies
    cp -R node_modules /prod_node_modules && \
    # Install dev dependencies
    yarn install --production=false

# Build target builder #
########################
FROM build AS builder
COPY --from=dependencies /opt/app/node_modules /opt/app/node_modules
COPY . /opt/app/
RUN yarn build && \
    rm -rf node_modules


# Build target production #
###########################
FROM build AS production
COPY --from=builder /opt/app /opt/app
COPY --from=dependencies /prod_node_modules /opt/app/node_modules

RUN chmod +x ./bin/wait-for-it.sh

RUN addgroup -g 1001 -S nodejs
RUN adduser -S nextjs -u 1001
RUN chown -R nextjs:nodejs /opt/app/apps/frontend/.next

USER nextjs

ENV NODE_ENV=${NODE_ENV}
EXPOSE 1337
CMD ["yarn" , "start"]
