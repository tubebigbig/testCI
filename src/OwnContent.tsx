import { useMyContent } from "./themeContext";
import Button from "@material-ui/core/Button";
import React, { useEffect } from "react";

// interface OwnContentType {
//   handler: () => void;
// }

const OwnContent = React.memo(({ myprops }: { myprops: string }) => {
  const content = useMyContent();

  const refCount = React.useRef(0);

  refCount.current++;

  useEffect(() => {
    console.log("OwnContent rerender");
  }, []);
  return (
    <>
      <h2 data-testid="count">{ myprops + content.text + refCount.current}</h2>
      <Button variant="outlined">Three</Button>
    </>
  );
});

export default OwnContent;
