FROM node:16.15 AS builder

WORKDIR /app

# With the --production flag (or when the NODE_ENV environment variable is set to production), 
# npm will not install modules listed in devDependencies."
# The --only={prod[uction]|dev[elopment]} argument will cause either only devDependencies 
# or only non-devDependencies to be installed regardless of the NODE_ENV."
# NODE_ENV=production

# COPY package*.json ./
# COPY vite.config.ts ./

COPY . .
COPY package*.json ./
COPY vite.config.ts ./
RUN yarn install
RUN yarn run build

EXPOSE 3001

FROM nginx:latest
COPY nginx.conf /etc/nginx/nginx.conf
COPY --from=builder /app/dist /frontend
