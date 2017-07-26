import { observable, action, toJS } from 'mobx'
import config from './config.js'
import shortid from 'shortid'

export default class AxleGroupFormStore {
  @observable axleGroup = {
    id: shortid.generate().substr(0,3).toUpperCase(),
    description: '',
    axles: [],
    axle_group_type: '',
    allowed_weight: ''
  }
  @observable loaded = true
  @observable message = ''
  @observable axleMessage = ''
  @observable reqLoaded = true
  @observable reqMessage = ''
  @observable reqMessageVisible = false
  @observable showDeleteConfirmationModal = false


  @action getAxleGroup(id) {
    const url = `${config.baseUrl}/axle-group/${id}`
    this.loaded = false
      fetch(url)
      .then(response => response.json())
      .then(axleGroup => {
        this.axleGroup = axleGroup
        this.loaded = true
      })
  }

  @action newAxle() {
    const lastPosition =
      this.axleGroup.axles.length ? 
      this.axleGroup.axles[this.axleGroup.axles.length -1].position :
      0
    if (lastPosition == 3) {
      alert('São permitidos apenas três eixos por grupo')
    } else {
      this.axleGroup.axles.push({
        position: lastPosition + 1,
        has_twin_wheel: null,
        has_xl_wheel: null,
        allowed_distance_endpoint1: '',
        allowed_distance_endpoint2: ''
      })
    }
  }

  validateAxleGroup() {
    let isValid = true
    let message = 'Há algo errado com o formulário, verifique o preenchimento'
    if(!this.axleGroup.description)
      return {
      isValid: false,
      message: 'A descrição do grupo não pode estar em branco'
      }
    if(!this.axleGroup.axle_group_type)
      return {
      isValid: false,
      message:'Selecione o tipo do grupo de eixos'
      }
    if(!this.axleGroup.allowed_weight)
      return {
        isValid: false,
      message: 'O peso permitido não pode estar em branco.'
      }
    //Validate Axles
    if(!this.axleGroup.axles.length) {
      return {
      message : 'O cadastro de pelo menos um eixo é obrigatório.',
      isValid : false
      }
    }

    for(let i = 0; i < this.axleGroup.axles.length; i++) {
      const axle = this.axleGroup.axles[i]

      if(!axle.allowed_distance_endpoint1 && axle.allowed_distance_endpoint1 !== 0)
        return {
          message: `Preencha todos os campos do eixo ${axle.position}`,
          isValid: false
        }

      if(!axle.allowed_distance_endpoint2 && axle.allowed_distance_endpoint2 !== 0)
        return {
          message: `Preencha todos os campos do eixo ${axle.position}`,
          isValid: false
        }
    }

    return {
      isValid: true,
      message: 'OK'
    }



  }

  @action insertAxleGroup() {
    const validate = this.validateAxleGroup()
    if (validate.isValid) {
      if(!this.isCreatedAxleGroup) {
        this.reqLoaded = false
        this.postAxleGroup().then(() => {
          this.reqLoaded = true
          this.reqMessage = "Grupo de Eixos criado com sucesso!"
          this.reqMessageVisible = true
          this.isCreatedAxleGroup = true
          this.message = ''

          setTimeout(() => this.destroyReqMessage(), 3000)
        }).catch(err => {
          this.message = `Erro: ${err}`
          this.reqLoaded = true
        })
      } else {
        this.updateAxleGroup()
      }
    } else {
      this.message = validate.message
    }
  }

  @action destroyReqMessage() {
    this.reqMessageVisible = false
    this.reqMessage = ''
  }

  @action updateAxleGroup() {
    const validate = this.validateAxleGroup()
    if (validate.isValid) {
      this.reqLoaded = false
      this.putAxleGroup().then(() => {
        this.reqLoaded = true
        this.reqMessage = 'Informações atualizadas'
        this.reqMessageVisible = true
        this.message = ''
        setTimeout(() => this.destroyReqMessage(),3000)
      }).catch(err => {
        this.message = `Erro: ${err}`
        this.reqLoaded = true
      })
    } else {
      this.message = validate.message
    }
  }

  putAxleGroup() {
    return new Promise((resolve, reject) => {
      const url = `${config.baseUrl}/axle-group`

      fetch(url, {
        method: 'PUT',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        }),
        body: JSON.stringify(toJS(this.axleGroup))
      }).then(response => {
        if(response.ok) {
          response.text().then(text => resolve(text))
        } else {
          response.text().then(text => reject(text)) 
        }
      }).catch(err => reject(err))
    })

  }
  postAxleGroup() {
    return new Promise((resolve, reject) => {
      const url = `${config.baseUrl}/axle-group`

      fetch(url, {
        method: 'POST',
        headers: new Headers({
          'Content-Type': 'application/json',
          'Accept' : 'application/json'
        }),
        body: JSON.stringify(toJS(this.axleGroup))
      }).then(response => {
        if(response.ok) {
          response.json().then(json => resolve(json))
        } else {
          response.json().then(json => reject(json)) 
        }
      }).catch(err => reject(err))
    })
  }

  @action removeAxle(pos) {
    if(this.axleGroup.axles[pos+1]) {
      this.axleMessage = 'Exclua o(s) eixo(s) adjacentes primeiro'
      return
    }
    if(this.axleGroup.axles.length == 1) {
      this.axleMessage = 'Pelo menos um eixo é obrigatório'
      return
    }
    this.axleGroup.axles.splice(pos, 1)
    this.axleMessage = ''
  }

  @action deleteAxleGroup() {
    return new Promise((resolve, reject) => {
      const url = `${config.baseUrl}/axle-group/${this.axleGroup.id}`

      fetch(url, {
        method:'DELETE'
      }).then(response => {
        if(response.ok) {
          resolve()
        } else {
          reject(response.status)
        }
      })

    })
  }


}
