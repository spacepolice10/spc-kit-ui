import { Searchform } from "./Searchform";

export default function SearchformDemo() {
  const data = [
    {
      id: "yo",
      name: "hello",
      value: "8",
    },
    {
      id: "yo2",
      name: "bye",
      value: "4",
    },
  ];
  function filter(value: string) {
    const dt = data.filter(
      (item) => !item.name.toUpperCase().includes(value.toUpperCase())
    );
    return dt;
  }

  return (
    <>
      <Searchform
        data={data}
        filter={filter}
        style={{
          width: 200,
        }}
        classStyle={({ isFocused }) =>
          isFocused ? "textform_focusing" : "textform"
        }
      >
        {({ items, remove }) => (
          <>
            <>🔍</>
            {items.map((x) => (
              <p key={x.id} style={{ backgroundColor: "seagreen" }}>
                {x.name}
              </p>
            ))}
            <button onClick={remove}>❌</button>
          </>
        )}
      </Searchform>
      <Searchform
        data={data}
        style={{
          width: 200,
        }}
        classStyle={({ isFocused }) =>
          isFocused ? "textform_focusing" : "textform"
        }
      >
        {({ items }) =>
          items.map((x) => (
            <p key={x.id} style={{ backgroundColor: "seagreen" }}>
              {x.name}
            </p>
          ))
        }
      </Searchform>
    </>
  );
}
