FROM node:16-alpine

# Create app directory inside the container
WORKDIR /usr/src/app

# Copy package files first - this helps with caching
COPY package*.json ./

# Install dependencies
RUN npm install

# Install serve for production build
RUN npm install -g serve

# Copy config overrides
COPY config-overrides.js ./

# Copy the rest of your application code
COPY . .

# Accept build argument for API URL
ARG REACT_APP_BASE_URL
ENV REACT_APP_BASE_URL=$REACT_APP_BASE_URL

# Build the app
RUN npm run build

# The port your React app runs on
EXPOSE 3000

# Run a static server for production build
CMD ["serve", "-s", "build", "-l", "3000"]