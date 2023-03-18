import { UseDownloadHooksProps } from '@/hooks/useDownloadController';
import { ReturnTypeUseScannerHooksProps } from '@/hooks/useScannerController';
import { UserQuery } from '@/lib/types/user.types';
import { TriggerByHash } from '../../Buttons/Button.types';
import SearchItemButtons from './SearchItemButtons';

import SearchItemContent from './SearchItemContent';
import SearchItemsHeaders from './SearchItemsHeaders';
const searchItemStyle = {
  item: 'bg-white shadow-lg rounded-md flex flex-col border-none sm:max-w-[100%] flex-[50%] p-[1.5rem] gap-3'
};
/**
 * User's search query item.
 */
function SearchItem({
  handleDeleteButton,
  handleEditButton,
  handleLoadButton,
  handleDownloadButton,
  ...props
}: UserQuery &
  UseDownloadHooksProps &
  ReturnTypeUseScannerHooksProps & {
    handleEditButton: TriggerByHash;
    handleDeleteButton: TriggerByHash;
  }) {
  const { hash, downloadState, scanner } = props;
  return (
    <li className={searchItemStyle.item}>
      <SearchItemsHeaders
        handleDeleteButton={handleDeleteButton}
        handleEditButton={handleEditButton}
        hash={hash}
      />
      <SearchItemContent {...props} />

      <SearchItemButtons
        downloadState={downloadState}
        handleDownloadButton={handleDownloadButton}
        handleLoadButton={handleLoadButton}
        scanner={scanner}
        hash={props.hash}
      />
    </li>
  );
}

export default SearchItem;
