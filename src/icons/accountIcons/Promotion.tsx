import * as React from 'react'
import Svg, { Path, Rect, SvgProps } from 'react-native-svg'
export const Promotion = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		fill={props.color}
		viewBox='0 0 128 128'
		{...props}
	>
		<Rect
			width={12}
			height={68}
			x={91}
			y={25}
			stroke={props.color}
			strokeWidth={5}
			rx={6}
		/>
		<Path
			stroke={props.color}
			strokeWidth={5}
			d='M51 75v21a6 6 0 0 0 12 0V76.558M33.5 69a8.5 8.5 0 0 1 0-17'
		/>
		<Path
			fill={props.color}
			fillRule='evenodd'
			d='M93.5 23.31v71.125l-8.079-6.924a44.273 44.273 0 0 0-27.346-10.633H48.5V41.626h9.613a39.806 39.806 0 0 0 26.864-10.488L93.5 23.31Zm-50 18.316v35.252H39a7.5 7.5 0 0 1-7.5-7.5V49.126a7.5 7.5 0 0 1 7.5-7.5h4.5Z'
			clipRule='evenodd'
		/>
	</Svg>
)
