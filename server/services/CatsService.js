import { cats } from "../db/FakeDB.js"
import { BadRequest } from "../utils/Errors.js"

class CatsService {

  removeCat(catId) {
    const foundIndex = cats.findIndex(cat => cat.id == catId)

    if (foundIndex == -1) {
      throw new BadRequest(`${catId} was not a valid Id`)
    }

    cats.splice(foundIndex, 1)

  }

  getCats() {
    return cats
  }

  getCatById(catId) {
    const foundCat = cats.find(cat => cat.id == catId)

    if (!foundCat) {
      throw new BadRequest(`${catId} was not a valid Id`)
    }

    return foundCat
  }

  createCat(catData) {
    catData.id = cats.length + 1

    cats.push(catData)

    return catData
  }

  updateCat(catId, catData) {
    let originalCat = this.getCatById(catId)

    originalCat.name = catData.name || originalCat.name

    originalCat.color = catData.color || originalCat.color

    originalCat.age = catData.age || originalCat.age

    return originalCat
  }
}

export const catsService = new CatsService()