import React, { useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { RiArrowDropRightLine } from 'react-icons/ri';
import { get } from '@api/api_methods';
import { post } from '@api/purchaseReport';
import { put } from '@api/purchaseItem';
import { useGlobalContext } from '@components/global/context';
import {
  PrimaryButton,
  OutlinePrimaryButton,
  UnderlinePrimaryButton,
  CloseButton,
  Input,
  Textarea,
  Modal,
  Stepper,
} from '@components/common';
import { PurchaseReport, PurchaseOrder, PurchaseItem, User } from '@pages/purchasereports';
import PurchaseReportConfirmModal from '@components/purchasereports/PurchaseReportConfirmModal';

interface PurchaseOrderView {
  purchase_order: PurchaseOrder;
  user: User;
  purchase_item: PurchaseItem[];
}

interface ModalProps {
  purchaseOrderId: number;
  purchaseItemNum: number;
  isOpen: boolean;
  setIsOpen: Function;
  isOnlyReported: boolean;
}

export default function PurchaseReportAddModal(props: ModalProps) {
  const state = useGlobalContext();
  const router = useRouter();

  const [activeStep, setActiveStep] = useState<number>(1);
  const nextStep = () => {
    setActiveStep(activeStep + 1);
  };
  const prevStep = () => {
    setActiveStep(activeStep - 1);
  };
  const reset = () => {
    setActiveStep(1);
    setIsDone(false);
  };
  // 購入報告を登録するかどうかのフラグ
  const [isDone, setIsDone] = useState<boolean>(false);

  // 購入報告追加モーダルの開閉状態を管理
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const onOpen = () => {
    setIsOpen(true);
  };

  // 購入物品数だけステップを用意
  let steps = [];
  for (let i = 0; i < props.purchaseItemNum; i++) {
    steps.push({ label: '' });
  }

  // 購入報告
  const [formData, setFormData] = useState<PurchaseReport>({
    id: 0,
    user_id: state.user.id,
    discount: 0,
    addition: 0,
    finance_check: false,
    remark: '',
    purchase_order_id: props.purchaseOrderId,
    created_at: '',
    updated_at: '',
  });
  // 購入物品のリスト
  const [formDataList, setFormDataList] = useState<PurchaseItem[]>(() => {
    let initFormDataList = [];
    for (let i = 0; i < props.purchaseItemNum; i++) {
      let initFormData: PurchaseItem = {
        id: i + 1,
        item: '',
        price: 0,
        quantity: 0,
        detail: '',
        url: '',
        purchase_order_id: props.purchaseOrderId,
        finance_check: false,
        created_at: '',
        updated_at: '',
      };
      initFormDataList.push(initFormData);
    }
    return initFormDataList;
  });
  const [purchaseReportId, setPurchaseReportId] = useState<number>(1);

  // purchase_orderに紐づくpurchase_itemsを取得
  const getPurchaseItems = useCallback(async () => {
    const getPurchaseOrderViewURL = process.env.CSR_API_URI + '/get_purchaseorders_for_view/' + props.purchaseOrderId;

    const purchaseOrderViewRes: PurchaseOrderView = await get(getPurchaseOrderViewURL);
    let initFormDataList = [];
    if (purchaseOrderViewRes.purchase_item !== null) {
      for (let i = 0; i < purchaseOrderViewRes.purchase_item.length; i++) {
        let initFormData: PurchaseItem = {
          id: purchaseOrderViewRes.purchase_item[i].id,
          item: purchaseOrderViewRes.purchase_item[i].item,
          price: purchaseOrderViewRes.purchase_item[i].price,
          quantity: purchaseOrderViewRes.purchase_item[i].quantity,
          detail: purchaseOrderViewRes.purchase_item[i].detail,
          url: purchaseOrderViewRes.purchase_item[i].url,
          purchase_order_id: props.purchaseOrderId,
          finance_check: purchaseOrderViewRes.purchase_item[i].finance_check,
          created_at: purchaseOrderViewRes.purchase_item[i].created_at,
          updated_at: purchaseOrderViewRes.purchase_item[i].updated_at,
        };
        initFormDataList.push(initFormData);
      }
      setFormDataList(initFormDataList);
    }
  }, [props.purchaseOrderId, setFormDataList]);

  useEffect(() => {
    if (router.isReady) {
      getPurchaseItems();
    }
  }, [router, getPurchaseItems]);

  // 購入報告用のhandler
  const formDataHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLTextAreaElement> | React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [input]: e.target.value });
      };
  // 購入物品用のhandler
  const formDataListHandler =
    (input: string) =>
      (e: React.ChangeEvent<HTMLSelectElement> | React.ChangeEvent<HTMLInputElement>) => {
        setFormDataList(
          formDataList.map((formData: PurchaseItem) =>
            formData.id === Number(e.target.id) ? { ...formData, [input]: e.target.value } : formData,
          ),
        );
      };

  // finance_checkのtrue,falseを切り替え
  const isFinanceCheckHandler = (purchaseItemId: number, finance_check: boolean) => {
    setFormDataList(
      formDataList.map((formData: PurchaseItem) =>
        formData.id === purchaseItemId
          ? { ...formData, ['finance_check']: finance_check }
          : formData,
      ),
    );
  };

  // 購入報告の登録と購入物品の更新を行い、ページをリロード
  const submit = (data: PurchaseItem[]) => {
    addPurchaseReport();
    updatePurchaseItem(data);
    onOpen();
  };

  // 購入報告の追加
  const addPurchaseReport = async () => {
    const purchaseReportUrl = process.env.CSR_API_URI + '/get_post_purchasereports_record';
    const postRes = await post(purchaseReportUrl, formData);
    setPurchaseReportId(postRes.id);
  };

  // 購入物品を更新
  const updatePurchaseItem = async (data: PurchaseItem[]) => {
    data.map(async (item) => {
      let updatePurchaseItemUrl = process.env.CSR_API_URI + '/purchaseitems/' + item.id;
      const res = await put(updatePurchaseItemUrl, item);
    });
  };

  // 購入物品の情報
  const content: Function = (data: PurchaseItem) => (
    <>
      <div className={clsx('my-6 grid grid-cols-12 gap-4')}>
        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
          <div className={clsx('text-md flex items-center text-black-600')}>物品名</div>
        </div>
        <div className={clsx('col-span-10 grid w-full')}>
          <Input id={String(data.id)} value={data.item} onChange={formDataListHandler('item')} />
        </div>
        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
          <div className={clsx('text-md flex items-center text-black-600')}>単価</div>
        </div>
        <div className={clsx('col-span-10 grid w-full')}>
          <Input id={String(data.id)} value={data.price} onChange={formDataListHandler('price')} />
        </div>
        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
          <div className={clsx('text-md flex items-center text-black-600')}>個数</div>
        </div>
        <div className={clsx('col-span-10 grid w-full')}>
          <Input
            id={String(data.id)}
            value={data.quantity}
            onChange={formDataListHandler('quantity')}
          />
        </div>
        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
          <div className={clsx('text-md flex items-center text-black-600')}>詳細</div>
        </div>
        <div className={clsx('col-span-10 grid w-full')}>
          <Input
            id={String(data.id)}
            value={data.detail}
            onChange={formDataListHandler('detail')}
          />
        </div>
        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
          <div className={clsx('text-md flex items-center text-black-600')}>URL</div>
        </div>
        <div className={clsx('col-span-10 grid w-full')}>
          <Input id={String(data.id)} value={data.url} onChange={formDataListHandler('url')} />
        </div>
      </div>
    </>
  );

  return (
    <>
      {props.isOpen ? (
        <Modal className='!w-1/2'>
          <div className={clsx('w-full')}>
            <div className={clsx('mr-5 grid w-full justify-items-end')}>
              <CloseButton
                onClick={() => {
                  props.setIsOpen(false);
                }}
              />
            </div>
          </div>
          <div className={clsx('mb-10 grid w-full justify-items-center text-xl text-black-600')}>
            購入物品の登録
          </div>
          <div className={clsx('my-6 grid grid-cols-12 gap-4')}>
            <div className={clsx('col-span-1 grid')} />
            <div className={clsx('col-span-10 grid w-full')}>
              <Stepper stepNum={props.purchaseItemNum} activeStep={activeStep} isDone={isDone}>
                {!isDone && <>{content(formDataList[activeStep - 1])}</>}
              </Stepper>
              {isDone ? (
                <>
                  <div className={clsx('my-10 grid grid-cols-12 gap-4')}>
                    <div className={clsx('col-span-1 grid')} />
                    <div className={clsx('col-span-10 grid w-full justify-items-center')}>
                      <div className={clsx('my-6 grid w-full grid-cols-12 gap-4')}>
                        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
                          <div className={clsx('text-md flex items-center text-black-600')}>
                            割引
                          </div>
                        </div>
                        <div className={clsx('col-span-10 grid w-full')}>
                          <Input value={formData.discount} onChange={formDataHandler('discount')} />
                        </div>
                        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
                          <div className={clsx('text-md flex items-center text-black-600')}>
                            加算
                          </div>
                        </div>
                        <div className={clsx('col-span-10 grid w-full')}>
                          <Input value={formData.addition} onChange={formDataHandler('addition')} />
                        </div>
                        <div className={clsx('col-span-2 mr-2 grid justify-items-end')}>
                          <div className={clsx('text-md flex items-center text-black-600')}>
                            備考
                          </div>
                        </div>
                        <div className={clsx('col-span-10 grid w-full')}>
                          <Textarea value={formData.remark} onChange={formDataHandler('remark')} />
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className={clsx('col-span-1 grid')} />
                  <div className={clsx('grid justify-items-center')}>
                    <div className={clsx('flex')}>
                      <OutlinePrimaryButton onClick={reset} className={'mx-2'}>
                        戻る
                      </OutlinePrimaryButton>
                      <PrimaryButton
                        className={'mx-2'}
                        onClick={() => {
                          submit(formDataList);
                        }}
                      >
                        登録して確認
                      </PrimaryButton>
                      {isOpen && (
                        <PurchaseReportConfirmModal
                          purchaseReportId={purchaseReportId}
                          formDataList={formDataList}
                          isOpen={isOpen}
                          setIsOpen={setIsOpen}
                        />
                      )}
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <div className={clsx('mt-6 grid grid-cols-12 gap-4')}>
                    <div className={clsx('col-span-1 grid')} />
                    <div className={clsx('col-span-10 grid justify-items-center')}>
                      <div className={clsx('flex')}>
                        {/* stepが1より大きい時のみ戻るボタンを表示 */}
                        {activeStep > 1 && (
                          <OutlinePrimaryButton onClick={prevStep} className={'mx-2'}>
                            戻る
                          </OutlinePrimaryButton>
                        )}
                        <PrimaryButton
                          className={'mx-2 pl-4 pr-2'}
                          onClick={() => {
                            {
                              activeStep === steps.length ? setIsDone(true) : nextStep();
                            }
                            isFinanceCheckHandler(formDataList[activeStep - 1].id, true);
                          }}
                        >
                          <div className={clsx('flex')}>
                            {activeStep === steps.length ? '登録して確認' : '登録して次へ'}
                            <RiArrowDropRightLine size={23} />
                          </div>
                        </PrimaryButton>
                      </div>
                    </div>
                    <div className={clsx('col-span-1 grid')} />
                    {!props.isOnlyReported && (
                      <div className={clsx('col-span-12 grid w-full justify-items-center')}>
                        <UnderlinePrimaryButton
                          className={'pr-1'}
                          onClick={() => {
                            {
                              activeStep === steps.length ? setIsDone(true) : nextStep();
                            }
                            isFinanceCheckHandler(formDataList[activeStep - 1].id, false);
                          }}
                        >
                          {activeStep === steps.length ? '登録せずに確認' : '登録せずに次へ'}
                          <RiArrowDropRightLine size={23} />
                        </UnderlinePrimaryButton>
                      </div>
                    )}
                  </div>
                </>
              )}
            </div>
            <div className={clsx('col-span-1 grid')} />
          </div>
        </Modal>
      ) : null}
    </>
  );
}
