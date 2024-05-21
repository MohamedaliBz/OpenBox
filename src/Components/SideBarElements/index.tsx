
type Props = {
    icon: string ,
    name : string
}

export const Element = (props: Props) => {
  return (
    <div className="self-stretch rounded-lg flex flex-col items-start justify-start py-4 px-0">
        <div className="w-[186px] h-6 flex flex-row items-center justify-start gap-[16px]">
            <img className="w-6 relative h-6" alt="" src={props.icon} />
            <div className="relative leading-[24px] font-medium ">
                {props.name}
            </div>
        </div>
    </div>
  )
}

export const Element1 = (props: Props) => {
  return (
    <div className="w-[232px] rounded-lg flex flex-col items-start justify-start p-4 box-border">
            <div className="w-[186px] h-6 flex flex-row items-center justify-start gap-[16px]">
              <img
                className="w-6 relative h-6 overflow-hidden shrink-0"
                alt=""
                src={props.icon}
              />
              <div className="relative leading-[24px] font-medium ">
                {props.name}
              </div>
            </div>
          </div>
  )
}

