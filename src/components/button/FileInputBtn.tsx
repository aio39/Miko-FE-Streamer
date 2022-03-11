import { Box, Button } from "@chakra-ui/react";
import { screenImageState } from "@src/state/recoil/screenImage";
import { ChangeEventHandler, MouseEventHandler, useRef } from "react";
import { useSetRecoilState } from "recoil";

const FileInputBtn = () => {
  // Create a reference to the hidden file input element

  const setImageUrl = useSetRecoilState(screenImageState);

  const hiddenFileInput = useRef<HTMLInputElement>(null);

  // Programatically click the hidden file input element
  // when the Button component is clicked
  const handleClick: MouseEventHandler<HTMLButtonElement> = event => {
    if (hiddenFileInput.current) {
      hiddenFileInput.current.click();
    }
  };
  // Call a function (passed as a prop from the parent component)
  // to handle the user-selected file
  const handleChange: ChangeEventHandler<HTMLInputElement> = event => {
    if (event.target.files) {
      const fileUploaded = event.target.files[0];
      //   console.log(fileUploaded);
      const objectUrl = URL.createObjectURL(fileUploaded);
      setImageUrl(objectUrl);
      //   console.log(objectUrl);
    }
    // props.handleFile(fileUploaded);
  };

  return (
    <Box position="absolute" right="0px" top="0px">
      <Button onClick={handleClick}>Upload a file</Button>
      <input type="file" ref={hiddenFileInput} onChange={handleChange} style={{ display: "none" }} />
    </Box>
  );
};

export default FileInputBtn;
