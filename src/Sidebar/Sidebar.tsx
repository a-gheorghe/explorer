import type { SelectedLocation } from '../types';
import { SidebarContainer } from './elements';

export const Sidebar = ({
  selectedLocation,
}: {
  selectedLocation: SelectedLocation | undefined;
}) => {
  return (
    <SidebarContainer>
      {' '}
      Sidebar content location is {selectedLocation?.latitude},{' '}
      {selectedLocation?.longitude}{' '}
    </SidebarContainer>
  );
};
