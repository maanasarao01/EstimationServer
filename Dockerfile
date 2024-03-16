FROM node:18-alpine

ENV NODE_ENV=production

WORKDIR /app
COPY ./package*.json ./
#prevents including devdependencies & supress node's progress output
RUN npm install --production --silent 
COPY . .
EXPOSE 2001
#to run as a non-root user
RUN chown -R node /app
USER node
CMD ["node", "server.js"]
