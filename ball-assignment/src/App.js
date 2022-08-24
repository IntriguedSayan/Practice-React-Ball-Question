import { Box, Button, Flex, Input, Stack} from "@chakra-ui/react"
import { useEffect, useState } from "react"
import Ball from "./Components/Ball"




function App() {
  const[num,setNum]=useState(0)
  const [balls,setBalls]=useState([])
  const[newBalls,setNewBalls]=useState([])
  
  const getDataTwo=()=>{

    fetch(`http://localhost:8080/newBalls`)
    .then((res)=>res.json())
    .then((res)=>setNewBalls(res))
    .catch((err)=>console.log(err))

  }

  const getData=()=>{
    fetch(`http://localhost:8080/balls`)
    .then((res)=>res.json())
    .then((res)=>setBalls(res))
    .catch((err)=>console.log(err))
  }  
  const initDelete=()=>{
    fetch(`http://localhost:8080/balls/${num}`,{
      method:"DELETE",
      headers:{"content-type":"application/json"}
    })
    .then((res)=>console.log(res))
    .then(()=>getData())
    .then(()=>getDataTwo())
    .catch((err)=>console.log(err))
  }
  const initDeleteTwo=(num)=>{
    fetch(`http://localhost:8080/newBalls/${num}`,{
      method:"DELETE",
      headers:{"content-type":"application/json"}
    })
    .then((res)=>console.log(res))
    .then(()=>getData())
    .then(()=>getDataTwo())
    .catch((err)=>console.log(err))
  }
  const initPost=(elem)=>{

    fetch(`http://localhost:8080/balls`,{
      method:"POST",
      body:JSON.stringify(elem),
      headers:{"content-type":"application/json"}
    })
    .then((res)=>console.log(res))
    .then(()=>initDeleteTwo(elem.id))
    .catch((err)=>console.log(err))
  
  }

  const handleClick=()=>{

    
      const selectedBall=balls.find((elem)=>elem.id===num)

      fetch(`http://localhost:8080/newBalls`,{
        method:"POST",
        body:JSON.stringify(selectedBall),
        headers:{"content-type":"application/json"}
      })
      .then((res)=>console.log(res))
      .then(()=>initDelete())
      .catch((err)=>console.log(err))
    
    }

  const returnClick=(elem)=>{
    initPost(elem)

  }  
  useEffect(()=>{

    getData()
    getDataTwo()

  },[]) 



  return (
    <div className="App">
      <Flex justify={"center"} align="center" gap={"5%"}>
      <Box id="addball" border={"1px solid teal"} width="35%" height={"700px"}>
        {
          newBalls?.length!==0 && newBalls.map((elem)=>(
            <Ball key={elem.id} color={elem.backGroundColour} id={elem.id} onClick={()=>returnClick(elem)}/>
          ))
        }
      </Box>
        {
           <Stack id="balls" border={"1px solid black"} width="25%" padding={"2%"}>
           {
             balls.sort((a,b)=>a.id-b.id).map((elem)=>(
               <Ball key={elem.id} color={elem.backGroundColour} id={elem.id} />
             ))
           }
         </Stack>
        }
      <Box>
        <Input type={"number"} maxLength="1" onChange={(e)=>setNum(Number(e.target.value))} width={"150px"} border="2px solid teal" placeholder="write the ball number"  />
        <Button onClick={handleClick}>Push</Button>
      </Box>
      </Flex>
    
      
    </div>
  )
}

export default App
