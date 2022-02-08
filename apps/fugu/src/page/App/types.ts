interface IPropsApp {
	name?: string;
}

export type IPropsAppContainer = IPropsApp;

export interface IPropsAppComponent extends IPropsApp {
	name: string;
	onClick: () => void;
}
