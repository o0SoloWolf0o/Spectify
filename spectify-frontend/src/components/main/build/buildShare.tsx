import { FaShare } from "react-icons/fa";
import { useState } from "react";
import {Popover, PopoverTrigger, PopoverContent, Button} from "@nextui-org/react";


export default function BuildShareComponent({ build_id }: { build_id: string }) {
	
	const handleClick = () => {
		const buildUrl = `${window.location.origin}/build/${build_id}`;
		navigator.clipboard.writeText(buildUrl);
	};

  return (
    <>
	 <Popover placement="bottom" showArrow={true}>
        <PopoverTrigger>
          <div className="hover:cursor-pointer">
            <FaShare onClick={handleClick} />
          </div>
        </PopoverTrigger>
        <PopoverContent className="bg-[#33BAFF]">
          <div className="px-1 py-2">
            <div className="text-small font-bold text-white">Copy link to clipboard!</div>
          </div>
        </PopoverContent>
      </Popover>
    </>
  );
}
