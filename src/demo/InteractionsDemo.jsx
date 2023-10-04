import DragDemo from '../../lib/interactions/drag/test/DragDemo'
import DropDemo from '../../lib/interactions/drop/test/DropDemo'
import FocusDemo from '../../lib/interactions/focus/test/FocusDemo'
import FocusScopeDemo from '../../lib/interactions/focus_scope/test/FocusScopeDemo'
import HoverDemo from '../../lib/interactions/hover/test/HoverDemo'
import KeyboardDemo from '../../lib/interactions/keyboard/test/KeyboardDemo'
import MoveExample from '../../lib/interactions/move/test/MoveDemo'
import PushDemo from '../../lib/interactions/push/test/PushDemo'

export default function InteractionsDemo() {
  return (
    <section>
      <h2>Interactions:</h2>
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="demo_section">
          <h4>usePush, useHover, useFocus:</h4>
          <p>
            Mostly these three actions will be the main way to
            interact with interface elements. Push handles any
            pointer events like clicking and touching when hover and
            focus help to react on intermediate state changes.
          </p>
          <div className="flex gap-2">
            <PushDemo />
            <HoverDemo />
            <FocusDemo />
          </div>
        </div>
        <div className="demo_section">
          <h4>useKeyboard:</h4>
          <p>
            It is extremely important to provide great keyboard
            control experience no matter what kind of application
            you create. useKeyboard eases handling keyboard events
            and helps to build keyboard-friendly interfaces
          </p>
          <KeyboardDemo />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="demo_section">
          <h4>useDrag, useDrop:</h4>
          <p>
            Native browser drag & drop pattern can be quite useful
            if implemented right. These hooks simplify the process
            of implementing functionality dependant on moving
            elements using mouse or pointer withour complex APIs.
          </p>
          <div className="flex gap-2 h-20">
            <div className="grid sm:grid-cols-2 gap-2 items-center justify-items-center">
              <DragDemo colour={'#FFD7EF'} />
              <DragDemo colour={'#FFC091'} />
              <DragDemo colour={'#A0E1E1'} />
              <DragDemo colour={'#9FE870'} />
              <DragDemo colour={'#163300'} />
              <DragDemo colour={'#0D1F00'} />
            </div>
            <DropDemo />
          </div>
        </div>
        <div className="demo_section">
          <h4>useMove:</h4>
          <p>
            Sometimes it is impossible to deal with native drag &
            drop only. Interfaces with rich animations and web-games
            are impossible withour much more complex dragging and
            moving objects logic. That is why useMove exists{' '}
          </p>
          <MoveExample />
        </div>
      </div>
      <div className="grid sm:grid-cols-2 gap-2">
        <div className="demo_section">
          <h4>useFocusScope:</h4>
          <p>
            Focus control — one of the main reason developers
            struggle to implement logical, structural and useful
            key-navigation systems in web apps. Scoping of focus
            zones helps to avoid hacking and concenrate on features
          </p>
          <FocusScopeDemo />
        </div>
        <div></div>
      </div>
    </section>
  )
}
