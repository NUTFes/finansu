import { Meta } from '@storybook/react';
import { EditButton } from '@components/common';

const meta: Meta<typeof EditButton> = {
  title: 'FinanSu/EditButton',
  component: EditButton,
  tags: ['autodocs'],
  argTypes: {},
};

export default meta;

export const Primary = {
  args: {
    className: 'm-10',
    children: <h1>children</h1>,
  },
};
