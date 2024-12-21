import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
export const CreditCard = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		fill={props.color}
		viewBox='0 0 128 128'
		{...props}
	>
		<Path
			fill={props.color}
			fillRule='evenodd'
			d='M22.5 45a7.5 7.5 0 0 1 7.5-7.5h67a7.5 7.5 0 0 1 7.5 7.5v6h-82v-6Zm0 18v22a7.5 7.5 0 0 0 7.5 7.5h67a7.5 7.5 0 0 0 7.5-7.5V63h-82ZM35 76.5a2.5 2.5 0 0 0 0 5h16a2.5 2.5 0 0 0 0-5H35ZM32.5 71a2.5 2.5 0 0 1 2.5-2.5h28.5a2.5 2.5 0 0 1 0 5H35a2.5 2.5 0 0 1-2.5-2.5Z'
			clipRule='evenodd'
		/>
	</Svg>
)
