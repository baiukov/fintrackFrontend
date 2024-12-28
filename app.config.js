const ENV = 'local'

const ENV_CONFIG = {
	development: {
		API_URL: 'https://api.development.com',
		ENV: 'dev',
	},
	production: {
		API_URL: 'https://api.production.com',
		ENV: 'prod',
	},
	local: {
		API_URL: 'http://localhost:8080/api/v1',
		ENV: 'local',
	},
}

export default () => {
	return {
		name: 'Fintrack',
		slug: 'fintrack',
		version: '1.0.0',
		extra: ENV_CONFIG[ENV],
	}
}
