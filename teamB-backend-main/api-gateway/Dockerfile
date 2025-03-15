FROM node:lts

# Set working directory
WORKDIR /teamb-backend/api-gateway

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose the port
EXPOSE 3000

# Run the service
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]
