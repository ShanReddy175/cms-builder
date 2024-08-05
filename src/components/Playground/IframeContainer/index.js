import React, { useEffect, useRef } from "react";
import ReactDOM from 'react-dom/client';
import { store } from "../../../redux/store";
import { Provider } from 'react-redux';

export default function IframeContainer(props){
    const iframeRef = useRef(null);
    const {children} = props;

    useEffect(() => {
      const iframe = iframeRef.current;
      const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;

      // Create a root element in the iframe
      const mountNode = iframeDoc.createElement('div');
      iframeDoc.body.appendChild(mountNode);
  
      // Create a root for the iframe and render React components into it
      const root1 = ReactDOM.createRoot(mountNode);
      root1.render(children);
  
      // Clean up on unmount
      return () => {
        // root1.unmount();
        iframeDoc.body.removeChild(mountNode);
      };
    }, [children]);
    return <>
        <Provider store={store}>
            <iframe title="page-iframe" ref={iframeRef} style={{ width: '100%', height: '100%', border: 'none' }} />
        </Provider>
    </>
}