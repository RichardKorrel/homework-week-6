// src/index.ts
import 'reflect-metadata'
import {createKoaServer} from "routing-controllers"
import GamesController from "./games/controller"
import setupDb from './db'

const port = process.env.PORT || 4000

const app = createKoaServer({
    cors: true,
    controllers: [GamesController]
})

//app.listen(port, () => console.log(`Listening on port ${port}`))
setupDb()
  .then(_ =>
    app.listen(port, () => console.log('Listening on port 4000'))
  )
  .catch(err => console.error(err))
