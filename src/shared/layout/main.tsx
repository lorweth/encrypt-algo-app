import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Main({ children }) {
  return (
    <Box as="div" w="100vw" h="100vh" display="flex" flexDirection="column" justifyContent="center">
      <Box as="div" display="flex" justifyContent="center" flexDirection="row">
        {children}
      </Box>
    </Box>
  );
}
