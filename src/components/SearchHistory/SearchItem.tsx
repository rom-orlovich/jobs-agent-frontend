import { UseDownloadHooksProps } from '@/hooks/useDownloadController';
import { ReturnTypeUseScannerHooksProps } from '@/hooks/useScannerController';
import { UserQuery } from '@/lib/types/api.types';
import { TriggerByHash } from '../Buttons/Button.types';
import SearchItemButtons from './SearchItem/SearchItemButtons';

import SearchItemContent from './SearchItem/SearchItemContent';
import SearchItemsHeaders from './SearchItem/SearchItemsHeaders';
const searchItemStyle = {
  item: 'bg-white shadow-lg rounded-md flex flex-col border-none sm:max-w-[80%] flex-[50%] p-[1.5rem] gap-3'
};

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
