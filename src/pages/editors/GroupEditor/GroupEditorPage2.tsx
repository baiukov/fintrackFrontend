import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { List } from '../../../components/ui/list/List'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Group } from '../../../model/entities/Group'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface GroupEditorProps {
	navigation: any
	route: any
	groupForm: Group | undefined
}

interface FormProps {
	accountNames: string[]
}

export const GroupEditorPage2 = (props: GroupEditorProps) => {
	const language = useStore((state: any) => state.language)

	const groupForm = props.route.params?.groupForm || new Group(null, null, null)

	const handleSubmit = (values: FormProps) => {
		setTimeout(() => {
			props.navigation.navigate(Pages.GROUP_EDITOR3, {
				groupForm: groupForm,
			})
		}, 0)
	}

	return (
		<View style={GlobalStyles.page}>
			<LinearGradient
				colors={['rgba(55, 63, 128, 1)', 'rgba(0, 0, 0, 1)']}
				style={[GlobalStyles.background]}
				start={{ x: -1, y: -1 }}
				end={{ x: 1, y: 1 }}
			>
				<View style={GlobalStyles.headerWrapper}>
					<Text style={GlobalStyles.header}>{`${language.EDITOR}`}</Text>
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 2/3`}</Text>
				</View>

				<Formik
					initialValues={{
						accountNames: groupForm.getAccountNames(),
					}}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<List
									placeholder={language.SEARCH}
									onChangeText={() => {}}
									title={language.ACCOUNTS}
									items={[
										{ key: '12', label: 'Account name 1', onPress: () => {} },
										{ key: '13', label: 'Account name 2', onPress: () => {} },
										{ key: '14', label: 'Account name 3', onPress: () => {} },
										{ key: '15', label: 'Account name 4', onPress: () => {} },
										{
											key: '16',
											label: 'Account name 55555',
											onPress: () => {},
										},
										{ key: '17', label: 'Account name 6', onPress: () => {} },
										{ key: '18', label: 'Account name 7 ', onPress: () => {} },
										{ key: '19', label: 'Account 8', onPress: () => {} },
									]}
									options={[
										{ key: '12', label: 'Account name 1' },
										{ key: '13', label: 'Account name 2' },
										{ key: '14', label: 'Account name 3' },
										{ key: '15', label: 'Account name 4' },
										{ key: '16', label: 'Account name 5' },
										{ key: '17', label: 'Account name 6' },
									]}
								/>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.GO}
									variant={Buttons.PRIMARY}
									callback={props.handleSubmit}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
