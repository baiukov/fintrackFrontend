import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
export const Calculator = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		fill={props.color}
		viewBox='0 0 128 128'
		{...props}
	>
		<Path
			fillRule='evenodd'
			d='M42 103.5a7.5 7.5 0 0 1-7.5-7.5V32a7.5 7.5 0 0 1 7.5-7.5h43a7.5 7.5 0 0 1 7.5 7.5v64a7.5 7.5 0 0 1-7.5 7.5H42Zm3.5-54a3 3 0 0 1-3-3v-10a3 3 0 0 1 3-3h37a3 3 0 0 1 3 3v10a3 3 0 0 1-3 3h-37Zm0 13a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm3 14a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm14-30a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm3 14a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm14-30a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm3 14a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 8a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-3a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v3Zm14-30a3 3 0 0 1-3-3v-3a3 3 0 0 1 3-3h3a3 3 0 0 1 3 3v3a3 3 0 0 1-3 3h-3Zm-3 30a3 3 0 0 0 3 3h3a3 3 0 0 0 3-3v-25a3 3 0 0 0-3-3h-3a3 3 0 0 0-3 3v25Z'
			clipRule='evenodd'
		/>
	</Svg>
)
