import * as React from 'react'
import Svg, { Path, SvgProps } from 'react-native-svg'
export const Wallet = (props: SvgProps) => (
	<Svg
		width={props.width}
		height={props.height}
		fill={props.color}
		viewBox='0 0 128 128'
		{...props}
	>
		<Path
			stroke={props.color}
			strokeWidth={5}
			d='M27.217 56.125a3.63 3.63 0 0 1 1.303-5.446L75.8 27.525c3.323-1.626 7.2.792 7.2 4.49v20.38a5 5 0 0 1-5.414 4.982L49.55 55.046a4.998 4.998 0 0 0-1.097.03l-17.84 2.46a3.63 3.63 0 0 1-3.396-1.411Z'
		/>
		<Path
			fill={props.color}
			fillRule='evenodd'
			d='M31 47.5a7.5 7.5 0 0 0-7.5 7.5v5.55c.162-.033.329-.05.5-.05h80c.171 0 .338.017.5.05V55a7.5 7.5 0 0 0-7.5-7.5H31Zm73.5 17.95c-.162.033-.329.05-.5.05H24c-.171 0-.338-.017-.5-.05v22.1c.162-.033.329-.05.5-.05h80c.171 0 .338.017.5.05V84h-14a7.5 7.5 0 0 1 0-15h14v-3.55ZM23.5 97v-4.55c.162.033.329.05.5.05h80c.171 0 .338-.017.5-.05V97a7.5 7.5 0 0 1-7.5 7.5H31a7.5 7.5 0 0 1-7.5-7.5Z'
			clipRule='evenodd'
		/>
	</Svg>
)
