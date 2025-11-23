import './App.css';
import { MapView } from './MapView/MapView';
import { Sidebar } from './Sidebar/Sidebar';
import { PageContainer } from './elements';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import type { Coordinates } from './types';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>();

  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25}>
            <Sidebar coordinates={coordinates} />
          </Panel>
          <PanelResizeHandle />

          <Panel>
            <MapView
              coordinates={coordinates}
              setCoordinates={setCoordinates}
            />
          </Panel>
        </PanelGroup>
      </PageContainer>
    </QueryClientProvider>
  );
}

export default App;
