import { CSSProperties } from 'react';

export type IconSize = 'xs' | 'sm' | 'md' | 'lg' | 'xlg';

export type IconAppearance =
	| 'blue'
	| 'green'
	| 'red'
	| 'white'
	| 'orange'
	| 'violet'
	| 'gray'
	| 'gray_dark'
	| 'gray_soft'
	| 'black';

export interface IPropsIcon {
	className?: string;
	glyph: string;
	size?: IconSize;
	appearance?: IconAppearance;
	style?: CSSProperties;
	onClick?: () => void;
}

export interface IIconCssClasses {
	wrapper: string;
}
