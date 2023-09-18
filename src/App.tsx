import React from "react";
import Chat from "./components/Chat"

interface QueryParams {
  [key: string]: string | undefined
}

function App() {
  const { search } = window.location;
  const searchParams = new URLSearchParams(search);
  const queryParams: QueryParams = {};

  for (const [key, value] of searchParams.entries()) {
    queryParams[key] = value;
  }

  const { w, h, opacity, bg } = queryParams;

  const pageStyles: React.CSSProperties = {
    width: w ? `${w}px` : '100%',
    height: h ? `${h}px` : '600px',
  };

  const contentClasses = [
    'z-10',
    opacity ? `opacity-${Number(opacity)}` : 'opacity-100',
    bg ? `bg-${bg}` : 'bg-blue',
  ].join(' ');

  return (
    <div style={pageStyles}>
      <Chat className={`z-10 ${contentClasses}`} />
    </div>
  )
}

export default App
