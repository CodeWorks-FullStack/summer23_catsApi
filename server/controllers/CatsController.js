import { catsService } from "../services/CatsService.js";
import BaseController from "../utils/BaseController.js";

export class CatsController extends BaseController {
  constructor () {
    super('api/cats')
    this.router
      .get('', this.getCats)
      .get('/:catId', this.getCatById)
      .post('', this.createCat)
      .delete('/:catId', this.removeCat)
      .put('/:catId', this.updateCat)
  }





  async getCats(req, res, next) {
    try {
      const cats = await catsService.getCats()
      res.send(cats)
    } catch (error) {
      next(error)
    }
  }
  async getCatById(req, res, next) {
    try {
      const catId = req.params.catId

      const cat = await catsService.getCatById(catId)

      res.send(cat)
    } catch (error) {
      next(error)
    }
  }

  async createCat(req, res, next) {
    try {
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