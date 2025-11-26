FROM node:18-alpine

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies
RUN npm ci --silent || npm install --silent

# Copy source code
COPY . .

# Build the app
RUN npm run build && \
    echo "Frontend build completed" && \
    ls -la dist/

# Copy custom server
COPY server.js .

EXPOSE 3000

# Use custom server to properly serve static files
CMD ["node", "server.js"]