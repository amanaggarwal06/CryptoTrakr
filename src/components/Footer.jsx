import { Box, Stack, Text, VStack, Avatar } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <Box
      bgColor={"blackAlpha.900"}
      color={"whiteAlpha.700"}
      minH={"48"}
      px={"16"}
      py={["16", "30"]}
    >
      <Stack direction={["column", "row"]} h={"full"} alignItems={"center"}>
        <VStack w={"full"} alignItems={["center", "flex-start"]}>
          <Text fontWeight={"bold"}>About Us</Text>
          <Text
            fontSize={"sm"}
            letterSpacing={"widest"}
            textAlign={["center", "left"]}
          >
            CryptoTrackr is your one-stop destination for cryptocurrency
            tracking. We provide real-time price updates, portfolio management,
            and crypto news in an easy-to-use platform. Join us to stay ahead in
            the world of digital assets.
          </Text>
        </VStack>

        <VStack>
          <a href="https://www.linkedin.com/in/aman-aggarwal06/">
            <Avatar
              boxSize={"28"}
              mt={["4", "0"]}
              src="https://media.licdn.com/dms/image/C4D03AQH7kHXpNHwvqQ/profile-displayphoto-shrink_200_200/0/1651732840086?e=1700697600&v=beta&t=UJIh0nUCHuNWnW9Ugk60mgLRduL7wXOF-bPzeQiYqHs"
            //   filter={"grayscale(1)"}
            />
          </a>

          <Text>Designed By Aman Aggarwal</Text>
        </VStack>
      </Stack>
    </Box>
  );
};

export default Footer;
