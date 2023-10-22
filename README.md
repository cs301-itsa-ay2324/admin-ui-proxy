This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Prerequisites

- [Node.js](https://nodejs.org/en/) >= v18
- [Yarn](https://yarnpkg.com/) >= v1.22
- Optional: [Docker](https://docs.docker.com/get-docker/)

## Running locally

To run the development server:

```bash
yarn
yarn dev
```

## Using Docker

```sh
docker run -p 3000:3000 -it  $(docker build -q .) 
```

Alternatively:

1. build container: `docker build -t admin-ui-proxy .`
2. run container: `docker run -p 3000:3000 admin-ui-proxy`

view docker images with `docker images`
