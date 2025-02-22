import { LinearGradient } from 'expo-linear-gradient'
import { Formik, FormikProps } from 'formik'
import React from 'react'
import { Text, View } from 'react-native'
import * as Yup from 'yup'
import { MainButton } from '../../../components/ui/buttons/MainButton/MainButton'
import { TextField } from '../../../components/ui/fields/TextField/TextField'
import { Buttons } from '../../../enums/Buttons'
import { Pages } from '../../../enums/Pages'
import { Group } from '../../../model/ui/Group'
import { useStore } from '../../../storage/store'
import { GlobalStyles } from '../../../styles/GlobalStyles.styles'

export interface GroupEditorProps {
	navigation: any
	route: any
	groupForm: Group | undefined
}

interface FormProps {
	name: string
}

export const GroupEditorPage1 = (props: GroupEditorProps) => {
	const language = useStore((state: any) => state.language)

	const [groupForm, setGroupForm] = React.useState(
		props.route.params?.groupForm || ({} as Group)
	)

	const validationSchema = Yup.object().shape({
		name: Yup.string()
			.min(4, language.AT_LEAST_4_CHARS)
			.required(language.MISSING_NAME),
	})

	const handleSubmit = (values: FormProps) => {
		const updatedForm = { ...groupForm, name: values.name }

		setTimeout(() => {
			props.navigation.navigate(Pages.GROUP_EDITOR2, {
				groupForm: updatedForm,
				isEdit: props.route.params?.isEdit,
				setRerender: props.route.params?.setRerender,
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
					<Text style={GlobalStyles.subheader}>{`${language.STEP} 1/3`}</Text>
				</View>

				<Formik
					initialValues={{
						name: groupForm.name || '',
					}}
					onSubmit={handleSubmit}
					validationSchema={validationSchema}
				>
					{(props: FormikProps<FormProps>) => (
						<View style={GlobalStyles.form}>
							<View style={[GlobalStyles.inputFields, GlobalStyles.center]}>
								<TextField
									value={props.values.name}
									placeholder={language.NAME}
									handleChange={props.handleChange('name')}
									error={props.errors.name}
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
