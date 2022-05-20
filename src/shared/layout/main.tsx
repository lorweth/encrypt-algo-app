import { Box } from '@chakra-ui/react';
import React from 'react';

export default function Main({ children }) {
  return (
    <Box as="div" display="flex" justifyContent="center" flexDirection="row">
      {children}
    </Box>
  );
}
