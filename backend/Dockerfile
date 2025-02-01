# Use a specific version of Node.js for consistency
FROM node:16-alpine

# Set the working directory in the container
WORKDIR /app

# Copy the package.json and package-lock.json first to leverage Docker cache
COPY package*.json ./

# Install the dependencies
RUN npm install

# Copy the rest of the application code into the container
COPY . .

# Expose the port on which your app will run
EXPOSE 3000

# Command to start the application
CMD ["npm", "start"]
