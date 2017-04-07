module.exports = {

	development: {

		migrations: { tableName: 'knex_migrations' },
		seeds: { tableName: './seeds' },

		client: 'mysql',
		connection: {

			host: 'localhost',

			user: 'user',
			password: 'password',

			database: 'bad_hair_day',
			charset: 'utf8',

		}

	}

};