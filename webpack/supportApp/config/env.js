var _Environments = {
  production: {
    API_URL: 'http://localhost:5000/api/v1'
  },
  development: {
    API_URL: 'http://localhost:5000/api/v1',
  },
}

function getEnvironment() {
  //IMPROVEMENT: get environment properly
  return _Environments["development"]
}

var Environment = getEnvironment()

module.exports = Environment
