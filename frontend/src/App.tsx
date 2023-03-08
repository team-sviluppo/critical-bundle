import { useState } from "react";
import { Host, Header, Urls, Sizes, Download } from 'components';
import CriticalBundleContext from 'context';
import { IScreenInterface } from "interfaces";

function App() {

  const [host, setHost] = useState<string | null>(null);
  const [urls, setUrls] = useState<string[] | null>(null);
  const [screen, setScreen] = useState<IScreenInterface[] | null>(null);
  
  return (
    
      <div className="App">
        <CriticalBundleContext.Provider value={{setHost,
                                                setUrls,
                                                setScreen,
                                                host,
                                                urls,
                                                screen}}>
          <Header />
          <Host />
          <Urls />
          <Sizes />
          <Download />
        </CriticalBundleContext.Provider>
      </div>
  )
}

export default App
