import base from './base';

export default {
  lookAround({ direction, id }) {
    let directionCode;
    switch (direction) {
      case 'up':
        directionCode = 21;
        break;
      case 'down':
        directionCode = 22;
        break;
      case 'left':
        directionCode = 23;
        break;
      case 'right':
        directionCode = 24;
        break;
      default:
        directionCode = 1;
        break;
    }

    return storage.load({
      key: 'token'
    }).then(token => {
      return base.put(`agriculture/v2/Instruction/${id}?value=${directionCode}`, null, {
        headers: {
          'API-TOKEN': token
        }
      });
    })
  },

  zoom({ to, id }) {
    let directionCode;
    switch (to) {
      case 'in':
        directionCode = 11;
        break;
      case 'out':
        directionCode = 12;
        break;
      default:
        directionCode = 1;
        break;
    }

    return storage.load({
      key: 'token'
    }).then(token => {
      return base.put(`agriculture/v2/Instruction/${id}?value=${directionCode}`, null, {
        headers: {
          'API-TOKEN': token
        }
      });
    })
  }
}
