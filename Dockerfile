# Template: https://github.com/vercel/next.js/blob/canary/examples/with-docker/Dockerfile

FROM node:18-alpine AS base

# Install dependencies only when needed
FROM base AS deps
# Check https://github.com/nodejs/docker-node/tree/b4117f9333da4138b03a546ec926ef50a31506c3#nodealpine to understand why libc6-compat might be needed.
RUN apk add --no-cache libc6-compat
WORKDIR /app

# Install dependencies based on the preferred package manager
COPY package.json yarn.lock ./
RUN yarn install


# Rebuild the source code only when needed
FROM base AS builder
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Next.js collects completely anonymous telemetry data about general usage.
# Learn more here: https://nextjs.org/telemetry
# Uncomment the following line in case you want to disable telemetry during the build.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG NEXT_PUBLIC_CONTACT_MAIL
ENV NEXT_PUBLIC_CONTACT_MAIL=$NEXT_PUBLIC_CONTACT_MAIL

ARG TOLGEE_API_KEY
ENV TOLGEE_API_KEY=$TOLGEE_API_KEY

ARG TOLGEE_URL
ENV TOLGEE_URL=$TOLGEE_URL

ARG NEXT_PUBLIC_PAYPAL_URL
ENV NEXT_PUBLIC_PAYPAL_URL=$NEXT_PUBLIC_PAYPAL_URL

ARG NEXT_PUBLIC_STATUS_URL
ENV NEXT_PUBLIC_STATUS_URL=$NEXT_PUBLIC_STATUS_URL

RUN yarn build

# If using npm comment out above and use below instead
# RUN npm run build

# Production image, copy all the files and run next
FROM base AS runner
WORKDIR /app

ENV NODE_ENV production
# Uncomment the following line in case you want to disable telemetry during runtime.
# ENV NEXT_TELEMETRY_DISABLED 1

ARG APTABASE_API_KEY
ENV APTABASE_API_KEY=$APTABASE_API_KEY

ARG APTABASE_API_HOST
ENV APTABASE_API_HOST=$APTABASE_API_HOST

ARG TANKERKOENIG_API_KEY
ENV TANKERKOENIG_API_KEY=$TANKERKOENIG_API_KEY

ARG NOMINATIM_USER_AGENT
ENV NOMINATIM_USER_AGENT=$NOMINATIM_USER_AGENT

RUN addgroup --system --gid 1001 nodejs
RUN adduser --system --uid 1001 nextjs

COPY --from=builder /app/public ./public

# Set the correct permission for prerender cache
RUN mkdir .next
RUN chown nextjs:nodejs .next

# Automatically leverage output traces to reduce image size
# https://nextjs.org/docs/advanced-features/output-file-tracing
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000
ENV PORT 3000

# set hostname to localhost
ENV HOSTNAME "0.0.0.0"

# server.js is created by next build from the standalone output
# https://nextjs.org/docs/pages/api-reference/next-config-js/output
CMD ["node", "server.js"]
