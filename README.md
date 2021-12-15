# RADA admin

This repo is working with rada contract. You may to deploy the contracts before using this. https://github.com/rada-network/contracts

### Configuration
Copy  `.env.example` to `.env.local`

Update the contracts address on `.env.local`

### Develop

```
yarn start
```

### Build

```
yarn build
```

## Dockerize

```
docker build -t rada-admin .
docker run -dp 3000:3000 rada-admin
```