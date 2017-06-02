
/**
 * Created by felipemoura on 02/02/2017.
 */
'use strict'

const Env = use('Env')
const Helpers = use('Helpers')

module.exports = {

  default: 'public',

  public: {
    driver: 'local',
    root: Helpers.publicPath('uploads'),
    options: {
      encoding: 'utf8'
    }
  },
  resources: {
    driver: 'local',
    root: Helpers.resourcesPath(),
    options: {
      encoding: 'utf8'
    }
  },
  protected: {
    driver: 'local',
    root: Helpers.storagePath(),
    options: {
      encoding: 'utf8'
    }
  },

  app: {
    driver: 'local',
    root: Helpers.appPath(),
    options: {
      encoding: 'utf8'
    }
  }

}
