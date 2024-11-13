# Stage 1: Base image for building the app
FROM node:18.16.0-alpine AS base

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and install dependencies
COPY package.json package-lock.json ./

RUN npm install

# Copy the application code and TypeScript config for building
COPY src ./src
COPY tsconfig.json ./

# Build the application
RUN npm run build

# Stage 2: Production image
FROM node:18.16.0-alpine AS production

# Set the working directory inside the container
WORKDIR /app

# Copy only the necessary files from the build stage
COPY --from=base /app/node_modules ./node_modules
COPY --from=base /app/package.json ./package.json
COPY --from=base /app/dist ./dist

# Expose the application port
EXPOSE 5000

CMD ["npm", "run", "start"]
