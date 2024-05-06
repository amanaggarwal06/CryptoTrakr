import { Box, Image, Text } from "@chakra-ui/react";
import React from "react";
import bgImage from "../assets/Coin.png";
import { motion } from "framer-motion";

const Home = () => {
  return (
    <Box bgColor={"blackAlpha.900"} w={"full"} h={"58vh"} mt={""}>
      <motion.div
        style={{
          height: "50vh",
        }}
        animate={{
          translateY: "20px",
        }}
        transition={{
          duration: 1,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Image
          w={"full"}
          h={"50vh"}
          objectFit={"contain"}
          src={bgImage}
          filter={"grayscale(1)"}
        />
      </motion.div>

      <Text
        fontSize={"6xl"}
        textAlign={"center"}
        fontWeight={"thin"}
        color={"whiteAlpha.700"}
      >
        CryptoTrackr
      </Text>
    </Box>
  );
};

export default Home;
