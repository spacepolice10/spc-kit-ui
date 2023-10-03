import { Button } from '../../../button/button/components/Button'
import { Tooltip, TooltipTrigger } from '../components/Tooltip'

export default function TooltipDemo() {
  return (
    <>
      <Tooltip>
        <TooltipTrigger>
          <Button onPush={() => alert('hey')}>TOOLTIP</Button>
        </TooltipTrigger>
        <div className="h-40 w-40 bg-white">TOOLTIP TEXT</div>
      </Tooltip>
    </>
  )
}
