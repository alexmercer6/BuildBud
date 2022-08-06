# Zing

Open communication between trades and builders. Notify when jobs are ready or if supplies are needed, visible time schedules, view build progress. Builder login and trade log in.

## Technologies

-   React
-   NodeJs
-   Express.js
-   PostgresSQL
-

## Database

### In the terminal:

    createdb zing
    psql zing < schema.sql

## Packages

Yarn install

-   yarn add express
-   yarn add pg
-   yarn add bcrypt
-   yarn add express-session
-   yarn add connect-pg-simple
-   yarn add dotenv
-   yarn add axios
-   yarn add autoAnimate
-   yarn add react-router-dom

#### cd into the client folder to run client

    yarn start

#### cd into the Zing folder to run dev server

    yarn start:dev

## Routes

Created a component that is used to wrap a component that is only accessible if the user is logged in.

```
import { Navigate } from "react-router-dom"

function ProtectedRoute({ isLoggedIn, children }) {
    if (!isLoggedIn) {
        return <Navigate replace to="/login" />
    }
    return children
}

export default ProtectedRoute
```
