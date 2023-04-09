import React, { useState } from 'react';

import { AddButton } from '@components/common';
import { Teacher, Department, User } from '@type/common';

import OpenAddModal from './AddModal';

interface Props {
  children?: React.ReactNode;
  teachers: Teacher[];
  departments: Department[];
  users: User[];
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
      {isOpen && (
        <OpenAddModal
          setShowModal={setIsOpen}
          teachers={props.teachers}
          departments={props.departments}
          users={props.users}
        />
      )}
    </>
  );
};

export default OpenAddModalButton;
