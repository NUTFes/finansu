import type { NextPage } from 'next';
import Head from 'next/head';
import { Box, ChakraProvider } from '@chakra-ui/react';
import EditButton from '@components/General/EditButton';
import OpenModalButton from '@components/General/OpenModalButton';
import OpenDeleteModalButton from '@components/budget/OpenDeleteModalButton';
import OpenEditModalButton from '@components/budget/OpenEditModalButton';
import {
  Table,
  Thead,
  Tbody,
  Tfoot,
  Tr,
  Th,
  Td,
  Flex,
  Spacer,
  Select,
} from '@chakra-ui/react';
import theme from '@assets/theme';
import { Center } from '@chakra-ui/react';
import { RiPencilFill, RiAddCircleLine } from 'react-icons/ri';
import Header from '@components/Header';
import { get, post, put, del } from '@api/budget';
import {Source} from "postcss";

interface Budget {
  id: number;
  price: number;
  year_id: number;
  source_id: number;
  source: string;
  created_at: string;
  updated_at: string;
}

interface Source {
  id: number;
  name: string;
}

interface Year {
  id: number;
  year: number;
}

interface Props {
  budget: Budget[];
  source: Source[];
  year: Year[];
}

export async function getServerSideProps() {
  const getBudgetUrl = process.env.SSR_API_URI + '/budgets';
  const getSourceUrl = process.env.SSR_API_URI + '/sources';
  const getYearUrl = process.env.SSR_API_URI + '/years';
  const getUrl = process.env.SSR_API_URI + '/budgetyearsources/1';

  const budgetRes = await get(getBudgetUrl);
  const sourceRes = await get(getSourceUrl);
  const yearRes = await get(getYearUrl);
  const getRes = await get(getUrl);
  return {
    props: {
      budget: budgetRes,
      source: sourceRes,
      year: yearRes,
      res: getRes,
    },
  };
}

export default function BudgetList(props: Props) {
  const sourceList = props.source;
  const yearList = props.year;

  // 合計金額用の変数
  let totalFee = 0;

  // year_idからyearを取得するための処理（後々APIから取得する）
  // 合計金額を計算するための処理
  for (let i = 0; i < props.budget.length; i++) {
    for (let j = 0; j < yearList.length; j++) {
      if (props.budget[i].year_id == yearList[j].id) {
        props.budget[i].year_id = yearList[j].year;
      }
    }

    for (let j = 0; j < sourceList.length; j++) {
      if (props.budget[i].source_id == sourceList[j].id) {
        props.budget[i].source = sourceList[j].name;
      }
    }
    // 合計金額を計算
    totalFee += props.budget[i].price;
  }

  return (
    <ChakraProvider theme={theme}>
      <Head>
        <title>Create Next App</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <Header />
      <hr />
      <Center>
        <Box m='10' px='10' boxShadow='base' rounded='lg'>
          <Box mt='10' mx='5'>
            <Flex>
              <Center mr='5' fontSize='2xl' fontWeight='100' color='black.0'>
                予算一覧
              </Center>
              <Select variant='flushed' w='100'>
                <option value='2021'>2021</option>
                <option value='2022'>2022</option>
              </Select>
            </Flex>
            <Flex>
              <Spacer />
              <Box>
                <OpenModalButton>
                  <RiAddCircleLine
                    size={20}
                    style={{
                      marginRight: 5,
                    }}
                  />
                  予算登録
                </OpenModalButton>
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
                  <Th borderBottomColor='#76E4F7' isNumeric>
                    <Center fontSize='sm' color='black.600'>
                      項目
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center fontSize='sm' color='black.600'>
                      年度
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7' isNumeric>
                    <Center fontSize='sm' color='black.600'>
                      金額
                    </Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center></Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center></Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>作成日時</Center>
                  </Th>
                  <Th borderBottomColor='#76E4F7'>
                    <Center color='black.600'>更新日時</Center>
                  </Th>
                </Tr>
              </Thead>
              <Tbody>
                {props.budget.map((budgetItem) => (
                  <Tr key={budgetItem.id}>
                    <Td>
                      <Center color='black.300'>{budgetItem.id}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.source}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.year_id}</Center>
                    </Td>
                    <Td isNumeric color='black.300'>
                      {budgetItem.price}
                    </Td>
                    <Td>
                      <Center>
                        <OpenEditModalButton id={budgetItem.id} />
                      </Center>
                    </Td>
                    <Td>
                      <Center>
                        <OpenDeleteModalButton id={budgetItem.id} />
                      </Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.created_at}</Center>
                    </Td>
                    <Td>
                      <Center color='black.300'>{budgetItem.updated_at}</Center>
                    </Td>
                  </Tr>
                ))}
              </Tbody>
              <Tfoot>
                <Tr>
                  <Th />
                  <Th />
                  <Th>
                    <Center fontSize='sm' fontWeight='500' color='black.600'>
                      合計金額
                    </Center>
                  </Th>
                  <Th isNumeric fontSize='sm' fontWeight='500' color='black.300'>
                    {totalFee}
                  </Th>
                </Tr>
              </Tfoot>
            </Table>
          </Box>
        </Box>
      </Center>
    </ChakraProvider>
  );
}
