# BEWD-CA3
## Authentication system for Employee Portal
### 1. POST Route
url: http://localhost:3000/login 
body: {
    "ID":"E12345",
    "password":"securePass"
      }

if ID is present, the response will be 'Login Successful'

### 2. GET Route
url: http://localhost:3000/dashboard
in authorization, select `bearer token` and give the token that we got in the POST route.

if token is valid, the response will say 'Welcome to Employee Dashboard!'

### command to run server: `node server.js`