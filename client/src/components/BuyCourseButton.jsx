import { useCreateOrderMutation } from "@/features/api/paypalApi";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";

const BuyCourseButton = ({ courseId }) => {
  const [createOrder, { isLoading }] = useCreateOrderMutation();

  const handleClick = async () => {
    try {
      const  data = await createOrder(courseId).unwrap();
      console.log("Order Data: approval url", data); // Log the response to check the data structure

      // Check if approvalUrl exists and redirect to PayPal
      if (data?.approvalUrl) {
        window.location.href = data.approvalUrl;
      } else {
        toast.error("Approval URL missing in the response.");
      }
    } catch (error) {
      console.error("Error during payment creation:", error);
      toast.error(error.message || "Failed to initiate payment");

      // If there's an error in the response, log the error data
      if (error?.data) {
        console.log("Error Data:", error.data);
      }
    }
  };

  return (
    <Button className="w-full" onClick={handleClick} disabled={isLoading}>
      {isLoading ? "Processing..." : "Buy Now"}
    </Button>
  );
};

export default BuyCourseButton;
