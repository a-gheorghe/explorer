import type { SelectedLocation } from '../types';
import { SidebarContainer } from './elements';
import { CoordinatesTile } from './tiles/CoordinatesTile';
import { CountryTile } from './tiles/CountryTile';
import { FlagTile } from './tiles/FlagTile';
import { WildlifeTile } from './tiles/WildlifeTile';

export const Sidebar = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  console.log('rendering sidebar');
  if (!selectedLocation)
    return (
      <SidebarContainer>
        Click anywhere on the map to explore the location!
      </SidebarContainer>
    );
  return (
    <SidebarContainer>
      <CoordinatesTile selectedLocation={selectedLocation} />
      <CountryTile selectedLocation={selectedLocation} />
      <FlagTile selectedLocation={selectedLocation} />
      <WildlifeTile selectedLocation={selectedLocation} />
    </SidebarContainer>
  );
};
