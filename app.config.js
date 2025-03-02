const ENV = 'local'

const ENV_CONFIG = {
	production: {
		API_URL: 'https://fintrackserver.ru:8080/api/v1',
	},
	local: {
		API_URL: 'http://192.168.1.83:8080/api/v1',
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
