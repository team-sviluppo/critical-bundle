import { useState } from "react";
import { Host, Header, Urls, Download, Screen } from 'components';
import CriticalBundleContext from 'context';
import { IScreenInterface } from "interfaces";

function App() {

  const [host, setHost] = useState<string | null>(null);
  const [urls, setUrls] = useState<string[] | null>(null);
  const [screen, setScreen] = useState<IScreenInterface[] | null>(null);
  
  return (
        <CriticalBundleContext.Provider value={{setHost,
                                                setUrls,
                                                setScreen,
                                                host,
                                                urls,
                                                screen}}>
          <Header />
          <Download />
          <Host />
          <Urls />
          <Screen />
        </CriticalBundleContext.Provider>
  )
}

export default App
