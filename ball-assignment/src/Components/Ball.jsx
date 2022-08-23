import { Box, Text } from "@chakra-ui/react";

export default function Ball({color,id,onClick}){

        return(

        <Box >
            <Box  width={"200px"} height="100px" ml={"10%"} backgroundColor={color} color="black" borderRadius="50%">
                <Text fontSize={"large"} m="15% 0 0 35%" onClick={onClick}>{id}</Text>
            </Box>
            
        </Box>

        )
}