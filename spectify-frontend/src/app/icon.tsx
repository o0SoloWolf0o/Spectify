
import { NextApiRequest, NextApiResponse } from 'next';
import ReactDOMServer from 'react-dom/server';

const IconHandler = (req: NextApiRequest, res: NextApiResponse) => {
	// Logic to generate and return the icon image
	const icon = (
		<div
			style={{
				fontSize: 24,
				background: '',
				width: '100%',
				height: '100%',
				display: 'flex',
				alignItems: 'center',
				justifyContent: 'center',
				color: 'white',
			}}
		>
			A
		</div>
	);

	const iconMarkup = ReactDOMServer.renderToStaticMarkup(icon);

	res.setHeader('Content-Type', 'image/png');
	res.status(200).end(iconMarkup);
};

export default IconHandler;
