// NOTE import/export modules still works the same

import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";


// REVIEW SOLID principles: Inheritance
// NOTE extends uses inheritance to bring all the members from one class into another
// NOTE all of your controllers in node will bring in the BaseController through inheritance
export class CatsController extends BaseController {
  // NOTE all controllers are loaded when we spin up our server, so this contrsuctor will run and register all of our routes
  constructor () {
    // NOTE the super runs the contructor in the class we are inheriting here. In this case, it runs the constructor in the BaseController class
    // NOTE see notes inside of the BaseController class
    super('api/cats')
    // NOTE this.router comes from the BaseController class and allows us to register which HTTP methods are able to run in this controller
    this.router
      // NOTE when you use dot notation after this.router, you are setting up which method to run when the user makes a corresponding HTTP request
      // NOTE when someone makes a get request to http://localhost:3000/api/cats, the code for getCats runs
      .get('', this.getCats)
      // NOTE we can store variables in our URL paramters, so that users can pass through different ids to deal with different pieces of our data. If you want to store a variable in our parameters, you denote the property with a slash colon (/:)
      .get('/:catId', this.getCatById)
      .post('', this.createCat)
      .delete('/:catId', this.removeCat)
      .put('/:catId', this.updateCat)
  }

  // NOTE req stands for request, it is all of the data about the client making the request to our API. It contains headers, the URL, authorization, body, etc.

  // NOTE res stands for response, it is an object with methods attached to it that allow us to send data back to the client

  // NOTE next is a function that handles sending back errors to the client

  async getCats(req, res, next) {
    try {
      // NOTE cats takes on the value of whatever is returned from getCats method in the catsService
      const cats = await catsService.getCats()

      // NOTE res.send sends data back to the client
      res.send(cats)
    } catch (error) {
      // NOTE default error handling. This will probably always be the same in all of your controller methods
      next(error)
    }
  }
  async getCatById(req, res, next) {
    try {
      // NOTE pulls out whatever is stored in the request URL under the catId parameter.
      // NOTE if the request url is http://localhost:3000/api/cats/3, 3 is the value of req.params.catId
      // NOTE URL params are set up in the class constructor after this.router
      const catId = req.params.catId

      const cat = await catsService.getCatById(catId)

      res.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async createCat(req, res, next) {
    try {
      // NOTE req.body is the request body sent up by the client. It conatins the data that they want store in our "database"
      // NOTE when we make a post request with axios, it is the second argument passed on the axios request
      // NOTE api.post('api/cats', catFormData), catFormData becomes the req.body
      const catData = req.body

      const cat = await catsService.createCat(catData)

      res.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async removeCat(req, res, next) {
    try {
      const catId = req.params.catId

      await catsService.removeCat(catId)

      res.send('Cat was sent to the farm!')

    } catch (error) {
      next(error)
    }
  }

  async updateCat(req, res, next) {
    try {
      const catId = req.params.catId

      const catData = req.body

      const updatedCat = await catsService.updateCat(catId, catData)

      res.send(updatedCat)
    } catch (error) {
      next(error)
    }
  }
}