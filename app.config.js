const ENV = 'production'

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
		expo: {
			name: 'Fintrack',
			slug: 'fintrack',
			owner: 'baiukov2',
			extra: {
				env: ENV_CONFIG[ENV],
				eas: {
					projectId: 'bdceb8cf-6aaa-40b9-a5e0-5e2938ae468b',
				},
			},
			android: {
				package: 'me.vse.fintrack',
				versionCode: 5,
			},
			ios: {
				bundleIdentifier: 'me.vse.fintrack',
				buildNumber: '1.0.18',
			},
		},
		name: 'Fintrack',
		slug: 'fintrack',
		version: '1.0.1',
	}
}
