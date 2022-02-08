import * as express from 'express';
import { NOT_FOUND } from 'http-status-codes';
import { Request, Response } from '@ssr/types';
import { getClientOutputPath } from './getClientOutputPath';
import { renderApp } from './renderApp';

const app = express();

app.use(express.static(getClientOutputPath()));

app.get('*', async (req: Request, res: Response) => {
	try {
		const app = await renderApp();

		res.send(app);
	} catch (error) {
		console.log(error);

		res.status(NOT_FOUND).send();
	}
});

const port = process.env.port || 3001;

const server = app.listen(port, () => {
	console.log(`Listening at http://localhost:${port}`);
});

server.on('error', console.error);
