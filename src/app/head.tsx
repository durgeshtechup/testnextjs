import React from "react";

export default function RootHead() {
	return <>
			<link rel="apple-touch-icon" href="/favicon.ico" />
			{/* <link rel="apple-touch-icon" href="/favicon-2.png" /> */}
			<link rel="manifest" href="/manifest.json" />
			<link
				rel="shortcut icon"
				type="image/x-icon"
				href={process.env.NEXT_PUBLIC_BASE_PATH || '' + '/favicon.ico'}
			/>

 {/* <title>Lightning Checks</title>  */}

      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <meta name="theme-color" content="#000000" />

	</>
}