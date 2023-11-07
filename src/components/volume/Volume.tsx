import { FC, useCallback, useEffect, useState } from "react";
import { VideoController } from "../../controllers/video-controller";
import { StyledStripValueWrapper, StyledStripeValue } from "./Volume.styles";
import { StripValuePlaceholder } from "../../styles/common.styles";
import { STRIPE_CONTAINER_PADDINGS } from "../../styles/constants";

interface Props {
    controller: VideoController | null;
}

export const Volume: FC<Props> = ({controller}) => {
  const [volume, setVolume] = useState(0)

  useEffect(() => {
    if (controller) {
        setVolume(controller.getVolume())
    }
  }, [controller])

  const handleClick: React.MouseEventHandler<HTMLDivElement> = useCallback(
    (event) => {
      const localX = event.clientX - event.currentTarget.offsetLeft - STRIPE_CONTAINER_PADDINGS;

      if (controller) {
        const volumePercent = 100 / (event.currentTarget.clientWidth - STRIPE_CONTAINER_PADDINGS) * localX;

        controller.updateVolume(volumePercent);
        setVolume(Math.min(volumePercent, 100))
      }
    },
    [controller]
  );

  return (
    <StyledStripValueWrapper onClick={handleClick}>
      <StyledStripeValue width={volume}  />
      <StripValuePlaceholder />
    </StyledStripValueWrapper>
  );
};
