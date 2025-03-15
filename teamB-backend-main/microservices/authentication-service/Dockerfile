FROM node:lts

WORKDIR /teamb-backend/authentication-service

# Copy package.json and package-lock.json
COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3010

# Run the service
# CMD ["npm", "run", "dev"]
CMD ["npm", "start"]