// icon.tsx
import { NextApiRequest, NextApiResponse } from 'next';
import { renderToStaticMarkup } from 'react-dom/server';

const IconHandler = (req: NextApiRequest, res: NextApiResponse) => {
  try {
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

    // Convert the JSX element to a string
    const iconMarkup = renderToStaticMarkup(icon);

    // Send the icon markup directly as the response body
    res.setHeader('Content-Type', 'image/png');
    res.status(200).send(iconMarkup);
  } catch (error) {
    console.error('Error occurred:', error);
    res.status(500).send('Internal Server Error');
  }
};

export default IconHandler;
