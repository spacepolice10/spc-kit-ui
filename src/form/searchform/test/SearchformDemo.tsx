import { Button } from "../../../button/button/components/Button";
import { Searchform } from "../components/Searchform";

export default function SearchformDemo() {
  const data = [
    {
      id: "yo",
      name: "🥬",
      value: "8",
      onPush: () => {
        alert("hey");
      },
    },
    {
      id: "yo2",
      name: "🥯",
      value: "4",
      onPush: () => {
        alert("yo!");
      },
    },
    {
      id: "yo8",
      name: "😗",
      value: "12",
      onPush: () => {
        alert("yo!");
      },
    },
  ];
  function filter(value: string) {
    const dt = data.filter((item) =>
      item.id.toUpperCase().includes(value.toUpperCase())
    );
    return dt;
  }

  return (
    <>
      {/* <Searchform
        delay={400}
        data={data}
        filter={filter}
        onSelect={(selectedElemId) => alert(selectedElemId)}
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
              <button
                onClick={() => {
                  x.onPush();
                  remove();
                }}
                key={x.id}
                style={{ backgroundColor: "seagreen" }}
              >
                {x.name}
              </button>
            ))}
            <button onClick={remove}>❌</button>
          </>
        )}
      </Searchform> */}
      <Searchform
        data={data}
        onKeyboardSelect={(selectedElemId) =>
          alert(data.find((x) => x.id == selectedElemId)?.value)
        }
        filter={filter}
        style={{
          width: 200,
        }}
        withRelativePosition={true}
        alwaysShowResult={true}
        classStyle={({ isFocused }: { isFocused?: boolean }) =>
          isFocused ? "textform_focusing" : "textform"
        }
      >
        {({ items, selectedId }) => (
          <div
            style={{
              width: 200,

              display: items?.length ? "flex" : "none",
              flexDirection: "column",
            }}
            className="border p-2 h-52"
          >
            {items?.map((x) => (
              <Button
                key={x.id}
                onPush={() => alert(selectedId)}
                style={{
                  backgroundColor: selectedId == x.id ? "seagreen" : "",
                  padding: 10,
                  width: 240,
                }}
                classStyle={({ isHovered }) =>
                  isHovered ? "buttonHovered" : ""
                }
              >
                {x.name}
              </Button>
            ))}
          </div>
        )}
      </Searchform>
    </>
  );
}
