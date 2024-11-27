import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const AppointmentTimeCard = () => {
  return (
    <Card className="w-full flex items-center justify-between">
      <CardHeader className="text-[#004085]">
        <CardTitle>Time: 10:00 AM</CardTitle>
        <CardDescription className="text-[#004085]">
          <p>Attended: Yes</p>
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default AppointmentTimeCard;
