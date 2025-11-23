import './App.css';
import { MapView } from './MapView/MapView';
import { Sidebar } from './Sidebar/Sidebar';
import { PageContainer } from './elements';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import type { Coordinates, SelectedLocation } from './types';
import { useState } from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

const queryClient = new QueryClient();

function App() {
  const [coordinates, setCoordinates] = useState<Coordinates>();
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>();

  return (
    <QueryClientProvider client={queryClient}>
      <PageContainer>
        <PanelGroup direction="horizontal">
          <Panel defaultSize={25}>
            <Sidebar selectedLocation={selectedLocation} />
          </Panel>
          <PanelResizeHandle />

          <Panel>
            <MapView
              selectedLocation={selectedLocation}
              setSelectedLocation={setSelectedLocation}
            />
          </Panel>
        </PanelGroup>
      </PageContainer>
    </QueryClientProvider>
  );
}

export default App;
