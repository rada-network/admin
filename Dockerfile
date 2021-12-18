# pull the base image
FROM node:14-alpine

# set the working direction
WORKDIR /app

# install app dependencies
COPY package.json ./

COPY yarn.lock ./

RUN yarn install

# add app
COPY . ./

RUN yarn build:production
RUN yarn global add serve

# start app
CMD serve -s build

# Uses port
EXPOSE 3000