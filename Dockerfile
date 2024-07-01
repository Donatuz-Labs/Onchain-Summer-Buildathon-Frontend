# Use a lightweight Node.js runtime as the base image
FROM node:18-alpine

# Set the working directory in the container
WORKDIR /usr/src/app

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install --f

# Copy the rest of the application code
COPY . .

# Copy the .env file
COPY .env .

# Build the React app
RUN npm run build

# Install serve to run the application
RUN npm install -g serve

# Expose the port the app runs on
EXPOSE 80:3000

# Serve the static files
CMD ["serve", "-s", "build", "-l", "3000", "--host", "0.0.0.0"]
