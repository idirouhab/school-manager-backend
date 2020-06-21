# Tinaptic Backend
![Tinaptic CI](https://github.com/idirouhab/school-manager-backend/workflows/Tinaptic%20CI/badge.svg)
[![codecov](https://codecov.io/gh/idirouhab/school-manager-backend/branch/master/graph/badge.svg?token=7C9GIvsW8j)](https://codecov.io/gh/idirouhab/school-manager-backend)

## Installation

Install depdencies
```bash
$ npm install
```

Start a mongodb instance using a container
```bash
$ docker pull mongo
$ docker run -d -p 27017:27017 mongo
```

Add and `.env` file in the root directory and define the following variables:
```bash
JWT_TOKEN_EXPIRATION_TIME='15 days'
JWT_SECRET='this-is-a-secret'
MONGODB_URL=mongodb://localhost:27017/school_manager_db
```

Start the app:
```bash
$ npm start
```

