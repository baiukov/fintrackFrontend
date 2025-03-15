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
			owner: 'baiukov',
			extra: {
				env: ENV_CONFIG[ENV],
				eas: {
					projectId: '28d4f87e-a8b0-4a12-8e56-382f78c1607f',
				},
			},
			android: {
				package: 'me.vse.fintrack',
				versionCode: 3,
			},
			ios: {
				bundleIdentifier: 'me.vse.fintrack',
				buildNumber: '1.0.6',
			},
		},
		name: 'Fintrack',
		slug: 'fintrack',
		version: '1.0.1',
	}
}
