import { hydrate } from 'react-dom';
import { loadableReady } from '@loadable/component';

import App from '@fugu/page/App';

(async () => {
	loadableReady(() => {
		hydrate(<App />, document.getElementById('app'));
	});
})();
