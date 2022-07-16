import React, { useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { Stage, Layer, Image } from "react-konva";
import useImage from "use-image";

const URLImage = ({ image }) => {
  const [img] = useImage(image.src);
  return (
    <Image
      image={img}
      x={image.x}
      y={image.y}
      // I will use offset to set origin to the center of the image
      offsetX={img ? img.width / 2 : 0}
      offsetY={img ? img.height / 2 : 0}
    />
  );
};

const App = () => {
  const dragUrl = useRef();
  const stageRef = useRef();
  const [images, setImages] = useState([]);
  return (
    <div>
      Try to drag and image into the stage:
      <br />
      <img
        alt="lion"
        src="https://konvajs.org/assets/lion.png"
        draggable="true"
        onDragStart={(e) => {
          dragUrl.current = e.target.src;
          console.log(dragUrl.current);
        }}
      />
      <div
        onDrop={(e) => {
          e.preventDefault();
          // register event position
          stageRef.current.setPointersPositions(e);
          // add image
          setImages(
            images.concat([
              {
                ...stageRef.current.getPointerPosition(),
                src: dragUrl.current,
              },
            ])
          );
        }}
        onDragOver={(e) => e.preventDefault()}
      >
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          style={{ border: "1px solid grey" }}
          ref={stageRef}
        >
          <Layer>
            {images.map((image, index) => {
              return <URLImage key={index} image={image} />;
            })}
          </Layer>
        </Stage>
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
