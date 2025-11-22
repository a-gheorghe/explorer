import './App.css';
import { MapView } from './MapView/MapView';
import { Sidebar } from './Sidebar/Sidebar';
import { PageContainer } from './elements';
import { PanelGroup, Panel, PanelResizeHandle } from 'react-resizable-panels';
import type { SelectedLocation } from './types';
import { useState } from 'react';

function App() {
  const [selectedLocation, setSelectedLocation] = useState<SelectedLocation>();
  return (
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
  );
}

export default App;
