This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Running locally

First, run the development server:

```bash
yarn
yarn dev
```

## Using Docker

1. [install Docker](https://docs.docker.com/get-docker/) on your machine
2. build container: `docker build -t admin-ui-proxy .`
3. run container: `docker run -p 3000:3000 admin-ui-proxy`

view docker images with `docker images`
