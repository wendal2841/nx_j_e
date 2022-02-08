import classNames from 'classnames';
import { IconAppearance, IconSize, IIconCssClasses } from './types';

import css from './Icon.module.scss';

const cx = classNames.bind(css);

export const getCSSClasses = (size: IconSize, appearance: IconAppearance, className = ''): IIconCssClasses => {
	const wrapper = cx(css.icon, css[`icon_size_${size}`], css[`icon_appearance_${appearance}`], {
		[`${className}`]: !!className,
	});

	return { wrapper };
};
