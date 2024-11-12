# Stage 1: Build Stage
FROM node:18-alpine AS build

# Set the working directory
WORKDIR /usr/src/app

# Copy only package.json and package-lock.json to install dependencies first
COPY package*.json ./

# Install all dependencies (including devDependencies)
RUN npm install

# Copy the rest of the application files
COPY . .

# Build TypeScript code
RUN npm run build

# Stage 2: Production Image
FROM node:18-alpine AS production

# Set the working directory
WORKDIR /usr/src/app

# Copy only the necessary files from the build stage
COPY --from=build /usr/src/app/package*.json ./
COPY --from=build /usr/src/app/node_modules ./node_modules
COPY --from=build /usr/src/app/build ./build

# Install only production dependencies
RUN npm prune --production

# Expose the port
EXPOSE 5000

# Run the compiled JavaScript application
CMD ["node", "build/index.js"]
