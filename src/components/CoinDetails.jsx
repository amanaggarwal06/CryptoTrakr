import {
  Box,
  Container,
  HStack,
  Radio,
  RadioGroup,
  VStack,
  Text,
  Image,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  StatArrow,
  Badge,
  Progress,
  Button,
} from "@chakra-ui/react";
import React from "react";
import { useState, useEffect } from "react";
import Loader from "./Loader";
import { server } from "../index";
import { useParams } from "react-router-dom";
import axios from "axios";
import ErrorComponent from "./ErrorComponent";
import Chart from "./Chart";

const CoinDetails = () => {
  const [coin, setCoins] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  //   const [page, setPage] = useState(1);
  const [currency, setCurrency] = useState("inr");
  const [days, setDays] = useState("24h");
  const [chartArray, setChartArray] = useState([]);
  const params = useParams();
  const currencySymbol =
    currency === "inr" ? "₹" : currency === "eur" ? "€" : "$";
  //   console.log(params.id);

  const btns = ["24h", "7d", "14d", "30d", "60d", "365d", "max"];

  const switchChartStats = (key) => {
    setDays(key);
    setLoading(true);
    // switch (key) {
    //   case "24h":
    //     setDays("24h");
    //     setLoading(true);
    //     break;

    //   case "7d":
    //     setDays("7d");
    //     setLoading(true);
    //     break;

    //   case "14d":
    //     setDays("14d");
    //     setLoading(true);
    //     break;

    //   case "24h":
    //     setDays("24h");
    //     setLoading(true);
    //     break;

    //   case "24h":
    //     setDays("24h");
    //     setLoading(true);
    //     break;

    //   case "24h":
    //     setDays("24h");
    //     setLoading(true);
    //     break;

    //   case "24h":
    //     setDays("24h");
    //     setLoading(true);
    //     break;

    //   default:
    //     setDays("24h");
    //     setLoading(true);
    //     break;
    // }
  };

  useEffect(() => {
    const fetchCoin = async () => {
      try {
        const { data } = await axios.get(`${server}/coins/${params.id}`);

        const { data: chartData } = await axios.get(
          `${server}/coins/${params.id}/market_chart?vs_currency=${currency}&days=${days}`
        );
        // console.log(data);
        setCoins(data);
        setChartArray(chartData.prices);
        setLoading(false);
      } catch (error) {
        setError(true);
        setLoading(false);
      }
    };

    fetchCoin();
  }, [params.id, currency, days]);
  if (error)
    return <ErrorComponent message={"Error While fetching coin Details"} />;

  return (
    <Container maxW={"container.lg"}>
      {loading ? (
        <Loader />
      ) : (
        <>
          <VStack spacing={"4"} p={"16"} alignItems={"flex-start"}>
            <Text fontSize={"small"} alignSelf={"center"} opacity={"0,7"}>
              Last Updated on{" "}
              {Date(coin.market_data.last_updated).split("G")[0]}
            </Text>

            <Image
              src={coin.image.large}
              w={"16"}
              h={"16"}
              objectFit={"contain"}
            ></Image>
            <Stat>
              <StatLabel>{coin.name}</StatLabel>
              <StatNumber>
                {currencySymbol}
                {coin.market_data.current_price[currency]}
              </StatNumber>
              <StatHelpText>
                <StatArrow
                  type={
                    coin.market_data.price_change_percentage_24h > 0
                      ? "increase"
                      : "decrease"
                  }
                />
                {coin.market_data.price_change_percentage_24h}%
              </StatHelpText>
            </Stat>
            <Badge fontSize={"2xl"} bgColor={"blackAlpha.800"} color={"White"}>
              {`#${coin.market_cap_rank}`}
            </Badge>
            <CustomBar
              high={`${currencySymbol}${coin.market_data.high_24h[currency]}    `}
              low={`${currencySymbol}${coin.market_data.low_24h[currency]}`}
            />

            <RadioGroup value={currency} onChange={setCurrency} p={"8"}>
              <HStack spacing={"4"}>
                <Radio value={"inr"}>₹</Radio>
                <Radio value={"eur"}>€</Radio>
                <Radio value={"usd"}>$</Radio>
              </HStack>
            </RadioGroup>

            <Box borderWidth={1} width={"full"}>
              <Chart arr={chartArray} currency={currencySymbol} days={days} />
            </Box>
            <HStack p={"4"} wrap={"wrap"} overflowX={"auto"}>
              {btns.map((i) => (
                <Button key={i} onClick={() => switchChartStats(i)}>
                  {i}
                </Button>
              ))}
            </HStack>

            <Box w="full" p="4">
              <Item title={"Max Supply"} value={coin.market_data.max_supply} />
              <Item
                title={"Circulating Supply"}
                value={coin.market_data.circulating_supply}
              />

              <Item
                title={"Market Cap"}
                value={`${currencySymbol}${coin.market_data.market_cap[currency]}`}
              />

              <Item
                title={"All Time Low"}
                value={`${currencySymbol}${coin.market_data.atl[currency]}`}
              />
              <Item
                title={"All Time High"}
                value={`${currencySymbol}${coin.market_data.ath[currency]}`}
              />
            </Box>
          </VStack>
        </>
      )}
    </Container>
  );
};

const CustomBar = ({ high, low }) => (
  <VStack w={"full"}>
    <Progress value={50} colorScheme={"teal"} w={"full"} />
    <HStack justifyContent={"space-between"} w={"full"}>
      <Badge children={low} colorScheme={"red"} />
      <Text fontSize={"sm"}>24H Range</Text>
      <Badge children={high} colorScheme={"green"} />
    </HStack>
  </VStack>
);

const Item = ({ title, value }) => (
  <HStack justifyContent={"space-between"} w={"full"} my={"4"}>
    <Text fontFamily={"Bebas Neue"} letterSpacing={"widest"}>
      {title}
    </Text>
    <Text>{value}</Text>
  </HStack>
);

export default CoinDetails;
