import { cats } from "../db/FakeDB.js"
import { BadRequest } from "../utils/Errors.js"

// NOTE most of this will change tomorrow!!!
class CatsService {

  getCats() {
    // NOTE we rturn here so that our controller has access to this value and can send it back to the client
    return cats
  }

  getCatById(catId) {
    const foundCat = cats.find(cat => cat.id == catId)

    if (!foundCat) {
      // NOTE triggers our catch and sends a 400 response to the client
      throw new BadRequest(`${catId} was not a valid Id`)
    }

    return foundCat
  }

  createCat(catData) {
    catData.id = cats.length + 1

    cats.push(catData)

    return catData
  }

  removeCat(catId) {
    const foundIndex = cats.findIndex(cat => cat.id == catId)

    if (foundIndex == -1) {
      // NOTE triggers our catch and sends a 400 response to the client
      throw new BadRequest(`${catId} was not a valid Id`)
    }

    cats.splice(foundIndex, 1)

  }

  updateCat(catId, catData) {
    // NOTE we already have a method to find one cat by its id, so we call that here
    let originalCat = this.getCatById(catId)

    // NOTE we use "or" operators here to check if any of the properties from the request body are undefined. If they are, we default back to the original property
    originalCat.name = catData.name || originalCat.name

    originalCat.color = catData.color || originalCat.color

    originalCat.age = catData.age || originalCat.age

    return originalCat
  }
}

export const catsService = new CatsService()