'use client';
import React, { useContext, useEffect, useState } from 'react';
import { Box, Button, Flex, useBreakpointValue } from '@chakra-ui/react';
import profilePic from '@/assets/images/bot_icon_2.png';
import styles from './page.module.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { useRouter, usePathname } from 'next/navigation';
import { AppContext } from '@/context';
import { ChatUiComponent, FullScreenLoader } from '@/components';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { config } from '@/config';
import {
    AvatarImage,
    BackBox,
    CenteredFlex,
    ChatWindow,
    FlexContainer,
    InnerRing,
    MainFlex,
    Span,
    StyledAvatarContainer,
    StyledBox,
    StyledCenteredFlex,
    StyledFlex,
    StyledText,
    TopSection,
} from './styled';
import { useTheme } from '@/providers/ThemeProvider';
import { useSelector } from 'react-redux';

interface chatProps {
    params?: { chatid: string };
}

const Chats = ({ params }: chatProps) => {
    const loading = useSelector((state: any) => state.userList.loading);
    const { theme } = useTheme();
    console.log(theme);
    const router = useRouter();
    const context = useContext(AppContext);
    const pathname = usePathname();
    const isHomepage = pathname === '/';
    const isMobile = useBreakpointValue({ base: true, md: false });
    const mainFlexWidth = isMobile ? '100vw' : '186vw';
    const [userImage, setUserImage] = useState(profilePic);

    useEffect(() => {
        if (context?.currentUser?.botImage) {
            fetch(context?.currentUser?.botImage)
                .then(res => {
                    if (res.status === 403) {
                        setUserImage(profilePic);
                    } else {
                        setUserImage(context?.currentUser?.botImage);
                    }
                })
                .catch(err => {
                    setUserImage(profilePic);
                });
        } else {
            setUserImage(profilePic);
        }
    }, [context?.currentUser?.botImage]);

    useEffect(() => {
        if (!params?.chatid) router.push('/');
    }, [router, params?.chatid]);

    console.log({ context });

    if (typeof window === undefined || typeof window === 'undefined')
        return (
            <>
                <div>hi</div>
            </>
        );

    return (
        <>
            <FlexContainer
                mainFlexWidth={mainFlexWidth}
                isHomepage={isHomepage}
            >
                <MainFlex>
                    {context?.currentUser ? (
                        <>
                            <TopSection theme={theme} config={config}>
                                <Box
                                    flex="1.5"
                                    display={{ base: 'block', md: 'none' }}
                                >
                                    <Button
                                        onClick={(): void => {
                                            localStorage.removeItem('userMsgs');
                                            context?.setMessages([]);
                                            router.push('/');
                                        }}
                                        variant="ghost"
                                    >
                                        <FontAwesomeIcon
                                            icon={
                                                config?.chatWindow?.topbar?.icon
                                            }
                                        />
                                    </Button>
                                </Box>
                                <StyledFlex>
                                    <StyledCenteredFlex>
                                        {context?.currentUser && (
                                            <StyledAvatarContainer
                                                config={config}
                                            >
                                                {
                                                    <>
                                                        <InnerRing
                                                            config={config}
                                                        >
                                                            <AvatarImage
                                                                src={userImage}
                                                                alt="profile pic"
                                                            />
                                                        </InnerRing>
                                                        <StyledBox>
                                                            <Span theme={theme}>
                                                                {
                                                                    context
                                                                        ?.currentUser
                                                                        ?.name
                                                                }
                                                            </Span>
                                                        </StyledBox>
                                                    </>
                                                }
                                            </StyledAvatarContainer>
                                        )}
                                    </StyledCenteredFlex>
                                </StyledFlex>
                            </TopSection>
                            {/* Chat Window */}
                            <ChatWindow config={config} theme={theme}>
                                {/* NeoMorphism Box */}
                                <BackBox config={config}>
                                    {/* Chat Area */}
                                    <Box
                                        height={
                                            config?.chatWindow?.window?.height
                                        }
                                    >
                                        <ChatUiComponent
                                            currentUser={context?.currentUser}
                                        />
                                    </Box>
                                </BackBox>
                            </ChatWindow>
                        </>
                    ) : (
                        <CenteredFlex>
                            <FullScreenLoader loading={loading}>
                                {' '}
                            </FullScreenLoader>
                            <StyledText>No bot is selected</StyledText>
                        </CenteredFlex>
                    )}
                </MainFlex>
            </FlexContainer>
        </>
    );
};

export default Chats;
