ARG NODE_VERSION="21-alpine"

FROM --platform=$TARGETPLATFORM postgres:16-alpine as db
COPY packages/backend/scripts/initdb /docker-entrypoint-initdb.d/

# Prepare the workspace and the common package
FROM --platform=$TARGETPLATFORM node:${NODE_VERSION} as workspace-builder
WORKDIR /builder
COPY yarn.lock package.json tsconfig.json .yarnrc.yml ./
COPY packages/common ./packages/common/
RUN --mount=type=cache,target=/builder/.yarn/cache corepack enable && \
  yarn plugin import workspace-tools && \
  yarn workspaces focus wordle-common && \
  yarn workspace wordle-common common:build:all

# Backend package
FROM --platform=$TARGETPLATFORM workspace-builder as backend-builder
COPY packages/backend/package.json ./packages/backend/
RUN --mount=type=cache,target=/builder/.yarn/cache yarn workspaces focus wordle-backend
COPY packages/backend/ ./packages/backend/
RUN yarn workspace wordle-backend build

FROM --platform=$TARGETPLATFORM node:${NODE_VERSION} as backend
WORKDIR /app
ENV DATABASE_DSN=postgresql://wordle:wordle@localhost/wordle?application_name=wordle
EXPOSE 3000
COPY --from=backend-builder /builder/packages/backend/package.json ./
COPY --from=backend-builder /builder/node_modules ./node_modules
RUN unlink node_modules/wordle-common
COPY --from=backend-builder /builder/packages/common ./node_modules/wordle-common
COPY --from=backend-builder /builder/packages/backend/dist ./
CMD [ "node", "main" ]

# Frontend package
FROM --platform=$TARGETPLATFORM workspace-builder as frontend-builder
COPY packages/frontend/package.json ./packages/frontend/
RUN --mount=type=cache,target=/builder/.yarn/cache yarn workspaces focus wordle-frontend
COPY packages/frontend/ ./packages/frontend/
RUN yarn workspace wordle-frontend build

FROM --platform=$TARGETPLATFORM nginx:1.25-alpine as frontend
ARG BASE_URL=/
ENV BASE_URL=${BASE_URL}
COPY packages/frontend/nginx.conf.template /etc/nginx/templates/default.conf.template
COPY --from=frontend-builder /builder/packages/frontend/dist /usr/share/nginx/html/
