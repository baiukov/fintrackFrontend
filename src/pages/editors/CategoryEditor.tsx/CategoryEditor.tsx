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
import { CategoryService } from '../../../services/Category.service'
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
	const user = useStore((state: any) => state.user)

	const [categoryForm, setCategoryForm] = React.useState(props.route.params?.categoryForm)

	const validationSchema = Yup.object().shape({
		name: Yup.string().required(language.MISSING_NAME),
		emoji: Yup.string().required(language.MISSING_ICON),
	})

	const handleSubmit = (values: FormProps) => {
		const service = CategoryService.getInstance()

		const isEdit = props.route.params?.isEdit
		if (isEdit) {
			service.update(categoryForm.id, user.id, values.name, values.emoji)
		} else {
			service.create(user.id, values.name, values.emoji)
		}

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

	const submitDeletion = () => {
		if (categoryForm) {
			const service = CategoryService.getInstance()
			service.delete(categoryForm.id, user.id)
		}

		props.navigation.replace(Pages.CATEGORIES)
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
				</View>

				<Formik
					initialValues={{
						name: categoryForm.name || '',
						emoji: categoryForm.icon || '',
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
									selectedId={props.values.emoji}
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
									callback={submitDeletion}
								/>
							</View>
						</View>
					)}
				</Formik>
			</LinearGradient>
		</View>
	)
}
