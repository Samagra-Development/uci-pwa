'use client';

import { Flex } from '@chakra-ui/react';
import Chats from './chats/[chatid]/page';
import Home from './home/page';

const ParentComponent = () => {
    return (
        <Flex>
            <Home />
            <Chats />
        </Flex>
    );
};

export default ParentComponent;
