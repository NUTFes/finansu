import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, ChakraProvider } from '@chakra-ui/react';
import EditButton from '@components/General/EditButton';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Button,
  Flex,
  Spacer,
  Select,
} from '@chakra-ui/react';
import theme from '@assets/theme';
import { Center } from '@chakra-ui/react';
import { RiAddCircleLine } from 'react-icons/ri';
import Header from '@components/Header';
import { get, post, put, del } from '@api/purchaseOrder';
import OpenEditModalButton from '@components/General/OpenEditModalButton';

interface User {
  id: number;
  name: string;
}

interface PurchaseOrder{
  id: number;
  deadline: string;
  user_id: number;
  created_at: string;
  updated_at: string;
}

interface Props {
  user: User;
  purchaseOrder: PurchaseOrder[];
}
export async function getServerSideProps({params}: any) {
  const getPurchaseOrderUrl = process.env.SSR_API_URI + '/purchaseorders';
  const purchaseOrderRes = await get(getPurchaseOrderUrl);
  return {
    props:{
      purchaseOrder: purchaseOrderRes,
    }
  };
}

export default function PurchaseOrder(props: Props){
  const formatDate = (date: string) => {
    let datetime = date.replace('T', ' ');
    const datetime2 = datetime.substring(0, datetime.length - 4);
    return datetime2;
  };

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>FinanSu | 購入物品一覧</title>
        <meta name='description' content='ja' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <hr />
      <Center>
        <Box m='10' px='10' boxShadow='base' rounded='lg'>
          <Box mt='10' mx='5'>
            <Flex>
              <Center mr='5' fontSize='2xl' fontWeight='100' color='black.0'>
                購入申請一覧
              </Center>
              <Select variant='flushed' w='100'>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
              </Select>
            </Flex>
            <Flex>
              <Spacer />
              <Box>
                <Button
                  textColor='white'
                  leftIcon={<RiAddCircleLine color={'white'} />}
                  bgGradient='linear(to-br, primary.1, primary.2)'
                >
                  購入申請
                </Button>
              </Box>
            </Flex>
          </Box>
          <Box p='5' mb='2'>
            <Table>
              <Thead>
                <Tr>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      ID
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' mr='1' color='black.600'>
                      購入期限日
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      申請者
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7' isNumeric>
                    <Center fontSize='sm' color='black.600'>
                      申請日
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      金額
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center></Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.purchaseOrder.map((purchaseOrderItem) => (
                  <Tr key={purchaseOrderItem.id}>
                    <Td>
                      <Center color='black.300'>{purchaseOrderItem.id}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{purchaseOrderItem.deadline}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{purchaseOrderItem.user_id}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{formatDate(purchaseOrderItem.created_at)}</Center>
                    </Td>
                    <Td>
                    </Td>
                    <Td>
                      <Center>
                        <OpenEditModalButton id={purchaseOrderItem.id}/> </Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            </Table>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
};
