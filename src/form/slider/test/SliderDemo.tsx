import { Slider, SlideThumb } from "../components/Slider";

export function SliderDemo() {
  return (
    <Slider defVal={20} maxVal={144} style={{ width: 200 }}>
      {({ value }) => (
        <>
          {value}
          <SlideThumb
            style={{
              width: 12,
              height: 12,
              borderRadius: 9999,
              backgroundColor: "black",
            }}
          >
            {({ isHovered }) => `${isHovered}`}
          </SlideThumb>
        </>
      )}
    </Slider>
  );
}
