# Multi-stage Dockerfile: build frontend, then backend, and produce a runtime image

# Stage 1: build the frontend
FROM node:18 AS frontend-build
WORKDIR /app/frontend
COPY frontend/package*.json ./
RUN npm ci --silent
COPY frontend/ ./
RUN npm run build

# Stage 2: install backend dependencies (production) and copy source
FROM node:18 AS backend-build
WORKDIR /app/backend
COPY backend/package*.json ./
RUN npm ci --production --silent
COPY backend/ ./

# Copy frontend build (if it exists) into backend public folder
# (the COPY will be a no-op if /app/frontend/build doesn't exist)
COPY --from=frontend-build /app/frontend/build /app/backend/public

# Stage 3: final lightweight runtime image
FROM node:18-alpine AS runtime
WORKDIR /app
ENV NODE_ENV=production
# Copy backend contents from backend-build stage
COPY --from=backend-build /app/backend /app

# Expose the port typically used by the app (adjust if different)
EXPOSE 3000

# Start the backend server using the same start command as package.json
CMD ["node", "bin/www"]

