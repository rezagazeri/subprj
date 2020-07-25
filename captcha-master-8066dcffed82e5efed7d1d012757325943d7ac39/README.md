## Captcha project

#### Requirements
Node
Redis

#### Run project
npm start
  
### Craete or return captcha
### GET

```

http://localhost:3000/create

```

### Verify captcha
### GET

```

http://localhost:3000/verify?value=felan&id=felan

```

#### Input

| input | type | rquired | description |

| --- | --- | --- |

| value | string | YES | number users see in capthca |

| id | string | YES | Id that return by create captcha |