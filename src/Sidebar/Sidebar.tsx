import type { SelectedLocation } from '../types';
import { SidebarContainer } from './elements';
import { CoordinatesTile } from './tiles/CoordinatesTile';
import { CountryTile } from './tiles/CountryTile';
import { FlagTile } from './tiles/FlagTile';

export const Sidebar = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  console.log('rendering sidebar');
  return (
    <SidebarContainer>
      <CoordinatesTile selectedLocation={selectedLocation} />
      <CountryTile selectedLocation={selectedLocation} />
      <FlagTile selectedLocation={selectedLocation} />
    </SidebarContainer>
  );
};
