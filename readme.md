# API - (Project Starter)

## Setup

### Enviromentals
```
PORT=3000
DB_HOST=127.0.0.1
DB_NAME=databaseName
DB_USER=user
DB_PASS=password
DB_PORT=3306
JWT_KEY=strongJWTKey
JWT_EXPIRES=1h
```

### MySQL Schema
```
Find it in the root file structure: schema.sql
```

## Guidelines

### Responses

#### Successfull JSON
```js
return response
      .status(200)
      .json({
        success: true,
        message: 'taskSuccess',
        data: resultData,
      });
```

#### Error JSON
```js
return response
      .status(500)
      .json({
        success: false,
        message: 'serverError',
        data: null,
      });
```

