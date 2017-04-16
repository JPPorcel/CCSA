FROM keymetrics/pm2-docker-alpine

# Create app directory
RUN mkdir -p /opt/app
WORKDIR /opt/app

# Install app dependencies
COPY package.json /opt/app/
RUN npm install

# Bundle app source
COPY . /opt/app

EXPOSE 8080

CMD pm2 start --no-daemon server.js
