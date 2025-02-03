import React from 'react'
import { View } from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'
import { MainButton } from '../../../../components/ui/buttons/MainButton/MainButton'
import { MenuItem } from '../../../../components/ui/buttons/MenuItem/MenuItem'
import { Buttons } from '../../../../enums/Buttons'
import { Icons } from '../../../../enums/Icons'
import { Pages } from '../../../../enums/Pages'
import { Asset } from '../../../../model/ui/Asset'
import { AssetService } from '../../../../services/Asset.service'
import { useStore } from '../../../../storage/store'
import { GlobalStyles } from '../../../../styles/GlobalStyles.styles'

export const Assets = (props: any) => {
	const transferToAssetEditor = () => {
		props.navigation.navigate(Pages.ASSET_EDITOR)
	}

	const language = useStore((state: any) => state.language)
	const user = useStore((state: any) => state.user)

	const [assets, setAssets] = React.useState([] as Asset[])

	React.useEffect(() => {
		const fetchData = async () => {
			const service = AssetService.getInstance()
			const assets = await service.getAll(user.id)
			setAssets(assets)
		}
		fetchData()

	}, [user.id])

	return (
		<View style={GlobalStyles.center}>
			<ScrollView>
				{
					assets.map(asset => {
						return (
							<MenuItem
								icon={Icons.EDIT}
								title={asset.name || ''}
								callback={function () {
									throw new Error('Function not implemented.')
								}}
							/>
						)
					 })
				}
			</ScrollView>
			<View style={[GlobalStyles.center, GlobalStyles.bottomMenu]}>
				<MainButton
					title={language.ADD_ASSET}
					variant={Buttons.PRIMARY}
					callback={transferToAssetEditor}
				/>
			</View>
		</View>
	)
}
