import React from "react";
import { Link } from "react-router-dom";
import { Button, HStack } from "@chakra-ui/react";
import { useState } from "react";

const Header = () => {
  const [buttonClicked, setButtonClicked] = useState(1);
  const buttonColor1 = buttonClicked === 1 ? "teal" : "White";
  const buttonColor2 = buttonClicked === 2 ? "teal" : "White";
  const buttonColor3 = buttonClicked === 3 ? "teal" : "White";

  return (
    <HStack p={"4"} shadow={"base"} bgColor={"blackAlpha.900"}>
      <Button
        variant={"unstyled"}
        color={buttonColor1}
        _hover={{ color: "teal" }}
        onClick={() => setButtonClicked(1)}
      >
        <Link to="/">Home</Link>
      </Button>

      <Button
        variant={"unstyled"}
        color={buttonColor2}
        _hover={{ color: "teal" }}
        onClick={() => setButtonClicked(2)}
      >
        <Link to="/exchanges">Exchanges</Link>
      </Button>

      <Button
        variant={"unstyled"}
        color={buttonColor3}
        _hover={{ color: "teal" }}
        onClick={() => setButtonClicked(3)}
      >
        <Link to="/coins">Coins</Link>
      </Button>
    </HStack>
  );
};

export default Header;
