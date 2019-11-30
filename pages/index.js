import {useState, useEffect} from 'react';
import Head from 'next/head';
import Manifest from 'next-manifest/manifest';

export default () => {
  const [power, setPower] = useState(false);
  const [speed, setSpeed] = useState(0);

  useEffect(() => {
    const connectionObserver = (e) => {
      setSpeed(e.target.downlink);
    };
    setSpeed(navigator.connection.downlink);
    navigator.connection.onchange = power ? connectionObserver : null;
    return () => {
      navigator.connection.onchange = null;
    };
  }, [power]);

  return (
    <div>
      Hello, World!
      <div> {power ? `${speed}Mbps` : 'Ready to Measure Speed'}</div>
      <button onClick={() => setPower(!power)}>
        {power ? 'Stop' : 'Start'}
      </button>
      <Head>
        <title>Test PWA</title>
        <Manifest href="/static/manifest.json" />
      </Head>
    </div>
  );
};
