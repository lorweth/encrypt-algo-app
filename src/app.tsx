import {
  Box,
  Button,
  Divider,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  Text,
  Textarea,
  useToast,
} from '@chakra-ui/react';
import { debug } from 'console';
import React, { useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useAppDispatch, useAppSelector } from './configs/store';
import { CryptorFactory, CryptorList, CryptorName } from './shared/functions/cryptor-factory';
import Main from './shared/layout/main';
import { Cryptor } from './shared/models/cryptor';
import { Log, Logger } from './shared/models/log';
import { addLog, reset } from './shared/reducers/logger.reducer';

const App = () => {
  const toast = useToast();
  const dispatch = useAppDispatch();
  const { logs, loading } = useAppSelector(state => state.logger);

  const debugLog: Logger = {
    log(message: Log) {
      dispatch(addLog(message));
    },
  };

  const cryptorFactory = new CryptorFactory(debugLog);

  const [cryptor, setCryptor] = React.useState<Cryptor>(cryptorFactory.getCryptor('caesar'));

  const [result, setResult] = React.useState<string>('pending...');

  const { handleSubmit, watch, control } = useForm<{
    cryptor: CryptorName;
    type: 'de' | 'en';
    data: string;
    key: string | number;
  }>({
    defaultValues: {
      cryptor: cryptor.getName(),
      type: 'en',
      data: 'Toss a coin to your developer!',
      key: 5,
    },
  });

  // Update cryptor when cryptor changes
  const watchCryptor = watch('cryptor');

  useEffect(() => {
    // Update cryptor when select other cryptor name in form
    setCryptor(cryptorFactory.getCryptor(watchCryptor));
    toast({
      title: 'Cryptor changed',
      description: `Cryptor changed to ${watchCryptor}`,
      position: 'top-right',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
    dispatch(reset());
    setResult('pending...');
  }, [watchCryptor]);

  const onSubmit = values => {
    if (values.type === 'de') {
      setResult(cryptor.decrypt(values.data, values.key));
    } else if (values.type === 'en') {
      setResult(cryptor.encrypt(values.data, values.key));
    } else {
      toast({
        title: 'Error',
        description: 'Type is not defined',
        position: 'top-right',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Main>
      <Box
        as="div"
        sx={{
          borderWidth: 2,
          borderColor: 'blue.200',
          borderRadius: 'lg',
          padding: 5,
          margin: 3,
        }}
      >
        <Heading as="h5" size="lg" mb={2}>
          Encrypt/Decrypt with simple Algorithms
        </Heading>
        <Divider />
        <Box
          as="div"
          p={2}
          display="flex"
          flexDirection={{ base: 'column', lg: 'row' }}
          justifyContent="center"
        >
          <Box as="form" onSubmit={handleSubmit(onSubmit)} flex={1} minWidth="xs">
            <Controller
              name="cryptor"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl margin={1}>
                  <FormLabel htmlFor="cryptor-input">Algorithms</FormLabel>
                  <Select id="cryptor-input" w="100%" {...field}>
                    {Object.keys(CryptorList).map(k => (
                      <option key={k} value={k}>
                        {CryptorList[k]}
                      </option>
                    ))}
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="type"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl margin={1}>
                  <FormLabel htmlFor="type-input">Type</FormLabel>
                  <Select id="type-input" w="100%" {...field}>
                    <option value="en">Encrypt</option>
                    <option value="de">Decrypt</option>
                  </Select>
                </FormControl>
              )}
            />

            <Controller
              name="data"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl margin={1}>
                  <FormLabel htmlFor="data-input">Data</FormLabel>
                  <Textarea id="data-input" w="100%" {...field} />
                </FormControl>
              )}
            />

            <Controller
              name="key"
              rules={{ required: true }}
              control={control}
              render={({ field }) => (
                <FormControl margin={1}>
                  <FormLabel htmlFor="key-input">Key</FormLabel>
                  <Input type="text" id="key-input" w="100%" {...field} />
                </FormControl>
              )}
            />

            <Button type="submit" colorScheme="teal" minWidth="xs" variant="outline" m={1}>
              Submit
            </Button>
          </Box>

          <Box
            as="div"
            ml={{ base: 'none', lg: 6 }}
            mt={{ base: 6, lg: 'none' }}
            flex={1}
            minWidth="xs"
            p={2}
          >
            <Box
              as="p"
              p={2}
              mb={2}
              fontFamily="monospace"
              fontSize="md"
              color="white"
              bgColor="black"
              borderRadius="lg"
            >
              {result}
            </Box>

            <Box
              as="div"
              p={2}
              display="flex"
              flexDirection="column"
              fontFamily="monospace"
              fontSize="md"
              color="white"
              bgColor="black"
              height={400}
              id="log-container"
              borderRadius="lg"
            >
              <InfiniteScroll
                dataLength={logs.length}
                style={{ width: 'inhenrit', height: 380 }}
                next={() => {}}
                loader={<p>Loading...</p>}
                hasMore={false}
                scrollableTarget="log-container"
              >
                {logs.map((log, index) => (
                  <Text key={index}>
                    {log.type.toUpperCase()}: {log.message}
                  </Text>
                ))}
              </InfiniteScroll>
            </Box>
          </Box>
        </Box>
      </Box>
    </Main>
  );
};
export default App;
