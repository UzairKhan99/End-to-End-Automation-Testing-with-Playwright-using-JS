
# Use the official Playwright image with matching version
FROM mcr.microsoft.com/playwright:v1.65.0-noble

# Set working directory
WORKDIR /app

# Copy package files
COPY package*.json ./

# Install project dependencies
RUN npm ci

# Copy the complete project
COPY . .

# Run tests in CI mode
ENV CI=true

# Default command
CMD ["npm", "test"]
