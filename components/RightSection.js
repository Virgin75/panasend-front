import Image from 'next/image'
import triangle from '../public/triangle.svg'
import { Badge } from "@nextui-org/react";


export default function RightSection(props) {

  return (
    <div style={{padding: '2em'}}>
      <div style={{display: 'flex', flexDirection: 'row', gap: '25px', alignItems: 'center', flexWrap: 'wrap'}}>
        <Image
          src={props.icon}
          height={50}
          width={50}
        />
        <div style={{marginRight: 'auto', display: "flex", marginLeft: '-63px', alignItems: "center"}}>
          <Image
            src={triangle}
            height={90}
            width={90}
            style={{position: 'absolute'}}
          />
          <h1 style={{marginLeft: "-36px", marginTop: '7px', zIndex: 2}}>{props.title}</h1>
          {props.hasRole &&
            <Badge enableShadow disableOutline color="warning" css={{display: "block", marginLeft: "27px"}}>
              Role: {props.role}
            </Badge>
          }
          
        </div>
        
        <div>{props.cta1}</div>
        <div>{props.cta2}</div>
      </div>

      <div style={{marginTop: "20px", marginBottom: '35px'}}>
        <p>{props.description}</p>
      </div>

      <div>
        {<props.content />}
      </div>
    </div>
  )
}
