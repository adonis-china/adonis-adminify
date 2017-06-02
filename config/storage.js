const Env = use('Env')

module.exports = {

  disk: Env.get('STORAGE_DISK', 'fs'),

  disks: {
    fs: {
      driver: 'fs'
    },

    s3: {
      driver: 's3',
      key: Env.get('AWS_ACCESS_KEY_ID'),
      secret: Env.get('AWS_SECRET_ACCESS_KEY'),
      region: Env.get('AWS_REGION'),
      bucket: 'bucket-name'
    },

    s3Public: {
      driver: 's3',
      key: Env.get('AWS_ACCESS_KEY_ID'),
      secret: Env.get('AWS_SECRET_ACCESS_KEY'),
      region: Env.get('AWS_REGION'),
      bucket: 'public-bucket-name'
    }

  }

}