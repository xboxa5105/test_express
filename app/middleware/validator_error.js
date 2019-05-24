const errorFormatter = ({ location, msg, param, value, nestedErrors }) => {
  if (param === "_error") {
      return ({ [nestedErrors[0].param]: nestedErrors[0].param + ' is ' + msg })
  } else {
      return ({ [param]: param + ' is required' })  
  }

}
module.exports = errorFormatter;