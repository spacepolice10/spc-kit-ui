# usePush

### Import:

```tsx
import { usePush } from './usePush';
```

### How-to’s:

```tsx
const {isPushed, pushHook} = usePush(
	onPush: () => alert(`Oh, hi! 😗`),
	isntSemanticPushableElem: true
)

<span {...pushHook}>
	{isPushed ? 'Pushed button' : 'Not pushed button'}
</span>

```

### Customization 

### Examples

### APIS:

#### args: 

`onPushType: ({ev: React.MouseEvent | React.KeyboardEvent, keys: 'ctrl' | 'option' | 'meta'}) => void`

| property                 | description                                                  | type                   |
|--------------------------|--------------------------------------------------------------|------------------------|
| onPush                   | Function that fires on click                                 | `(onPushType) => void` |
| onPushStarts             | Function that fires on `pointerdown`                         | `(onPushType) => void` |
| onPushFinishes           | Function that fires on `pointerup`                           | `(onPushType) => void` |
| onDoublePush             | Function that fires on double click                          | `(onPushType) => void` |
| isntSemanticPushableElem | If true, adds additional properties that make any HTML element a button | `?: boolean`           |
| title                    | The name of the button                                       | `string`               |
| hoverTitle               | The text that will be showed in HTML title if so is can be showed | `string`               |
| isDisabled               | ~                                                            | `?:boolean`            |
| bubble                   | Remove  event.stopPropagation() before firing `onPush` callback | ?: boolean             |

#### returns:

