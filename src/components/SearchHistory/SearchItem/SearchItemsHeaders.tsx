import { TriggerByHash } from '@/components/Buttons/Button.types';
import React from 'react';
import { AiTwotoneEdit } from 'react-icons/ai';
import { MdClear } from 'react-icons/md';

const searchItemHeadersStyle = {
  editButtonContainer: 'flex justify-between pl-2',
  editButton: 'text-adding-500 hover:text-adding-600 text-2xl',
  delateButton: 'text-error-500 hover:text-error-600 text-2xl'
};
function SearchItemsHeaders({
  handleDeleteButton,
  handleEditButton,
  hash
}: {
  hash?: string;
  handleEditButton: TriggerByHash;
  handleDeleteButton: TriggerByHash;
}) {
  return (
    <div className={searchItemHeadersStyle.editButtonContainer}>
      <button className={searchItemHeadersStyle.delateButton} onClick={handleDeleteButton(hash)}>
        <MdClear />
      </button>
      <button className={searchItemHeadersStyle.editButton} onClick={handleEditButton(hash)}>
        <AiTwotoneEdit />
      </button>
    </div>
  );
}

export default SearchItemsHeaders;
