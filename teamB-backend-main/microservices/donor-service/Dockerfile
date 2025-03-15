FROM node:lts

# Set working directory
WORKDIR /teamb-backend/donor-service

# Copy package.json and package-lock.json
COPY package*.json ./

# Install dependencies
RUN npm install

COPY . .

# Expose the port
EXPOSE 3002

# Run the service
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]