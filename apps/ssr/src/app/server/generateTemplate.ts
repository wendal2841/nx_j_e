export const generateTemplate = (
	lang: string,
	helmet: string,
	styles: string,
	app: string,
	scripts: string
): string => `
  <!DOCTYPE html>
  <html lang="${lang}">
    <head>
      <meta charset="utf-8">
      ${helmet}
      ${styles}
    </head>
    <body ondragstart="return false">
      <div id="app">${app}</div>
      ${scripts}
    </body>
  </html>
`;
