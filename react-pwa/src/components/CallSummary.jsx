/* eslint-disable react/prop-types */
import { Button } from "./ui/button";
import { IoIosArrowDropright } from "react-icons/io";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";

const CallSummary = (props) => {
  return (
    <Drawer>
      <DrawerTrigger>
        <Button
          variant="link"
          className="text-primary flex space-x-2 justify-start p-0 pr-2 font-normal hover:no-underline hover:bg-primary hover:text-white hover:rounded-full  transition-none h-auto leading-none"
        >
          <IoIosArrowDropright className="h-5 w-5" />
          <span>{props.text}</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>Summary</DrawerTitle>
          <DrawerDescription>{props.summary}</DrawerDescription>
        </DrawerHeader>
        <DrawerFooter>
          <DrawerClose>
            <Button variant="outline">Close</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default CallSummary;
