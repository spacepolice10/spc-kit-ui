import { Button } from "./button/components/Button";
import { ButtonCollection } from "./button_collection/components/ButtonCollection";
import { LongPushButton } from "./long_push_button/components/LongPushButton";
import { ToggleButton } from "./toggle_button/components/ToggleButton";

export default function ButtonListDemo() {
  return (
    <section>
      <h2 style={{ textAlign: "left", fontStyle: "italic" }}>Button:</h2>
      <div style={{ display: "flex", gap: 4 }}>
        <ButtonCollection style={{ display: "flex" }}>
          <Button
            classStyle={({ isHovered }) => (isHovered ? "buttonHovered" : "")}
            onPush={() => alert("Smooch 😘")}
          >
            Click me 👆
          </Button>
          <LongPushButton
            styles={{ width: 144 }}
            delay={800}
            onPush={() => alert("That was long ⌛")}
          >
            {({ isPushed }) => (
              <span style={{ display: "flex", gap: 4 }}>
                Long click{" "}
                {
                  <span
                    style={{
                      display: "block",
                      rotate: isPushed ? "180deg" : "0deg",
                      transitionDuration: "400ms",
                    }}
                  >
                    ⌛
                  </span>
                }
              </span>
            )}
          </LongPushButton>
          <ToggleButton
            styles={{ width: 144 }}
            classStyle={({ isHovered }) => (isHovered ? "buttonHovered" : "")}
          >
            {({ isToggle }) => (
              <span
                style={{
                  width: "100%",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                {isToggle ? (
                  <span
                    style={{
                      display: "block",
                      width: 120,
                    }}
                  >
                    Unpin! 📌
                  </span>
                ) : (
                  <span
                    style={{
                      filter: "grayscale(1)",
                      width: 120,
                      display: "block",
                    }}
                  >
                    Pin me! 📌
                  </span>
                )}
              </span>
            )}
          </ToggleButton>
        </ButtonCollection>
      </div>
    </section>
  );
}
