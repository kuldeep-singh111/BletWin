FROM node:23

# Install dependencies for building bcrypt
RUN apt-get update && apt-get install -y build-essential python3

# Set the working directory
WORKDIR /app

# Copy package.json and package-lock.json
COPY package*.json ./

# Install node modules (including bcrypt)
RUN npm install

# Copy the rest of your application
COPY . .

# Expose the port
EXPOSE 9000

# Run the application
CMD ["npm","start"]