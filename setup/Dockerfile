FROM node:alpine

RUN mkdir keenan && cd keenan
WORKDIR /keenan/app/

COPY ./ /keenan/app/
RUN cd /keenan/app/

RUN npm install

CMD ["npm", "start"]