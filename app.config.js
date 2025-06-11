const ENV = 'production'

const ENV_CONFIG = {
	production: {
		API_URL: 'https://fintrackserver.ru/api/v1',
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
			version: '1.1.1',
			icon: './assets/icon.png',
			description:
				'Fintrack - finance management app. Manage your money smarter and easier! Our app provides a comprehensive overview of your financial health.',
			extra: {
				env: ENV_CONFIG[ENV],
				eas: {
					projectId: '761197c6-011e-496b-a41d-a783643f7fd1',
				},
			},
			android: {
				package: 'me.vse.fintrack2',
				versionCode: 8,
			},
			ios: {
				bundleIdentifier: 'me.vse.fintrack',
				buildNumber: '1.1.11',
				supportsTablet: false,
			},
		},
		orientation: 'portrait',
		splash: {
			image: './assets/splash_icon.png',
			resizeMode: 'contain',
			backgroundColor: '#ffffff',
		},
	}
}
