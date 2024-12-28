import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Picker } from '../../../components/ui/picker/Picker'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Category } from '../../../model/ui/Category'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface CategoryEditorProps {
	navigation: any
	route: any
	category: Category | undefined
}

interface FormProps {
	name: string
	emoji: string
}

export const CategoryEditor = (props: CategoryEditorProps) => {
	const language = useStore((state: any) => state.language)

	const categoryForm: Category =
		props.route.params?.asset || new Category(null, null)

	const validationSchema = Yup.object().shape({
		name: Yup.string().required(language.MISSING_NAME),
		emoji: Yup.string().required(language.MISSING_ICON),
	})

	const handleSubmit = (values: FormProps) => {
		props.navigation.replace(Pages.CATEGORIES)
	}

	const recent = [
		{ emoji: '🚗' },
		{ emoji: '🏠' },
		{ emoji: '🚛' },
		{ emoji: '🏢' },
		{ emoji: '🛳️' },
		{ emoji: '💸' },
		{ emoji: '🦆' },
		{ emoji: '🐓' },
		{ emoji: '🐤' },
		{ emoji: '🐔' },
		{ emoji: '🐰' },
		{ emoji: '🐮' },
		{ emoji: '🐷' },
		{ emoji: '🐱' },
		{ emoji: '🐶' },
		{ emoji: '🤖' },
	]

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
				</View>

				<Formik
					initialValues={{
						name: categoryForm.getName() || '',
						emoji: categoryForm.getEmoji() || '',
					}}
					validationSchema={validationSchema}
					onSubmit={handleSubmit}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<View
									style={{
										flex: 1,
										justifyContent: 'center',
										alignItems: 'center',
									}}
								/>
								<TextField
									value={props.values.name}
									placeholder={language.NAME}
									handleChange={props.handleChange('name')}
									error={props.errors.name}
								/>
								<Picker
									style='emoji'
									data={recent}
									title={language.SELECT_ICON}
									onSelect={props.handleChange('emoji')}
									error={props.errors.emoji}
								/>
							</View>
							<View style={GlobalStyles.center}>
								<MainButton
									title={language.SAVE}
									variant={Buttons.PRIMARY}
									callback={props.submitForm}
								/>
								<MainButton
									title={language.DELETE}
									variant={Buttons.SECONDARY}
									callback={props.submitForm}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
