import { Box, Center, Grid, GridItem } from '@chakra-ui/react';
import { useRecoilState } from 'recoil';
import { draftMsgPositionState } from 'recoil/draftMessageState';
import { PositionNumberRange } from 'types/TimeMetadataFormat';

export const PositionSelector = () => {
  const [draftMsgPosition, setDraftMsgPosition] = useRecoilState(
    draftMsgPositionState
  );

  const handleChangePosition: React.MouseEventHandler<HTMLDivElement> = (e) => {
    if (e.target instanceof HTMLDivElement) {
      const idx = parseInt(
        e.target.dataset['idx'] as string
      ) as PositionNumberRange;
      if (idx) setDraftMsgPosition(idx);
    }
  };

  return (
    <Grid
      templateColumns="repeat(3, 1fr)"
      templateRows="repeat(3, 1fr)"
      gap="1px"
      onClick={handleChangePosition}
      bgColor="gray.400"
      width="7rem"
      height="7rem"
      border="1px"
      borderColor="gray.200"
    >
      {new Array(9).fill(0).map((_, idx) => {
        const isSelected = idx + 1 === draftMsgPosition;
        return (
          <GridItem
            key={idx + 1}
            data-idx={idx + 1}
            bgColor={isSelected ? 'blue.50' : 'white'}
          >
            {isSelected && (
              <Center w="full" h="full">
                <Box
                  w="1rem"
                  h="1rem"
                  borderRadius="full"
                  bgColor="skyblue"
                ></Box>
              </Center>
            )}
          </GridItem>
        );
      })}
    </Grid>
  );
};
