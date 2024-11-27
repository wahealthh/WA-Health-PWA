import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FaPlay } from "react-icons/fa";
import { IoCheckmarkCircle } from "react-icons/io5";
import { Button } from "@/components/ui/button";

const CallHistoryCard = () => {
  return (
    <Card className="w-full flex items-center justify-between">
      <CardHeader className="text-[#004085]">
        <CardTitle>John Smith</CardTitle>
        <CardDescription className="text-[#004085]">
          <p>+1234567890</p>
          <p>Appointment Date: 12/12/2024</p>
          <p>Appointment Time: 10:00 AM</p>
          <p>Call Date: 12/12/2024</p>
          <p className="flex items-center gap-1">
            Status: Booked
            <IoCheckmarkCircle className="text-green-500" />
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center !pt-6">
        <Button className="rounded-full">
          {" "}
          <FaPlay className="mr-2" /> Recording
        </Button>
      </CardContent>
    </Card>
  );
};

export default CallHistoryCard;
