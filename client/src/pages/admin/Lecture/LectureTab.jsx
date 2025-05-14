/* eslint-disable react-hooks/exhaustive-deps */
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "sonner";
import { Progress } from "@/components/ui/progress";
import {
  useEditLectureMutation,
  useGetLectureByIdQuery,
  useRemoveLectureMutation,
} from "@/features/api/courseApi";
import { useParams } from "react-router";
import { Loader2 } from "lucide-react";

const MEDIA_API = "http://localhost:8000/api/v1/media";

const LectureTab = () => {
  const [lectureTitle, setLectureTitle] = useState("");
  const [uploadVideoInfo, setUploadVideoInfo] = useState(null);
  const [isFree, setIsFree] = useState(false);
  const [mediaProgress, setMediaProgress] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [, setBtnDisable] = useState(true);
  const params = useParams();
  const { courseId, lectureId } = params;

  const { data: lectureData } = useGetLectureByIdQuery(lectureId);
  const lecture = lectureData?.lecture;

  useEffect(() => {
    if (lecture) {
      setLectureTitle(lecture.lectureTitle);
      setIsFree(Boolean(lecture.isPreviewFree));
      setUploadVideoInfo(lecture.VideoInfo);
    }
  }, [lecture]);

  const [editLecture, { data, isLoading, error, isSuccess }] =
    useEditLectureMutation();
  const [
    removeLecture,
    { data: removeData, isLoading: removeLoading, isSuccess: removeSuccess },
  ] = useRemoveLectureMutation();

  const fileChangeHandler = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("file", file);
      setMediaProgress(true);
      try {
        const res = await axios.post(`${MEDIA_API}/upload-video`, formData, {
          onUploadProgress: ({ loaded, total }) => {
            setUploadProgress(Math.round((loaded * 100) / total));
          },
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        console.log("response-data", res.data);
        if (res.data.success) {
          console.log(res.data?.data?.url);
          setUploadVideoInfo({
            videoUrl: res.data?.data?.url,
            publicId: res.data?.data?.public_id,
          });
          setBtnDisable(false);
          toast.success(res.data.message);
        }
      } catch (error) {
        toast.error("Video upload failed", error);
      } finally {
        setMediaProgress(false);
      }
    }
  };

  const editLectureHandler = async () => {
    console.log("uploadvido info", uploadVideoInfo);
    // Check if the video URL is available
    if (!uploadVideoInfo?.videoUrl || !uploadVideoInfo?.publicId) {
      toast.error("Please wait for the video to be uploaded and processed.");
      return;
    }
    const payload = {
      lectureTitle,
      videoInfo: uploadVideoInfo, // Ensure this is part of the payload  // yAAD YAHA PAR KYA ERROR KAR RHA THA SEND KARNE MAI PAYLOAD
      isFree,
      courseId,
      lectureId,
    };

    console.log("Payload being sent to backend:", payload); // Log the payload to verify
    await editLecture(payload);
  };

  const removeLectureHandler = async () => {
    await removeLecture(lectureId);
  };

  useEffect(() => {
    if (isSuccess) {
      toast.success(data.message);
    }
    if (error) {
      toast.error("Error", error.data.message);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (removeSuccess) {
      toast.success(removeData.message);
    }
  }, [removeSuccess]);

  return (
    <Card>
      <CardHeader className="flex justify-between">
        <div>
          <CardTitle>Edit Lecture</CardTitle>
          <CardDescription>
            Make changes and click save when done
          </CardDescription>
        </div>
        <div className="flex items-center gap-2">
          <Button
            disabled={removeLoading}
            variant="destructive"
            onClick={removeLectureHandler}
          >
            {removeLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Remove Lecture"
            )}
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-2 my-2">
          <Label>Title</Label>
          <Input
            value={lectureTitle}
            onChange={(e) => setLectureTitle(e.target.value)}
            type="text"
            placeholder="Ex. Introduction to Javascript"
          />
        </div>
        <div className="space-y-2 my-2">
          <Label>
            Video <span className="text-red-500">*</span>
          </Label>
          <Input
            type="file"
            accept="video/*"
            onChange={fileChangeHandler}
            placeholder="Ex. Introduction to Javascript"
            className="w-fit"
          />
        </div>
        <div className="flex items-center space-x-2 my-5">
          <Switch
            checked={isFree}
            onCheckedChange={setIsFree}
            id="airplane-mode"
          />
          <Label htmlFor="airplane-mode">Is this video FREE</Label>
        </div>
        {mediaProgress && (
          <div className="space-y-2">
            <Progress value={uploadProgress} />
            <p className="text-sm text-gray-500">{uploadProgress}% uploaded</p>
          </div>
        )}
        <div className="my-5">
          <Button
            disabled={isLoading || !uploadVideoInfo?.videoUrl}
            onClick={editLectureHandler}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Please wait
              </>
            ) : (
              "Update Lecture"
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default LectureTab;
