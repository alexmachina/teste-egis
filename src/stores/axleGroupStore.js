import { observable, action } from 'mobx'
import config from './config.js'

export default class axleGroupStore {
  @observable axleGroups = []
  @observable loaded = true

  @action fetchAxleGroups() {
    this.loaded = false
    fetch(`${config.baseUrl}/axle-group`)
      .then(response => response.json())
      .then(axleGroups => {
        this.axleGroups = axleGroups
        this.loaded = true
      })
  }
}
