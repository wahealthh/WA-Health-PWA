/* eslint-disable react/prop-types */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { IoCheckmarkCircle } from "react-icons/io5";
import { IoCloseCircle } from "react-icons/io5";
import { useState, useRef } from "react";
import CallSummary from "@/components/CallSummary";

const CallHistoryCard = ({ calls, isLoading, error }) => {
  const [audioError, setAudioError] = useState(null);
  const audioRefs = useRef([]);

  const getAudioUrl = (url) => {
    if (!url) return "";
    return url.startsWith("@") ? url.replace("@", "") : url;
  };

  const audioStyles = `
    audio::-webkit-media-controls-panel {
      background-color: #42a5f5;
    }
    audio::-webkit-media-controls-current-time-display,
    audio::-webkit-media-controls-time-remaining-display {
      color: white;
    }
    audio::-webkit-media-controls-play-button,
    audio::-webkit-media-controls-timeline,
    audio::-webkit-media-controls-volume-slider {
      filter: invert(1);
    }
  `;

  if (isLoading) return <div>Loading calls...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <>
      <style>{audioStyles}</style>
      <div className="flex flex-col gap-4">
        {calls.map((call, index) => (
          <Card key={call.id || index} className="flex justify-between">
            <CardHeader>
              <CardTitle>{`${call.first_name} ${call.last_name}`} </CardTitle>
              <CardDescription className="text-[#004085]">
                <p>Phone: {call.phone}</p>
                {call.appointment_date && (
                  <p>
                    Appointment Date:{" "}
                    {new Date(call.appointment_date).toLocaleDateString()}
                  </p>
                )}
                {call.appointment_time && (
                  <p>Appointment Time: {call.appointment_time}</p>
                )}
                <p>
                  Call Date: {new Date(call.call_date).toLocaleDateString()}
                </p>
                <p>
                  Call Duration: {Math.round(call.minutes)}{" "}
                  {Math.round(call.minutes) > 1 ? "minutes" : "minute"}
                </p>
                <p className="flex items-center gap-1">
                  Booking Status: {call.status}
                  {call.status === "Success." ? (
                    <IoCheckmarkCircle className="text-green-500" />
                  ) : (
                    <IoCloseCircle className="text-red-500" />
                  )}
                </p>
                <div className="pt-3">
                  {call.summary && (
                    <CallSummary text="Call Summary" summary={call.summary} />
                  )}
                </div>
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center justify-center !pt-6 gap-2">
              {call?.stereo_recording_url ? (
                <>
                  <div className="rounded-lg p-2">
                    <audio
                      className=""
                      ref={(el) => (audioRefs.current[index] = el)}
                      src={getAudioUrl(call.stereo_recording_url)}
                      controls
                      onError={(e) => {
                        console.error("Audio element error:", e);
                        setAudioError(
                          `Error loading audio: ${
                            e.target.error?.message || "Unknown error"
                          }`
                        );
                      }}
                    />
                  </div>
                  {audioError && (
                    <p className="text-red-500 text-sm mt-2">{audioError}</p>
                  )}
                </>
              ) : (
                <p className="text-gray-500">No recording available</p>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </>
  );
};

export default CallHistoryCard;
