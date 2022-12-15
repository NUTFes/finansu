import clsx from 'clsx';
import { useRouter } from 'next/router';
import React, { FC } from 'react';
import { RiCloseCircleLine, RiExternalLinkLine, RiFileCopyLine } from 'react-icons/ri';
import { useRecoilState } from 'recoil';

import { userAtom } from '@/store/atoms';
import { del } from '@api/api_methods';
import { Checkbox, Modal, RedButton, Tooltip } from '@components/common';
import { PurchaseReportView } from '@pages/purchasereports';
import { PurchaseItem, PurchaseReport } from '@type/common';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  children?: React.ReactNode;
  id: number | string;
  purchaseReportViewItem: PurchaseReportView;
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

  // 購入報告の合計金額を計算
  const TotalFee = (purchaseReport: PurchaseReport, purchaseItems: PurchaseItem[]) => {
    let totalFee = 0;
    purchaseItems.map((purchaseItem: PurchaseItem) => {
      totalFee += purchaseItem.price * purchaseItem.quantity;
    });
    totalFee += purchaseReport.addition - purchaseReport.discount;
    return totalFee;
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
              {props.purchaseReportViewItem && props.purchaseReportViewItem.purchaseReport.id}
            </div>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>合計金額</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.purchaseReportViewItem &&
                TotalFee(
                  props.purchaseReportViewItem.purchaseReport,
                  props.purchaseReportViewItem.purchaseItems,
                )}
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
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 1 &&
                '総務局'}
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 2 &&
                '渉外局'}
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 3 &&
                '財務局'}
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 4 &&
                '企画局'}
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 5 &&
                '政策局'}
              {props.purchaseReportViewItem &&
                props.purchaseReportViewItem.reportUser.bureauID === 6 &&
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
              {props.purchaseReportViewItem &&
                formatDate(
                  props.purchaseReportViewItem.purchaseReport.createdAt
                    ? props.purchaseReportViewItem.purchaseReport.createdAt
                    : '',
                )}
            </div>
          </div>
          <div className={clsx('my-2 grid w-full grid-cols-12')}>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>割引</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.purchaseReportViewItem && props.purchaseReportViewItem.purchaseReport.discount}
            </div>
            <div className={clsx('col-span-3 mr-2 grid justify-items-end')}>
              <div className={clsx('text-md flex items-center text-black-600')}>加算</div>
            </div>
            <div
              className={clsx(
                'col-span-3 grid w-full border border-x-white-0 border-b-primary-1 border-t-white-0 pl-1',
              )}
            >
              {props.purchaseReportViewItem && props.purchaseReportViewItem.purchaseReport.addition}
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
                  <th className={clsx('w-3/12 pb-2')}>
                    <div className={clsx('text-center text-sm text-black-600')}>品名</div>
                  </th>
                ) : (
                  <th className={clsx('w-4/12 pb-2')}>
                    <div className={clsx('text-center text-sm text-black-600')}>品名</div>
                  </th>
                )}
                <th className={clsx('w-2/12 border-b-primary-1 pb-2')}>
                  <div className={clsx('text-center text-sm text-black-600')}>単価</div>
                </th>
                <th className={clsx('w-1/12 border-b-primary-1 pb-2')}>
                  <div className={clsx('text-center text-sm text-black-600')}>個数</div>
                </th>
                <th className={clsx('w-3/12 border-b-primary-1 pb-2')}>
                  <div className={clsx('text-center text-sm text-black-600')}>詳細</div>
                </th>
                <th className={clsx('w-2/12 border-b-primary-1 pb-2')}>
                  <div className={clsx('text-center text-sm text-black-600')}>URL</div>
                </th>
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
              {props.purchaseReportViewItem?.purchaseItems.map((purchaseItem) => (
                <tr key={purchaseItem.id} className={clsx('w-full')}>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {purchaseItem.item}
                    </div>
                  </td>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {purchaseItem.price}
                    </div>
                  </td>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {purchaseItem.quantity}
                    </div>
                  </td>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      {purchaseItem.detail}
                    </div>
                  </td>
                  <td className={clsx('border-b py-3')}>
                    <div className={clsx('text-center text-sm text-black-300')}>
                      <div className={clsx('flex justify-center')}>
                        <a
                          className={clsx('mx-1')}
                          href={purchaseItem.url}
                          target='_blank'
                          rel='noopener noreferrer'
                        >
                          <RiExternalLinkLine size={'16px'} />
                        </a>
                        <Tooltip text={'copy URL'}>
                          <RiFileCopyLine
                            className={clsx('mx-1')}
                            size={'16px'}
                            onClick={() => {
                              navigator.clipboard.writeText(purchaseItem.url);
                            }}
                          />
                        </Tooltip>
                      </div>
                    </div>
                  </td>
                  {user.roleID === 3 ? (
                    <td className={clsx('border-b py-3')}>
                      <div className={clsx('text-center text-sm text-black-300')}>
                        <Checkbox checked={purchaseItem.financeCheck} disabled={true} />
                      </div>
                    </td>
                  ) : null}
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
              deletePurchaseOrders(props.id);
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
