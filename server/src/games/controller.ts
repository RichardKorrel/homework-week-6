// src/games/controller.ts
import { JsonController, Get, Param, Put, Body, NotFoundError, Post, HttpCode } from 'routing-controllers'
import Game , { allowedColors } from './entity'

@JsonController()
export default class GameController {

    @Get('/games/:id')
    getGame(
        @Param('id') id: number
    ) {
        console.log('Get /games/:id')
        return Game.findOne(id)
    }

    @Get('/games')
    async allGames() {
      console.log('Get /games')
      const games = await Game.find()
      return { games }
    }

    @Put('/games/:id')
    async updateGame(
        @Param('id') id: number,
        @Body() update: Partial<Game>
    ) {
        const game = await Game.findOne(id)
        if (!game) 
            throw new NotFoundError('Cannot find page')
        console.log(allowedColors,'allowedColors')
        console.log(update.color,'update.color')
        // Can't use update.color below. why?? irritating!
        // if (!allowedColors.includes(update.color)) 
        //     throw new Error('Invalid color value')
        return Game.merge(game, update).save()
    }

    @Post('/games')
    @HttpCode(201)
    createGame(
        @Body() game: Game
    ) {
        console.log(game)
        return game.save()
    }
    
    // @Get('/games/:id')
    // getPage(
    //     @Param('id') id: number
    // ): Game {
    //     return gamesById[id]
    // }

    // @Get('/games')
    // allGames(): GameList {
    //     // .. implement! 
    //     //const gameslist = gamesById
    //     // console.log(gameslist)
    //     return { games: [] }
    // }

    // @Put('/games/:id')
    // updateGame(
    //     @Param('id') id: number,
    //     @Body() body: Partial<Game>
    // ): Game {
    //     console.log(`Incoming PUT body param:`, body)
    //     return gamesById[id]
    // }

    // @Post('/games')
    // @HttpCode(201)
    // createGame(
    //     @Body() body: Game
    // ): Game {
    //     console.log(`Incoming POST body param:`, body)
    //     return body
    // }
}