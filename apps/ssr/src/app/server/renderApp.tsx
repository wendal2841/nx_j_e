import { renderToString } from 'react-dom/server';
import { ChunkExtractor } from '@loadable/server';
import Helmet from 'react-helmet';
import App from '@fugu/page/App';
import path from 'path';
import { generateTemplate } from './generateTemplate';
import { getLoadableStatsPath } from './getLoadableStatsFile';

const statsFile = path.resolve(getLoadableStatsPath());

export const renderApp = async (): Promise<string> => {
	const extractor = new ChunkExtractor({ statsFile, entrypoints: ['app'] });

	const jsx = extractor.collectChunks(<App />);

	const app = renderToString(jsx);

	const css = extractor.getStyleTags();

	const scripts = extractor.getScriptTags();

	const helmet = Helmet.renderStatic();

	const _helmet = `${helmet.base.toString()} ${helmet.title.toString()} ${helmet.link.toString()} ${helmet.meta.toString()} ${helmet.script.toString()}`;

	return generateTemplate('ru', _helmet, css, app, scripts);
};
