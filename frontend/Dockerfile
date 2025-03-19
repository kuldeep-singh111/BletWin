# Step 1: Use the official Node.js image as the base
FROM node:18-alpine
ARG NEXT_PUBLIC_BASE_URL
ENV NEXT_PUBLIC_BASE_URL=$NEXT_PUBLIC_BASE_URL
# Step 2: Set the working directory in the container
WORKDIR /app

# Step 3: Copy package.json and package-lock.json (or yarn.lock)
COPY package.json package-lock.json ./

# Step 4: Install dependencies
RUN npm install

# Step 5: Copy the rest of the application code into the container
COPY . .
RUN npm run build
# Step 7: Expose the port that Next.js will run on
EXPOSE 3000

# Step 8: Start the Next.js application
CMD ["npm","run","start"]
