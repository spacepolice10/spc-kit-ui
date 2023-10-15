import { useState } from 'react'
import { Mailform } from '../components/Mailform'

export default function MailformDemo() {
  const [mail, setMail] = useState('')
  return (
    <>
      {/* <Searchform data={mailList} filter={filterMail}>
        {({ items, selectedId }) =>
          items.map((x) => (
            <p
              style={{
                backgroundColor: selectedId == x.id ? "seagreen" : "",
                padding: 10,
                width: 240,
              }}
              key={x.id}
            >
              {x.name}
            </p>
          ))
        }
      </Searchform> */}

      <Mailform
        data={[]}
        // classStyle={({ isValid }) =>
        //   isValid ? "textform" : "textform_focusing"
        // }
        onKeyboardSelect={(x) => setMail(x)}
        val={mail}
        onInput={setMail}
      >
        {({ items, selectedId }) => (
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              backgroundColor: 'white',
            }}
          >
            {items.map((x) => (
              <p
                style={{
                  backgroundColor:
                    selectedId == x.id ? 'seagreen' : 'white',
                  padding: 10,
                  width: 240,
                }}
                key={x.id}
              >
                {x.name}
              </p>
            ))}
          </div>
        )}
      </Mailform>
    </>
  )
}
