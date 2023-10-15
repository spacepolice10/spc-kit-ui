import { Menu, MenuBody, MenuButton } from '../components/Menu'

export default function MenuDemo() {
  return (
    <>
      <Menu>
        <MenuButton>TEST</MenuButton>
        <MenuBody className="flex flex-col bg-white">
          <button>fuck that</button>
          <button>fuck IT!</button>
          <FuncTest />
        </MenuBody>
      </Menu>
    </>
  )
}

function FuncTest({ hide }) {
  return <button onClick={hide}>HIDE!</button>
}
