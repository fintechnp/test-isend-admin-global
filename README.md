# Remittance Platform Admin

This is an web app that for and administrative purpose which is accessed by compliance team to verify transaction created on `isendremit.com`, `agent.isendremit.com` and `biz.isendremit.com` 

# Running project locally

1. Clone the repo 
```
git clone git@github.com:fintechnp/isend-global-admin.git
```

2. setting up environment file
```
cp .env.example .env.development
```
make a necessary changes in `.env.environment` file

3. running development server
```
npm run dev
```

# Getting production build

1. setting up environment file
```
cp .env.example .env.production
```
make a necessary changes in `.env.environment` file

2. running development server
```
npm run build:production
```

