import { Button } from "@nextui-org/button";
import { Tooltip } from "@nextui-org/tooltip";
import Link from "next/link";
import { useWindowSize } from "./windowSize";
const ButtonWithToolTip = ({ icon, text, tooltiptext }) => {
  let size = useWindowSize();
  return (
    <>
      <Tooltip content={tooltiptext} showArrow={true} className="rounded-none">
        <Link href={"/"}>
          <Button
            startContent={icon}
            variant="light"
            className="text-xl font-semibold  flex flex-row items-center justify-around gap-10 w-full"
          >
            {size.width < 1200 ? '' : ( text )}
          </Button>
        </Link>
      </Tooltip>
    </>
  );
};
export default ButtonWithToolTip;
