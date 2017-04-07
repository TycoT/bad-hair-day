export default require( 'knex' )( {

  client: 'mysql',
  connection: {

    host: 'localhost',

    user: 'user',
    password: 'password',

    database: 'bad_hair_day',
    charset: 'utf8',

  }

} );