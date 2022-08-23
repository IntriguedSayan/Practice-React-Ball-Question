import { Stack } from "@chakra-ui/react";
import { useEffect, useState } from "react";
import Ball from "./Ball";



export default function Balls(){

  const[balls,setBalls]=useState([])


  useEffect(()=>{

    fetch(`https://hidden-shore-51148.herokuapp.com/balls`)
    .then((res)=>res.json())
    .then((res)=>setBalls(res))
    .catch((err)=>console.log(err))
  },[])

    return(
        <Stack id="balls" border={"1px solid black"} width="25%" padding={"2%"}>
        {
          balls.map((elem)=>(
            <Ball key={elem.id} color={elem.backGroundColour} />
          ))
        }
      </Stack>
    )
}