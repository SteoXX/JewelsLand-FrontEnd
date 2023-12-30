# Use an official Node.js runtime as the base image
FROM node:20.10.0

# Set the working directory in the container to /app
WORKDIR ./

# Copy package.json and package-lock.json to the working directory
COPY package*.json ./

# Install the application dependencies
RUN npm install

# Copy the rest of the application code to the working directory
COPY . .

# Build the application
RUN npm run build

# Install serve
RUN npm install -g serve

# Make port 5000 available outside the container
EXPOSE 3000

# Define the command to run the application
CMD [ "serve", "-s", "build", "--ssl-cert", "./cert/cert.pem", "--ssl-key", "./cert/key.pem" ]
