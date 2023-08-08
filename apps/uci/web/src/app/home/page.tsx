import React, { useContext, useEffect, useMemo, useState } from 'react';
import { Box, Flex, useBreakpointValue, Tabs, TabList, TabPanels, Tab, TabPanel, Text, Tooltip, IconButton, Heading, Input, InputGroup, InputRightElement, InputLeftElement } from '@chakra-ui/react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { filter, forEach } from 'lodash';
import { useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import styles from './index.module.css';
import ChatItem from '@/components/common/chat-item';
import moment from 'moment';
import StarredChatItem from '@/components/common/starred-chat-item';
import { User } from '@/types';
import { AppContext } from '@/context';
import { config } from '@/config';

export default function Home() {
  const { currentUser, allUsers, setMessages } = useContext(AppContext);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    try {
      const userMsgsFromLocal = JSON.parse(localStorage.getItem('userMsgs') || '');
      if (userMsgsFromLocal?.length > 0) {
        const userMsgs = filter(userMsgsFromLocal, {
          botUuid: currentUser?.id,
        });
        setMessages(userMsgs);
      }
    } catch (err: any) {
      toast.error(err?.message || err);
    }
  }, [setMessages, currentUser?.id]);

  const history = useRouter();
  const context = useContext(AppContext);

  // const onStarredChatsClick = useCallback((): void => {
  //   history.push('/starred-chats');
  // }, [history]);

  useEffect(() => {
    setTimeout(() => {
      context?.setLoading(false);
      if (document.getElementById('mainLoader')) {
        document.getElementById('loader').setAttribute('display', 'none');
        toast.error('चैटबॉट जवाब नहीं दे पा रहा हैं। कृपया बाद में पुन: प्रयास करें।');
      }
    }, 60000);
  }, [context]);

  const isMobile = useBreakpointValue({ base: true, md: false });

  const sortedUsers = useMemo(() => {
    return [...allUsers].sort((user1, user2) => {
      const user1Expired = (user1?.endDate !== undefined && user1.endDate < moment().format()) || (user1?.status !== 'ENABLED');
      const user2Expired = (user2?.endDate !== undefined && user2.endDate < moment().format()) || (user2?.status !== 'ENABLED');

      if (user1Expired && !user2Expired) {
        return 1;
      } else if (!user1Expired && user2Expired) {
        return -1;
      } else {
        return 0;
      }
    });
  }, [allUsers]);

  // Create a state to track the active tab
  const [activeTab, setActiveTab] = useState('bots');

  const onTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const starredBots = useMemo(() => {
    const botIds = Object.keys(context?.starredMsgs);
    const bots: Array<User> = [];
    forEach(context?.allUsers, (user) => {
      if (botIds.includes(user?.id)) bots.push(user);
    });
    return bots;
  }, [context?.allUsers, context?.starredMsgs]);

  const filteredUsers = useMemo(() => {
    if (searchTerm.trim() === '') {
      return sortedUsers;
    } else {
      const lowerCasedSearchTerm = searchTerm.trim().toLowerCase();
      return sortedUsers.filter((user) =>
        user.name.toLowerCase().includes(lowerCasedSearchTerm)
      );
    }
  }, [searchTerm, sortedUsers]);

  return (
    <Flex flexDirection="column" height="100vh" width="100vw">
      <Box className={`${styles.top_section}`} backgroundColor={config.heading.bgcolor} width={config?.heading?.width}>
        <Box flex="1.5">
          <Tooltip label={config.icon.chat.label}>
            <IconButton
              icon={<FontAwesomeIcon icon={config.icon.chat.icon} />}
              aria-label="Chats"
              size={config.icon.chat.size}
              colorScheme={config.icon.chat.colorScheme}
              variant={config.icon.chat.variant}
              margin={config.icon.chat.margin}
            />
          </Tooltip>
        </Box>
        <Flex flex="9" justifyContent="space-between" alignItems="center">
          <Flex justifyContent="center" alignItems="center">
            <Heading as="h1" size={config.heading.size} color={config.heading.color} margin={config.heading.margin}>
              {config.heading.text}
            </Heading>
          </Flex>
        </Flex>
      </Box>
      <Box height="75px" />
      <Box margin={config.search.margin} className={`${styles.search}`}>
        <InputGroup>
          <Input
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={config.search.placeholder}
            size={config.search.size}
            borderRadius={config.search.borderRadius}
            background={config.search.background}
            outline={config.search.outline}
            paddingLeft="50px"
          />
          <InputLeftElement justifyContent="center" padding={config.search.iconPadding}>
            <FontAwesomeIcon icon={config.search.icon} />
          </InputLeftElement>
        </InputGroup>
      </Box>
      <Box flex="1" overflow="hidden" overflowY="hidden">
        <Box className={`${styles.mainContainer}`} width={isMobile ? '100%' : '35%'}>
          <Box className={`${styles.backBox}`} background={config?.chatList?.background}>
            <Tabs isFitted variant="unstyled" colorScheme="teal" onChange={onTabChange} marginTop="5">
              <TabList display="flex" pl="1rem" pr="1rem" pt="1rem" mb="1rem" justifyContent="center" borderRadius="lg" overflow="hidden">
                <Tab
                  _selected={{ color: config.tab.bots.color, bg: config.tab.bots.background }}
                  _focus={{ outline: 'none' }}
                  fontWeight="bold"
                  textAlign="center"
                  fontSize={{ base: config.tab.bots.fontsize, md: config.tab.bots.fontsize }}
                  px="0rem"
                  py="0.5rem"
                  borderBottomWidth="2px"
                  borderRadius={config?.tab?.bots?.borderRadius}
                >
                  {config.tab.bots.text}
                </Tab>
                <Tab
                  _selected={{ color: config.tab.Starredchat.color, bg: config.tab.Starredchat.background }}
                  _focus={{ outline: 'none' }}
                  fontWeight="bold"
                  textAlign="center"
                  fontSize={{ base: config.tab.Starredchat.fontsize, md: config.tab.Starredchat.fontsize }}
                  px="0rem"
                  py="0.5rem"
                  flex="1"
                  borderBottomWidth="2px"
                  borderRadius={config?.tab?.Starredchat?.borderRadius}
                >
                  {config.tab.Starredchat.text}
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box className={`${styles.chatList}`} maxHeight="85vh" overflowY="auto">
                    {sortedUsers?.length > 0 ? (
                      <>
                        {sortedUsers.map((user: any, index: any) => (
                          <div key={user?.id}>
                            <ChatItem
                              key={index}
                              active={user.active}
                              name={user.name}
                              phoneNumber={user.number}
                              user={user}
                            />
                          </div>
                        ))}
                      </>
                    ) : (
                      <ChatItem
                        key={0}
                        active={false}
                        name={'No Bots Available'}
                        phoneNumber={''}
                        isBlank
                      />
                    )}
                  </Box>
                </TabPanel>
                <TabPanel>
                  <Box className={`${styles.chatList}`} maxHeight="60vh" overflowY="auto">
                    {starredBots.length > 0 ? (
                      <>
                        {(starredBots ?? [])?.map((user, index) => (
                          <StarredChatItem
                            toChangeCurrentUser={(): null => null}
                            key={index}
                            active={user.active}
                            name={user.name}
                            phoneNumber={user.number}
                            user={user}
                          />
                        ))}
                      </>
                    ) : (
                      <StarredChatItem
                        toChangeCurrentUser={(): null => null}
                        key={0}
                        active={false}
                        name={'No Starred Messages'}
                        isBlank
                      />
                    )}
                  </Box>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Box>
      </Box>
    </Flex>
  );
}