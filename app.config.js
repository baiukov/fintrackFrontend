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
		expo: {
			name: 'Fintrack',
			slug: 'fintrack',
			owner: 'baiukovandroid',
			extra: {
				env: ENV_CONFIG[ENV],
				eas: {
					projectId: '761197c6-011e-496b-a41d-a783643f7fd1',
				},
			},
			android: {
				package: 'me.vse.fintrack2',
				versionCode: 7,
			},
			ios: {
				bundleIdentifier: 'me.vse.fintrack',
				buildNumber: '1.1.0',
			},
		},
		name: 'Fintrack',
		slug: 'fintrack',
		version: '1.0.1',
	}
}
