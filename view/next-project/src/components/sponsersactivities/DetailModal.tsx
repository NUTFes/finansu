import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { RiCloseCircleLine, RiExternalLinkLine, RiFileCopyLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

import { userAtom } from '@/store/atoms';
import { del } from '@api/api_methods';
import { Checkbox, Modal, RedButton, Tooltip } from '@components/common';
import { SponserActivitiesView } from '@type/common';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  id: React.ReactNode;
  sponserActivitiesViewItem: SponserActivitiesView;
  isDelete: boolean;
}

const DetailModal: FC<ModalProps> = (props) => {
  const [user] = useRecoilState(userAtom);

  const onClose = () => {
    props.setIsOpen(false);
  };

  const router = useRouter();

  const formatDate = (date: string) => {
    const datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 10);
    return datetime2;
  };

  const deletePurchaseOrders = async (id: number | string) => {
    const deletePurchaseOrderUrl = process.env.CSR_API_URI + '/purchaseorders/' + id;
    await del(deletePurchaseOrderUrl);
    router.reload();
  };

  return (
    <Modal>
      <div className={clsx('w-full')}>
        <div className={clsx('mr-5 grid w-full justify-items-end')}>
          <RiCloseCircleLine size={'23px'} color={'gray'} onClick={onClose} />
        </div>
      </div>
      <div
        className={clsx(
          'mb-8 grid w-full justify-items-center text-2xl font-thin leading-8 tracking-widest text-black-600',
        )}
      >
        報告の詳細
      </div>
      <div className={clsx('mb-8 grid grid-cols-12 gap-4')}>
        <div className={clsx('col-span-1 grid')} />
        <div className={clsx('col-span-10 grid')}>
          <div className={clsx('my-2 grid w-full grid-cols-12')}>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>ID</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.sponserActivitiesViewItem && props.sponserActivitiesViewItem.viewItem.id}
            </div>
          </div>
          <div className={clsx('col-span-1 grid ')} />
          <div className={clsx('my-2 grid w-full grid-cols-12')}>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>報告した局</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 1 &&
                '総務局'}
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 2 &&
                '渉外局'}
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 3 &&
                '財務局'}
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 4 &&
                '企画局'}
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 5 &&
                '政策局'}
              {props.sponserActivitiesViewItem &&
                props.sponserActivitiesViewItem.viewUser.bureauID === 6 &&
                '情報局'}
            </div>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>報告日</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.sponserActivitiesViewItem &&
                formatDate(
                  props.sponserActivitiesViewItem.viewItem.createdAt
                    ? props.sponserActivitiesViewItem.viewItem.createdAt
                    : '',
                )}
            </div>
          </div>
          <div className={clsx('my-2 grid w-full grid-cols-12')}></div>
          <div className={clsx('col-span-1 grid ')} />
        </div>
      </div>

      <div className={clsx('mt-2 mb-5 grid w-full justify-items-center text-base text-black-600')}>
        購入物品
      </div>
      <div className={clsx('grid h-[20rem] w-full justify-items-center')}>
        <div
          className={clsx('w-6/7 overflow-auto border border-x-0 border-t-0 border-b-primary-1')}
        >
          <table className={clsx('w-full table-fixed border-collapse')}>
            <thead>
              <tr
                className={clsx('border border-x-white-0 border-b-primary-1 border-t-white-0 py-3')}
              >
                {user.roleID === 1 ? (
                  <th className={clsx('w-3/9 pb-2')}>
                    <div className={clsx('text-center text-sm text-black-600')}>企業名</div>
                  </th>
                ) : (
                  <th className={clsx('w-4/9 pb-2')}>
                    <div className={clsx('text-center text-sm text-black-600')}>金額</div>
                  </th>
                )}
                {user.roleID === 3 ? (
                  <th className={clsx('w-2/12 border-b-primary-1 pb-2')}>
                    <div className={clsx('text-center text-sm text-black-600')}>局長確認</div>
                  </th>
                ) : null}
              </tr>
            </thead>
            <tbody
              className={clsx('w-full border border-x-white-0 border-b-primary-1 border-t-white-0')}
            >
              {/* <div className={clsx('flex items-start')}> */}
              {props.sponserActivitiesViewItem.sponserActivitiesItems.map((sponserActivitiesItem) => (
                <tr key={sponserActivitiesItem.id} className={clsx('w-full')}>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {sponserActivitiesItem.sponserName}
                    </div>
                  </td>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {sponserActivitiesItem.price}
                    </div>
                  </td>
                  
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <div className={clsx('mt-3 grid w-full justify-items-center')}>
        {props.isDelete && (
          <RedButton
            onClick={() => {
              deletePurchaseOrders(String(props.id));
            }}
          >
            申請を削除する
          </RedButton>
        )}
      </div>
    </Modal>
  );
};

export default DetailModal;
