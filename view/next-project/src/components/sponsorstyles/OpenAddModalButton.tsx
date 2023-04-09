import React, { useState } from 'react';

import { AddButton } from '@components/common';

import SponsorStyleAddModal from './SponsorStyleAddModal';

interface Props {
  children?: React.ReactNode;
}

export const OpenAddModalButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  return (
    <>
      <AddButton
        onClick={() => {
          setIsOpen(true);
        }}
      >
        {props.children}
      </AddButton>
      {isOpen && <SponsorStyleAddModal setIsOpen={setIsOpen} />}
    </>
  );
};

export default OpenAddModalButton;
