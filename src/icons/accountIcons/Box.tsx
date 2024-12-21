import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
export const Box = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		fill={props.color}
		viewBox='0 0 128 128'
		{...props}
	>
		<Path
			stroke='black'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M102 52.423v23.1a7 7 0 0 1-3.386 5.994L84 90.326l-16.253 10.3a7.003 7.003 0 0 1-7.494 0L44 90.326l-14.614-8.809A7 7 0 0 1 26 75.522V52.423a7 7 0 0 1 3.316-5.952L45 36.761l15.316-9.48a7 7 0 0 1 7.368 0L83 36.76l15.684 9.71A7 7 0 0 1 102 52.423Z'
		/>
		<Path
			stroke='black'
			strokeLinecap='round'
			strokeLinejoin='round'
			strokeWidth={2}
			d='M101 50 64 73.075m0 0V102m0-28.925L44.5 61.537 27 50'
		/>
		<Path
			stroke='black'
			strokeLinecap='round'
			strokeWidth={2}
			d='m45.5 62 38-25'
		/>
		<Path
			fill='black'
			opacity={0.5}
			fillRule='evenodd'
			d='M64 101.5v-27L97 53l5.5-3v24.5L101 81l-37 20.5Z'
		/>
	</Svg>
)
