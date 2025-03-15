FROM node:lts

# Set working directory
WORKDIR /teamb-backend/charity-service

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose the port
EXPOSE 3003

# Run the service
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]