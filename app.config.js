const ENV = 'local'

const ENV_CONFIG = {
	production: {
		API_URL: 'https://fintrackserver.ru/api/v1',
		AUTH: {
			GOOGLE_ANDROID_CLIENT_ID:
				'642618161357-vhtgvvmuh7aja2jmufa4mp8i8omqp0it.apps.googleusercontent.com',
			GOOGLE_IOS_CLIENT_ID:
				'642618161357-d471hggj8fq7uv8jmarp7srde72q8hms.apps.googleusercontent.com',
		},
	},
	local: {
		API_URL: 'http://192.168.1.83:8080/api/v1',
		AUTH: {
			GOOGLE_ANDROID_CLIENT_ID:
				'642618161357-vhtgvvmuh7aja2jmufa4mp8i8omqp0it.apps.googleusercontent.com',
			GOOGLE_IOS_CLIENT_ID:
				'642618161357-d471hggj8fq7uv8jmarp7srde72q8hms.apps.googleusercontent.com',
		},
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
				buildNumber: '1.1.8',
				supportsTablet: true,
				infoPlist: {
					CFBundleURLTypes: [
						{
							CFBundleURLSchemes: [
								'com.googleusercontent.apps.642618161357-d471hggj8fq7uv8jmarp7srde72q8hms',
							],
						},
					],
				},
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
