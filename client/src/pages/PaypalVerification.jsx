import { useVerifyPaymentMutation } from "@/features/api/paypalApi";
import { Loader2 } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams, useSearchParams } from "react-router";
import { toast } from "sonner";

const PaypalVerification = () => {
  const { courseId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [verifyPayment] = useVerifyPaymentMutation();

  useEffect(() => {
    const verify = async () => {
      const token = searchParams.get("token");
      console.log("token from url",token);
      if (!token) {
        toast.error("Missing payment token");
        return navigate(`/course-detail/${courseId}`);
      }

      try {
        const result = await verifyPayment(token).unwrap();

        if (result.success) {
          toast.success("Payment verified successfully!");
          navigate(`/course-progress/${courseId}`);
        } else {
          console.log("veriify nahi huaa kyu dekhna padega backend me")
          toast.error(result.message || "Payment verification failed");
          navigate(`/course-detail/${courseId}`);
        }
      } catch (error) {
        console.error("Verification error:", error);
        toast.error(error.data?.message || "Payment verification failed");
        navigate(`/course-detail/${courseId}`);
      }
    };

    verify();
  }, [courseId, navigate, searchParams, verifyPayment]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen gap-4">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <h2 className="text-2xl font-semibold">Verifying Your Payment</h2>
      <p className="text-muted-foreground">
        Please wait while we confirm your purchase...
      </p>
    </div>
  );
};

export default PaypalVerification;
