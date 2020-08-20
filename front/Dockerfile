FROM node:lts AS builder
WORKDIR /src
COPY package*.json ./
COPY .eslintignore ./
RUN npm ci
#separating copy to avoid copying the nginx.conf file used in next step
COPY public ./public/
COPY src ./src/
COPY *.json *.js ./
RUN npm run build


FROM nginx:alpine
COPY nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=builder /src/dist /usr/share/nginx/html/
EXPOSE 80

